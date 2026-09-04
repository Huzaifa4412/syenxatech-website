"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

/**
 * Magnetic CTA. Pass `href` to render a real, crawlable link (next/link);
 * without it a plain button is rendered for onClick handlers.
 */
const Button = ({ text, variant, onClick, href, className = "" }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } =
            ref.current.getBoundingClientRect();
        x.set((clientX - (left + width / 2)) * 0.3);
        y.set((clientY - (top + height / 2)) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isPrimary = variant === "primary";

    const classes = `
        relative inline-flex items-center justify-center px-8 py-3 rounded-full font-bold overflow-hidden transition-all duration-300
        ${
            isPrimary
                ? "bg-[#ff541f] text-white"
                : "bg-transparent text-zinc-900 border border-zinc-900/20 hover:border-zinc-900/40"
        }
        ${className}
    `;

    const inner = (
        <>
            <span className="relative z-10">{text}</span>
            <motion.span
                aria-hidden
                className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isPrimary ? "bg-white/10" : "bg-zinc-900/5"
                }`}
                initial={{ scale: 0, x: "-50%", y: "-50%" }}
                whileHover={{ scale: 1.5 }}
            />
            {isPrimary && (
                <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"
                />
            )}
        </>
    );

    if (href) {
        return (
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: mouseXSpring, y: mouseYSpring }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
            >
                <Link href={href} onClick={onClick} className={classes}>
                    {inner}
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.button
            ref={ref}
            type="button"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x: mouseXSpring, y: mouseYSpring }}
            className={classes}
            whileTap={{ scale: 0.95 }}
        >
            {inner}
        </motion.button>
    );
};

export default Button;
