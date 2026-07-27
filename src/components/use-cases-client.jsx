"use client";

import React from "react";
import UseCaseCard from "@/components/use-case-card";
import { Stethoscope, Building2, Dumbbell, Scissors } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
    {
        title: "Healthcare Provider",
        description:
            "Revolutionize patient care. Automate scheduling, pre-visit screening, and medication reminders. Cut no-shows by 40% with intelligent follow-ups.",
        icon: <Stethoscope size={48} strokeWidth={1.5} />,
        href: "/use-cases/doctor",
        variant: "large",
        className: "md:col-span-2 md:row-span-1",
    },
    {
        title: "Real Estate Inc.",
        description: "Qualify leads and schedule viewings 24/7 on autopilot with AI voice agents.",
        icon: <Building2 size={32} strokeWidth={1.5} />,
        href: "/use-cases/real-estate",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Fitness & Gyms",
        description:
            "Boost retention with automated booking & renewal campaigns.",
        icon: <Dumbbell size={32} strokeWidth={1.5} />,
        href: "/use-cases/gym",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Beauty & Spa",
        description:
            "Seamless booking management for high-end salons. Handle confirmations, rescheduling, and waitlists without lifting a finger.",
        icon: <Scissors size={48} strokeWidth={1.5} />,
        href: "/use-cases/beauty-salon",
        variant: "large",
        className: "md:col-span-2 md:row-span-1",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    },
};

export default function UseCasesClient() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-[#ff541f]/30 selection:text-[#ff541f]">
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-white"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative pt-32 pb-24 px-6 md:px-12 max-w-8xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-24 relative text-center z-10"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff541f]/10 rounded-full blur-[128px] pointer-events-none" />

                    <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
                        Industry Solutions & Use Cases
                    </span>

                    <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] tracking-tight text-white mb-8">
                        AI Voice & Chatbot <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                            Industry Use Cases.
                        </span>
                    </h1>

                    <p className="font-body text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                        Explore how Syenxa Tech AI voice agents and custom chatbots transform sales, appointment booking, and customer support for real estate, healthcare, fitness, and e-commerce businesses.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
                >
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={useCase.className}
                        >
                            <UseCaseCard
                                title={useCase.title}
                                description={useCase.description}
                                icon={useCase.icon}
                                href={useCase.href}
                                variant={useCase.variant}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
