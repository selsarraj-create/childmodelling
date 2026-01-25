"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Smile, Users } from 'lucide-react'

const checklistItems = [
    {
        title: "Natural Spark",
        description: "Does your child love being the center of attention?",
        icon: Sparkles,
        color: "bg-brand-yellow",
        textColor: "text-brand-pink"
    },
    {
        title: "Happy & Relaxed",
        description: "Can they stay comfortable and follow simple directions?",
        icon: Smile,
        color: "bg-brand-blue",
        textColor: "text-blue-600"
    },
    {
        title: "Social Butterfly",
        description: "Are they confident meeting new people and making friends?",
        icon: Users,
        color: "bg-brand-pink",
        textColor: "text-white"
    }
]

export function StarQualityChecklist() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">What Makes a Star?</h2>
                <p className="text-gray-500 font-medium text-lg">It's not about perfect looks—it's about personality!</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
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
                        <h3 className={`text-2xl font-black mb-3 ${item.title === "Social Butterfly" ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                        </h3>
                        <p className={`font-medium text-lg leading-relaxed ${item.title === "Social Butterfly" ? "text-white/90" : "text-gray-800"}`}>
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
