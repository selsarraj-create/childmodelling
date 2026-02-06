"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Lock, ShieldCheck, ChevronRight, User, MapPin, Phone, Calendar, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { ImageUpload } from './ImageUpload'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

const formSchema = z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.string().email("Please enter a valid email"),
    age: z.string().regex(/^\d+$/, "Age must be a number"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    postCode: z.string().min(5, "Please enter a valid Post Code"),
    image: z.custom<File>((v) => v instanceof File, {
        message: "Please upload a photo of your child",
    }),
})

type FormValues = z.infer<typeof formSchema>

export function ApplicationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    // Basic Input Masking Logic
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '')
        if (val.length > 11) val = val.slice(0, 11)
        if (val.length > 5) {
            val = val.slice(0, 5) + ' ' + val.slice(5)
        }
        setValue('phone', val, { shouldValidate: true })
    }

    const handlePostCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
        if (val.length > 4) {
            if (val.length > 7) val = val.slice(0, 7)
            const last3 = val.slice(-3)
            const prefix = val.slice(0, -3)
            if (val.length >= 5) {
                val = `${prefix} ${last3}`
            }
        }
        setValue('postCode', val, { shouldValidate: true })
    }

    const onSubmit = async (data: FormValues) => {
        try {
            console.log("Checking for duplicates...")

            // 0. Check for Duplicates
            const { count } = await supabase
                .from('applications')
                .select('id', { count: 'exact', head: true })
                .or(`email.eq.${data.email},phone.eq.${data.phone}`)

            if (count && count > 0) {
                alert("An application with this email or phone already exists!")
                return
            }

            console.log("Submitting to Supabase...", data)

            // 1. Handle HEIC Conversion if needed
            let fileToUpload = data.image
            if (fileToUpload.name.toLowerCase().endsWith('.heic') || fileToUpload.type === 'image/heic') {
                console.log("Converting HEIC to JPEG...")
                try {
                    const heic2any = (await import('heic2any')).default
                    const convertedBlob = await heic2any({
                        blob: fileToUpload,
                        toType: "image/jpeg",
                        quality: 0.8
                    }) as Blob

                    // Handle array or single blob
                    const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob

                    fileToUpload = new File([finalBlob], fileToUpload.name.replace(/\.heic$/i, '.jpg'), {
                        type: 'image/jpeg'
                    })
                } catch (e) {
                    console.error("HEIC conversion failed", e)
                    // Fallback to original if conversion fails, though browsers might not display it
                }
            }

            // 2. Upload Image
            const fileExt = fileToUpload.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('leads')
                .upload(filePath, fileToUpload)

            if (uploadError) {
                console.error("Upload error:", uploadError)
                throw new Error("Failed to upload image")
            }

            const { data: { publicUrl } } = supabase.storage
                .from('leads')
                .getPublicUrl(filePath)

            // 3. Insert Data
            const { error: dbError } = await supabase
                .from('applications')
                .insert({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    age: parseInt(data.age),
                    phone: data.phone,
                    post_code: data.postCode,
                    image_url: publicUrl,
                    status: 'new'
                })

            if (dbError) {
                console.error("Database error:", dbError)
                throw new Error("Failed to save application")
            }

            // 4. Send Email Notification
            try {
                fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        age: data.age,
                        postCode: data.postCode,
                        imageUrl: publicUrl
                    })
                }).then(res => {
                    if (!res.ok) console.warn("Email notification failed", res.status)
                }).catch(err => console.warn("Email notification error", err))
            } catch (e) {
                console.warn("Failed to trigger email notification", e)
            }

            // 5. Meta Tracking (Pixel + CAPI)
            try {
                const eventId = crypto.randomUUID()

                // Browser Pixel
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead', {
                        content_name: 'Application Submission',
                        currency: 'GBP',
                        value: 0
                    }, { eventID: eventId })
                }

                // Server CAPI
                fetch('/api/track-lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        age: data.age,
                        postCode: data.postCode,
                        eventId: eventId,
                        sourceUrl: window.location.href
                    })
                }).catch(e => console.warn("CAPI tracking failed", e))

            } catch (e) {
                console.warn("Meta tracking failed", e)
            }

            // Track Conversion (GTM)
            if (typeof window !== 'undefined') {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                    'event': 'form_submission',
                    'form_name': 'application_form',
                    'status': 'success'
                });
            }

            alert("Application Received! We will be in touch.")

        } catch (error) {
            console.error("Submission failed:", error)
            alert("Something went wrong. Please try again.")
        }
    }

    const imageValue = watch('image')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong w-full rounded-[30px] p-6 shadow-2xl backdrop-blur-xl md:p-8 border border-white/60"
        >
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl tracking-tight">
                    Apply Now
                </h2>
                <div className="flex items-center gap-1.5 rounded-full bg-green-100/80 px-3 py-1.5 text-xs font-bold text-green-700 shadow-sm ring-1 ring-green-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Secure</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name Fields Row */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Input
                            {...register('firstName')}
                            placeholder="First Name"
                            icon={<User className="w-5 h-5" />}
                            className={cn("bg-white/70", errors.firstName && "border-red-500 ring-red-500")}
                        />
                        {errors.firstName && <p className="ml-1 text-xs font-bold text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Input
                            {...register('lastName')}
                            placeholder="Last Name"
                            icon={<User className="w-5 h-5" />}
                            className={cn("bg-white/70", errors.lastName && "border-red-500 ring-red-500")}
                        />
                        {errors.lastName && <p className="ml-1 text-xs font-bold text-red-500">{errors.lastName.message}</p>}
                    </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder="Parent Email Address"
                        icon={<Mail className="w-5 h-5" />}
                        className={cn("bg-white/70", errors.email && "border-red-500 ring-red-500")}
                    />
                    {errors.email && <p className="ml-1 text-xs font-bold text-red-500">{errors.email.message}</p>}
                </div>

                {/* Age & PostCode Row */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-pink/60 pointer-events-none z-10">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <select
                                className={cn(
                                    "flex h-12 w-full appearance-none rounded-2xl border-2 border-white/40 bg-white/70 pl-11 pr-4 py-2 text-base text-gray-900 shadow-sm focus-visible:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:opacity-50 transition-colors focus:bg-white",
                                    errors.age && "border-red-500 ring-red-500"
                                )}
                                {...register('age')}
                                defaultValue="5"
                            >
                                <option value="" disabled>Age</option>
                                {/* Ages 3 to 17 */}
                                {Array.from({ length: 15 }, (_, i) => i + 3).map((age) => (
                                    <option key={age} value={age}>{age} Years</option>
                                ))}
                            </select>
                            <ChevronRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-gray-500" />
                        </div>
                        {errors.age && <p className="ml-1 text-xs font-bold text-red-500">{errors.age.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Input
                            {...register('postCode')}
                            onChange={handlePostCodeChange}
                            placeholder="Post Code"
                            icon={<MapPin className="w-5 h-5" />}
                            className={cn("bg-white/70 uppercase", errors.postCode && "border-red-500 ring-red-500")}
                        />
                        {errors.postCode && <p className="ml-1 text-xs font-bold text-red-500">{errors.postCode.message}</p>}
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                    <Input
                        {...register('phone')}
                        type="tel"
                        onChange={handlePhoneChange}
                        placeholder="Phone Number (07...)"
                        icon={<Phone className="w-5 h-5" />}
                        className={cn("bg-white/70", errors.phone && "border-red-500 ring-red-500")}
                    />
                    {errors.phone && <p className="ml-1 text-xs font-bold text-red-500">{errors.phone.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="space-y-1">
                    <label className="ml-1 text-sm font-bold text-gray-700">Photos (Headshot + Full Length)</label>
                    <p className="ml-1 text-xs text-gray-500 mb-1">We accept JPG, PNG & HEIC (iPhone).</p>
                    <ImageUpload
                        value={imageValue}
                        onChange={(file) => setValue('image', file as any, { shouldValidate: true })}
                        className={cn(errors.image && "ring-2 ring-red-500 rounded-2xl")}
                    />
                    {errors.image && <p className="ml-1 text-xs font-bold text-red-500">{errors.image.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-lg shadow-brand-pink/40"
                        variant="primary"
                        size="lg"
                    >
                        {isSubmitting ? "Sending Application..." : "Submit Application"}
                    </Button>

                    <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-gray-500">
                        <Lock className="h-3 w-3 text-green-600" />
                        <span>SSL Encrypted. Your data is private.</span>
                    </div>
                </div>

            </form>
        </motion.div>
    )
}
