"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Lock, ShieldCheck, ChevronRight, User, MapPin, Phone, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { ImageUpload } from './ImageUpload'
import { cn } from '@/lib/utils'

const formSchema = z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
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
        // Format as 07XXX XXXXXX (UK style basic) or just generic spacing
        if (val.length > 5) {
            val = val.slice(0, 5) + ' ' + val.slice(5)
        }
        setValue('phone', val, { shouldValidate: true })
    }

    const handlePostCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
        // Simple UK formatting (adding space before last 3 chars if length > 4)
        if (val.length > 4) { // e.g. SW1A1AA -> SW1A 1AA
            // This is a naive formatter, but valid for requirement "spacing as user types"
            // A robust one would need more logic, let's keep it simple: max 7 chars strict
            if (val.length > 7) val = val.slice(0, 7)
            const last3 = val.slice(-3)
            const prefix = val.slice(0, -3)
            if (val.length >= 5) {
                val = `${prefix} ${last3}`
            }
        }

        // Better simple approach for now: just uppercase
        setValue('postCode', val, { shouldValidate: true })
    }

    const onSubmit = async (data: FormValues) => {
        // Simulate API call
        console.log("Submitting form:", data)
        await new Promise(resolve => setTimeout(resolve, 1500))
        alert("Application Received! We will be in touch.")
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
                            >
                                <option value="" disabled selected>Age</option>
                                {[...Array(18)].map((_, i) => (
                                    <option key={i} value={i}>{i} Years</option>
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
                    <label className="ml-1 text-sm font-bold text-gray-700">Child's Photo</label>
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
                        {isSubmitting ? "Sending..." : "Submit Application"}
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
