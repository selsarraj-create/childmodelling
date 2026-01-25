"use client"

import React from 'react'
import Image from 'next/image'

const portfolioImages = [
    "/profile-leo.png",
    "/profile-bella.png",
    "/profile-noah.png",
    "/hero-child.png",
    "/profile-leo.png",
    "/profile-bella.png",
    "/profile-noah.png"
]

export function InfinitePortfolio() {
    return (
        <div className="relative w-full overflow-hidden bg-white/50 py-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F7F5F2] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F7F5F2] to-transparent z-10" />

            <div className="flex animate-scroll hover:[animation-play-state:paused] w-[200%]">
                {/* First Set */}
                <div className="flex gap-8 px-4 w-1/2 justify-around">
                    {portfolioImages.map((src, i) => (
                        <div key={`a-${i}`} className="relative h-64 w-64 flex-shrink-0 rounded-[40px] overflow-hidden border-4 border-white shadow-xl rotate-[-2deg] odd:rotate-2">
                            <Image
                                src={src}
                                alt={`Portfolio ${i}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
                {/* Second Set (Duplicate for loop) */}
                <div className="flex gap-8 px-4 w-1/2 justify-around">
                    {portfolioImages.map((src, i) => (
                        <div key={`b-${i}`} className="relative h-64 w-64 flex-shrink-0 rounded-[40px] overflow-hidden border-4 border-white shadow-xl rotate-[-2deg] odd:rotate-2">
                            <Image
                                src={src}
                                alt={`Portfolio ${i}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
