"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * BlurText - React Bits inspired text reveal.
 * Words or characters start softly blurred and transition into sharp, crisp focus.
 * Respects prefers-reduced-motion and preserves inline styling.
 */
export function BlurText({
    text = "",
    children,
    delay = 60,
    duration = 0.55,
    className = "",
    animateBy = "words", // "words" | "chars"
    direction = "bottom", // "top" | "bottom"
    threshold = 0.05,
    rootMargin = "0px",
    as: Tag = "span",
    onAnimationComplete,
    ...props
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin });
    const prefersReducedMotion = useReducedMotion();

    // If string text is supplied, split it. Otherwise use children directly if static.
    const rawText = text || (typeof children === "string" ? children : "");
    const elements = animateBy === "words" 
        ? rawText.split(/\s+/).filter(Boolean)
        : rawText.split("");

    const initialY = direction === "top" ? -18 : 18;

    if (prefersReducedMotion || !rawText) {
        return (
            <Tag ref={ref} className={className} {...props}>
                {children || text}
            </Tag>
        );
    }

    return (
        <Tag
            ref={ref}
            className={cn("inline-flex flex-wrap items-baseline gap-x-[0.28em]", className)}
            {...props}
        >
            {elements.map((segment, index) => (
                <motion.span
                    key={`${segment}-${index}`}
                    initial={{
                        opacity: 0,
                        filter: "blur(8px)",
                        y: initialY,
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                                  filter: "blur(0px)",
                                  y: 0,
                              }
                            : {}
                    }
                    transition={{
                        duration,
                        delay: (index * delay) / 1000,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    onAnimationComplete={
                        index === elements.length - 1 ? onAnimationComplete : undefined
                    }
                    className="inline-block will-change-[transform,filter,opacity]"
                >
                    {segment}
                </motion.span>
            ))}
        </Tag>
    );
}

export default BlurText;
