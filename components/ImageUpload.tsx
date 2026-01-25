"use client"

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Camera, Image as ImageIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
    value?: File | null
    onChange: (file: File | null) => void
    className?: string
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            onChange(file)
            setPreview(URL.createObjectURL(file))
        }
    }, [onChange])

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange(null)
        setPreview(null)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1,
        multiple: false
    })

    return (
        <div className={cn("w-full", className)}>
            <div
                {...getRootProps()}
                className={cn(
                    "relative min-h-[160px] cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 p-6 transition-all hover:border-brand-blue hover:bg-brand-blue/5",
                    isDragActive && "border-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 p-[3px] animate-pulse bg-[length:200%_200%]",
                    preview && "border-solid border-brand-pink bg-white p-0 overflow-hidden"
                )}
            >
                {/* Inner container to hide rainbow padding when active */}
                <div className={cn("h-full w-full rounded-[13px] bg-white/50 flex flex-col justify-center", isDragActive && "bg-white h-full w-full")}>
                    <input {...getInputProps()} capture="environment" />

                    {preview ? (
                        <div className="relative h-full w-full aspect-video md:aspect-auto md:h-[200px] flex items-center justify-center bg-black/5">
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-full w-full object-cover"
                            />
                            <button
                                onClick={clearImage}
                                className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-lg hover:bg-red-50 text-red-500 transition-all border-b-2 border-gray-200 active:border-b-0 active:translate-y-[1px]"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 text-center pt-4 pb-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/20 text-brand-blue ring-4 ring-white shadow-lg">
                                <Camera className="h-8 w-8" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-base font-bold text-gray-900">
                                    Tap to take a photo
                                </p>
                                <p className="text-xs text-gray-500">
                                    or drag and drop here
                                </p>
                            </div>
                            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm border border-gray-100">
                                <ImageIcon className="h-3 w-3" />
                                <span>Supports JPG, PNG</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
