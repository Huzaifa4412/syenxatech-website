"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * ShinyText - React Bits inspired subtle sheen effect.
 * Sweeps a subtle light reflection across text for high-end micro-interactions.
 */
export function ShinyText({
    children,
    className = "",
    shimmerWidth = 100,
    speed = 3,
    color,
    shimmerColor,
    ...props
}) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return (
            <span className={className} {...props}>
                {children}
            </span>
        );
    }

    return (
        <span
            className={cn(
                "relative inline-block overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-current via-white/80 to-current bg-[length:200%_100%] animate-shimmer",
                className
            )}
            style={{
                animationDuration: `${speed}s`,
                ...props.style,
            }}
            {...props}
        >
            {children}
        </span>
    );
}

export default ShinyText;
