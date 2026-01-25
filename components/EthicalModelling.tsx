"use client"

import React from 'react'
import { ShieldCheck, HeartHandshake, Zap } from 'lucide-react'

export function EthicalModelling() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 space-y-20">

            {/* No Experience Block */}
            <div className="bg-white rounded-[50px] p-8 md:p-12 shadow-2xl border-4 border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand-yellow/20 rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-pink/20 rounded-tl-full" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow-dark px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-wider">
                            <Zap className="w-4 h-4" />
                            No Experience? No Problem!
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 leading-tight">
                            We Don't Look for "Perfect". <br />
                            <span className="text-brand-pink">We Look for Personality.</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            The modelling world has changed. Brands want real children who enjoy themselves!
                            There are no specific rules for height, hair color, or look. If your child has energy
                            and a smile that lights up the room, that's everything we need.
                        </p>
                    </div>
                    <div className="flex-1 w-full flex justify-center">
                        <div className="grid grid-cols-2 gap-4 rotate-3">
                            <div className="bg-brand-blue/20 p-6 rounded-3xl text-center">
                                <span className="block text-4xl font-black text-brand-blue mb-2">10k+</span>
                                <span className="font-bold text-gray-700">Placements</span>
                            </div>
                            <div className="bg-brand-pink/20 p-6 rounded-3xl text-center mt-8">
                                <span className="block text-4xl font-black text-brand-pink mb-2">100%</span>
                                <span className="font-bold text-gray-700">Safe & Secure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Safe & Professional Block */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-black/5 rounded-[40px] p-8 md:px-12">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg text-green-600">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-900">Safe & Professional</h3>
                        <p className="text-gray-600 font-medium">Modelling should always be fun. We prioritize your child's happiness above all.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200">
                    <HeartHandshake className="w-5 h-5 text-brand-pink" />
                    <span className="font-bold text-gray-800">No Upfront Fees Guaranteed</span>
                </div>
            </div>

        </section>
    )
}
