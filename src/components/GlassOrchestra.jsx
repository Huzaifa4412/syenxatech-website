"use client";
import { motion } from "motion/react";

export const GlassOrchestra = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Main Ambient Glows */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-[#ff541f]/10 blur-[120px] rounded-full"
            />
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#ff541f]/5 blur-[100px] rounded-full"
            />

            {/* Floating Glass Blobs */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-zinc-900/[0.03] border border-zinc-900/[0.06] backdrop-blur-3xl rounded-3xl rotate-12 animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-zinc-900/[0.03] border border-zinc-900/[0.06] backdrop-blur-2xl rounded-[3rem] -rotate-12 animate-bounce [animation-duration:10s]" />

            {/* Subtle Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
                }}
            />
        </div>
    );
};

export default GlassOrchestra;
