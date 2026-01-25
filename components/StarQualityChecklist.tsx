"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Zap, Clock, Layers } from 'lucide-react'

const checklistItems = [
    {
        title: "Confidence",
        description: "Loves meeting new people",
        icon: Star,
        color: "bg-brand-yellow",
        textColor: "text-brand-pink"
    },
    {
        title: "Personality",
        description: "Natural energy & spark",
        icon: Zap,
        color: "bg-brand-blue",
        textColor: "text-blue-600"
    },
    {
        title: "Punctuality",
        description: "Reliable & on time",
        icon: Clock,
        color: "bg-brand-pink",
        textColor: "text-white"
    },
    {
        title: "Discipline",
        description: "Follows direction well",
        icon: Layers,
        color: "bg-purple-100",
        textColor: "text-purple-600"
    }
]

export function StarQualityChecklist() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">What Makes a Star?</h2>
                <p className="text-gray-500 font-medium text-lg">It's not about perfect looks—it's about professionalism & personality!</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {checklistItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        className={`relative p-8 ${item.color} rounded-[40px_20px_40px_20px] shadow-xl hover:scale-105 transition-transform cursor-default`}
                    >
                        <div className="mb-4 inline-flex items-center justify-center p-3 rounded-full bg-white/90 shadow-sm">
                            <item.icon className={`w-8 h-8 ${item.textColor}`} />
                        </div>
                        <h3 className={`text-2xl font-black mb-3 ${item.color === "bg-brand-pink" ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                        </h3>
                        <p className={`font-medium text-lg leading-relaxed ${item.color === "bg-brand-pink" ? "text-white/90" : "text-gray-800"}`}>
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
