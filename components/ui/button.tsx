import * as React from "react"
import { cn } from "@/lib/utils"

// Since we didn't install cva or radix slot, implementing a simpler version first
// Wait, I should have installed class-variance-authority if using cva.
// I will just do standard prop logic for now to avoid extra install steps if not needed, 
// but cva is standard shadcn. I'll stick to simple props for speed unless I installed it.
// Checking package.json... I did NOT install class-variance-authority or radix-ui/react-slot.
// I'll stick to a simpler implementation for now or install them. 
// "Tactile Maximalism" needs good buttons. I'll make a robust component without cva/slot for now to save a command cycle.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'default', ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95"

        const variants = {
            primary: "bg-brand-pink text-white hover:bg-brand-pink/90 border-b-[6px] border-rose-600 active:border-b-0 active:translate-y-[6px] transition-all hover:-translate-y-1 shadow-xl shadow-brand-pink/30",
            secondary: "bg-brand-yellow text-gray-900 hover:bg-brand-yellow/90 border-b-[6px] border-yellow-600 active:border-b-0 active:translate-y-[6px] transition-all hover:-translate-y-1 shadow-xl shadow-brand-yellow/30",
            outline: "border-2 border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 border-b-4 active:border-b-2 active:translate-y-[2px]",
            ghost: "hover:bg-gray-100 hover:text-gray-900 border-transparent",
        }

        const sizes = {
            default: "h-12 px-6 py-2 text-base",
            sm: "h-10 rounded-full px-4 text-xs",
            lg: "h-14 rounded-full px-10 text-lg",
            icon: "h-10 w-10",
        }

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
