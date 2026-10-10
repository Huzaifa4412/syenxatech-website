"use client";
import { motion, useReducedMotion } from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1];

/**
 * Scroll-reveal leaf. Keeps the surrounding sections as server components;
 * only this wrapper hydrates. Collapses to static under reduced motion.
 */
export default function Reveal({
    as = "div",
    delay = 0,
    y = 20,
    blur = 0,
    amount = 0.2,
    className = "",
    children,
    ...rest
}) {
    const reduce = useReducedMotion();
    const Tag = motion[as] || motion.div;

    const initial = reduce
        ? false
        : blur
        ? { opacity: 0, y, filter: `blur(${blur}px)` }
        : { opacity: 0, y };

    const animateIn = blur
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 1, y: 0 };

    return (
        <Tag
            initial={initial}
            whileInView={animateIn}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.7, delay, ease: EASE_OUT }}
            className={className}
            {...rest}
        >
            {children}
        </Tag>
    );
}
