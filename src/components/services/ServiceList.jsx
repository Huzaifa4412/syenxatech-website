"use client";
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
    Cpu,
    MessageSquare,
    Globe,
    Megaphone,
    ArrowRight,
    Check,
} from "lucide-react";
import Link from "next/link";

/*
 * Asymmetric bento: 7/5 then 5/7. One dark flagship tile, one
 * orange-tinted tile, two white tiles. Buttons are pills, cards
 * are rounded-3xl, matching the sitewide shape system.
 */
const services = [
    {
        title: "AI Calling Agents",
        description:
            "Human-sounding voice agents that make and take calls: appointment setting, lead qualification, and support, around the clock.",
        features: [
            "Answers and dials 24/7",
            "Books straight into your calendar",
            "Syncs with your CRM",
            "Handles hundreds of calls at once",
        ],
        icon: Cpu,
        href: "/ai-calling-agents",
        span: "lg:col-span-7",
        tone: "dark",
    },
    {
        title: "AI Chatbots",
        description:
            "One bot that answers customers on WhatsApp, Instagram, Messenger, and your website, and captures every lead.",
        features: [
            "Live on all your channels",
            "Qualifies leads automatically",
            "Delivered in 3 working days",
        ],
        icon: MessageSquare,
        href: "/ai-chatbots",
        span: "lg:col-span-5",
        tone: "light",
    },
    {
        title: "Website Development",
        description:
            "Fast, SEO-ready websites built on Next.js that turn visitors into inquiries, not bounce statistics.",
        features: [
            "Custom design, no templates",
            "Optimized for Core Web Vitals",
            "Delivered in 5 to 7 working days",
        ],
        icon: Globe,
        href: "/website-development",
        span: "lg:col-span-5",
        tone: "tinted",
    },
    {
        title: "Digital Marketing & SEO",
        description:
            "Technical SEO, content and paid acquisition, wired to your chatbots and calling agents so every visitor becomes a tracked lead.",
        features: [
            "Technical SEO and Core Web Vitals",
            "Keyword research and content plans",
            "Paid social and search campaigns",
            "AI marketing automation and CRM sync",
        ],
        icon: Megaphone,
        href: "/digital-marketing",
        span: "lg:col-span-7",
        tone: "light",
    },
];

const toneStyles = {
    dark: {
        card: "bg-zinc-900 border border-zinc-900",
        title: "text-white",
        body: "text-zinc-400",
        feature: "text-zinc-300",
        chip: "bg-white/10 text-[#ff541f]",
        link: "text-white",
    },
    light: {
        card: "bg-white border border-zinc-900/10",
        title: "text-zinc-900",
        body: "text-zinc-600",
        feature: "text-zinc-700",
        chip: "bg-[#ff541f]/10 text-[#ff541f]",
        link: "text-zinc-900",
    },
    tinted: {
        card: "bg-[#ff541f]/[0.06] border border-[#ff541f]/15",
        title: "text-zinc-900",
        body: "text-zinc-600",
        feature: "text-zinc-700",
        chip: "bg-[#ff541f] text-white",
        link: "text-zinc-900",
    },
};

const ServiceList = () => {
    const reduce = useReducedMotion();

    return (
        <section className="w-full py-20 md:py-28 bg-[#faf9f7]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-14 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter">
                        What we build
                    </h2>
                    <p className="mt-4 text-lg text-zinc-600 font-light leading-relaxed">
                        Four services, each one scoped to remove a specific
                        bottleneck from your business.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {services.map((service, idx) => {
                        const tone = toneStyles[service.tone];
                        return (
                            <motion.article
                                key={service.href}
                                initial={reduce ? false : { opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    duration: 0.6,
                                    delay: (idx % 2) * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className={`${service.span} relative group rounded-3xl p-8 md:p-10 flex flex-col overflow-hidden ${tone.card}`}
                            >
                                {service.tone === "dark" && (
                                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff541f]/20 rounded-full blur-[100px] pointer-events-none" />
                                )}

                                <div className="relative flex items-start justify-between mb-8">
                                    <span
                                        className={`flex items-center justify-center size-12 rounded-2xl ${tone.chip}`}
                                    >
                                        <service.icon className="w-6 h-6" strokeWidth={1.8} />
                                    </span>
                                </div>

                                <h3
                                    className={`relative text-2xl md:text-3xl font-bold tracking-tight mb-3 ${tone.title}`}
                                >
                                    <Link href={service.href} className="hover:text-[#ff541f] transition-colors">
                                        {service.title}
                                    </Link>
                                </h3>
                                <p
                                    className={`relative text-sm md:text-base leading-relaxed font-light max-w-[52ch] ${tone.body}`}
                                >
                                    {service.description}
                                </p>

                                <ul className="relative mt-6 mb-8 space-y-2.5">
                                    {service.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className={`flex items-center gap-2.5 text-sm ${tone.feature}`}
                                        >
                                            <Check
                                                className="w-4 h-4 shrink-0 text-[#ff541f]"
                                                strokeWidth={2.5}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={service.href}
                                    className={`relative mt-auto inline-flex items-center gap-2 font-semibold text-sm ${tone.link} w-fit`}
                                >
                                    Learn more about {service.title}
                                    <ArrowRight className="w-4 h-4 text-[#ff541f] group-hover:translate-x-1.5 transition-transform duration-300" />
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#ff541f] group-hover:w-full transition-all duration-300" />
                                </Link>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServiceList;
