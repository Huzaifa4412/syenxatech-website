"use client";

import React from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const UseCaseCard = ({
    title,
    description,
    icon,
    href,
    className,
    variant = "default",
}) => {
    const isLarge = variant === "large";

    // Mouse position for spotlight effect
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <Link
            href={href}
            className={`block group relative h-full w-full ${className || ""}`}
            onMouseMove={handleMouseMove}
        >
            <div
                className={`relative h-full overflow-hidden rounded-3xl border border-zinc-900/5 bg-white transition-all duration-500 group-hover:border-zinc-900/10`}
            >
                {/* Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 84, 31, 0.1),
                transparent 80%
              )
            `,
                    }}
                />

                {/* Content Container */}
                <div className="relative z-10 flex h-full flex-col justify-between p-8">
                    {/* Top Row: Icon & Arrow */}
                    <div className="flex justify-between items-start mb-auto">
                        {" "}
                        {/* Changed mb-8 to mb-auto to push content down if needed, but flex-col justify-between handles spacing */}
                        <div
                            className={`
                        rounded-2xl border border-zinc-900/5 bg-zinc-900/5 text-[#ff541f]
                        transition-transform duration-500 group-hover:scale-110 group-hover:border-[#ff541f]/20
                        ${isLarge ? "p-6" : "p-4"}
                    `}
                        >
                            {icon}
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-900/5 bg-zinc-900/5 text-zinc-500 transition-colors duration-300 group-hover:border-zinc-900/20 group-hover:text-zinc-900">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="mt-8">
                        {" "}
                        {/* Added explicitly margin top ensuring separation */}
                        <h3
                            className={`
                        font-display font-bold text-zinc-900 leading-none
                        transition-colors duration-300 group-hover:text-[#ff541f]
                        ${isLarge ? "text-5xl mb-6" : "text-3xl mb-4"} 
                    `}
                        >
                            {title}
                        </h3>
                        <p
                            className={`
                        font-body text-zinc-600 leading-relaxed
                        transition-colors duration-300 group-hover:text-zinc-700
                        ${isLarge ? "text-xl max-w-2xl" : "text-base"}
                    `}
                        >
                            {description}
                        </p>
                    </div>
                </div>

                {/* Inner Grain Texture Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>
        </Link>
    );
};

export default UseCaseCard;
