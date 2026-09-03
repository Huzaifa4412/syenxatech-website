"use client";
import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Cpu, MessageSquare, Globe, Smartphone, ArrowUpRight } from "lucide-react";

const serviceIndex = [
    { name: "AI Calling Agents", href: "/ai-calling-agents", icon: Cpu },
    { name: "AI Chatbots", href: "/ai-chatbots", icon: MessageSquare },
    { name: "Website Development", href: "/website-development", icon: Globe },
    { name: "Mobile App Development", href: "/digital-marketing", icon: Smartphone },
];

const ServicesHero = () => {
    const reduce = useReducedMotion();

    const fadeUp = (delay = 0) => ({
        initial: reduce ? false : { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    });

    return (
        <section className="relative w-full overflow-hidden bg-[#faf9f7]">
            {/* Ambient brand glow, kept off the text column */}
            <div className="absolute -top-32 right-[-10%] w-[540px] h-[540px] bg-[#ff541f]/[0.07] rounded-full blur-[130px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left: message */}
                <div className="lg:col-span-7">
                    <motion.h1
                        {...fadeUp(0)}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tighter leading-[1.02] max-w-[14ch]"
                    >
                        Everything you need to automate and{" "}
                        <span className="text-[#ff541f]">grow</span>.
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.12)}
                        className="mt-6 text-lg md:text-xl text-zinc-600 leading-relaxed font-light max-w-[46ch]"
                    >
                        AI calling agents, chatbots, websites, and mobile apps
                        for businesses that want results without the overhead.
                    </motion.p>

                    <motion.div
                        {...fadeUp(0.22)}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-full bg-[#ff541f] text-white font-bold text-sm hover:bg-zinc-900 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#ff541f]/20"
                        >
                            Book a Demo
                        </Link>
                        <a
                            href="#process"
                            className="px-8 py-4 rounded-full border border-zinc-900/15 text-zinc-800 font-medium text-sm hover:border-zinc-900/40 active:scale-[0.98] transition-all duration-300"
                        >
                            How we work
                        </a>
                    </motion.div>
                </div>

                {/* Right: live service index */}
                <motion.nav
                    {...fadeUp(0.18)}
                    aria-label="Our services"
                    className="lg:col-span-5 w-full"
                >
                    <ul className="rounded-3xl bg-white border border-zinc-900/10 shadow-xl shadow-zinc-900/5 divide-y divide-zinc-900/5 overflow-hidden">
                        {serviceIndex.map((service) => (
                            <li key={service.href}>
                                <Link
                                    href={service.href}
                                    className="group flex items-center gap-4 px-6 py-5 hover:bg-[#ff541f]/[0.04] transition-colors"
                                >
                                    <span className="flex items-center justify-center size-10 rounded-xl bg-zinc-900/5 text-zinc-700 group-hover:bg-[#ff541f] group-hover:text-white transition-colors duration-300">
                                        <service.icon className="w-5 h-5" strokeWidth={1.8} />
                                    </span>
                                    <span className="font-semibold text-zinc-900 group-hover:translate-x-1 transition-transform duration-300">
                                        {service.name}
                                    </span>
                                    <ArrowUpRight
                                        className="w-4 h-4 ml-auto text-zinc-400 group-hover:text-[#ff541f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                                        strokeWidth={1.8}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.nav>
            </div>
        </section>
    );
};

export default ServicesHero;
