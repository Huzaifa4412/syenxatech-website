"use client";
import { motion } from "motion/react";

export const FluidHeader = ({ text, className = "" }) => {
    const words = text.split(" ");
    return (
        <h1
            className={`text-[clamp(2.5rem,6vw,4rem)] font-light tracking-tighter text-zinc-900 leading-[1] ${className}`}
        >
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden mr-[0.2em] pb-[0.1em]"
                >
                    <motion.span
                        initial={{ y: "110%", opacity: 0, rotate: 5 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{
                            duration: 1.2,
                            delay: i * 0.1,
                            ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for 'fluid' feel
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </h1>
    );
};

export default FluidHeader;
