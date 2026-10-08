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
    y = 24,
    amount = 0.25,
    className = "",
    children,
    ...rest
}) {
    const reduce = useReducedMotion();
    const Tag = motion[as] || motion.div;

    return (
        <Tag
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.7, delay, ease: EASE_OUT }}
            className={className}
            {...rest}
        >
            {children}
        </Tag>
    );
}
