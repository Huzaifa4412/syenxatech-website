"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

const Button = ({ text, variant, onClick, className = "" }) => {
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
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.3);
        y.set(middleY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isPrimary = variant === "primary";

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x: mouseXSpring, y: mouseYSpring }}
            className={`
                relative px-8 py-3 rounded-full font-bold overflow-hidden transition-all duration-300
                ${
                    isPrimary
                        ? "bg-[#ff541f] text-white"
                        : "bg-transparent text-zinc-900 border border-zinc-900/20 hover:border-zinc-900/40"
                }
                ${className}
            `}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative z-10">{text}</span>
            {/* Liquid Hover Effect */}
            <motion.div
                className={`
                    absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${isPrimary ? "bg-white/10" : "bg-zinc-900/5"}
                `}
                initial={{ scale: 0, x: "-50%", y: "-50%" }}
                whileHover={{ scale: 1.5 }}
            />
            {/* Subtle glow for primary */}
            {isPrimary && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
            )}
        </motion.button>
    );
};

export default Button;
