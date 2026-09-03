"use client";
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { PhoneCall, PenTool, Rocket } from "lucide-react";

const steps = [
    {
        icon: PhoneCall,
        title: "Discovery call",
        description:
            "A free consultation where we map your current workflow and pick the automation with the fastest payback.",
        detail: "You leave with a fixed quote and a delivery date.",
    },
    {
        icon: PenTool,
        title: "Build and review",
        description:
            "We design and build in short cycles, and you review working versions instead of slide decks.",
        detail: "Chatbots ship in 3 days, websites in 5 to 7.",
    },
    {
        icon: Rocket,
        title: "Launch and support",
        description:
            "We deploy, connect your channels and CRM, and stay on for tuning once real customers hit the system.",
        detail: "Support is included, not an upsell.",
    },
];

const ProcessSection = () => {
    const reduce = useReducedMotion();

    return (
        <section
            id="process"
            className="w-full py-20 md:py-28 bg-[#faf9f7] border-y border-zinc-900/5"
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8">
                {/* Sticky intro column */}
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-32">
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter max-w-[12ch]">
                            From first call to launch
                        </h2>
                        <p className="mt-5 text-lg text-zinc-600 font-light leading-relaxed max-w-[40ch]">
                            No long contracts and no surprise scope. Three
                            steps, each with a clear deliverable.
                        </p>
                    </div>
                </div>

                {/* Steps rail */}
                <div className="lg:col-span-7">
                    <ol className="relative">
                        {steps.map((step, idx) => (
                            <motion.li
                                key={step.title}
                                initial={reduce ? false : { opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{
                                    duration: 0.6,
                                    delay: idx * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative flex gap-6 md:gap-8 pb-12 last:pb-0"
                            >
                                {/* Rail line */}
                                {idx < steps.length - 1 && (
                                    <span
                                        aria-hidden
                                        className="absolute left-6 top-14 bottom-0 w-px bg-zinc-900/10"
                                    />
                                )}

                                <span className="relative z-10 flex items-center justify-center size-12 shrink-0 rounded-2xl bg-white border border-zinc-900/10 text-[#ff541f] shadow-sm shadow-zinc-900/5">
                                    <step.icon className="w-5 h-5" strokeWidth={1.8} />
                                </span>

                                <div className="pt-1.5">
                                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2.5 text-zinc-600 font-light leading-relaxed max-w-[52ch]">
                                        {step.description}
                                    </p>
                                    <p className="mt-3 text-sm font-medium text-[#ff541f]">
                                        {step.detail}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
