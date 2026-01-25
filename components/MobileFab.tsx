"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'

export function MobileFab() {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        // Show only after scrolling past hero (approx 800px)
        if (window.scrollY > 800) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToForm = () => {
        // Assuming form is at top or we scroll to top where form is visible in mobile
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden"
                >
                    <Button
                        onClick={scrollToForm}
                        className="rounded-full shadow-2xl bg-brand-pink text-white font-bold text-lg px-8 py-4 border-b-[4px] border-rose-600 active:border-b-0 active:translate-y-[4px] animate-pulse"
                    >
                        Apply Now
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
