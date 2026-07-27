"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Phone,
    Clock,
    TrendingUp,
    ShieldCheck,
    Globe,
    Calendar,
    MessageSquare,
    ChevronDown,
    HelpCircle,
} from "lucide-react";

import { aiCallingFaqs } from "@/lib/faqs";

export default function AICallingAgentsClient() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-[#ff541f]/30 selection:text-[#ff541f]">
            {/* Global Grain Texture */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-white"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-center z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff541f]/10 rounded-full blur-[128px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
                        Autonomous AI Voice Agents & Call Automation
                    </span>
                    <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] tracking-tight text-white mb-8">
                        AI Calling Agents <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                            For Sales & Outbound Calls.
                        </span>
                    </h1>
                    <p className="font-body text-lg md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-10">
                        Speed to lead is everything. Syenxa Tech's intelligent AI voice agents provide 24/7 global outbound and inbound phone coverage, qualifying leads and booking appointments in seconds.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-[#ff541f] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-[#ff541f]/20"
                        >
                            Deploy Your AI Voice Agent
                        </Link>
                        <Link
                            href="/use-cases"
                            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 group"
                        >
                            View Real Use Cases
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { value: "100%", label: "Instant Lead Coverage" },
                        { value: "<5s", label: "Average Response Time" },
                        { value: "24/7", label: "Global Availability" },
                        { value: "3x", label: "Higher Conversion Rate" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="font-display font-bold text-4xl md:text-5xl text-white mb-2">
                                <span className="text-[#ff541f]">{stat.value}</span>
                            </div>
                            <p className="text-white/40 text-sm uppercase tracking-wider font-mono">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Built for Performance */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        Why Businesses Choose AI Voice Agents
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Replace call center overhead with custom AI outbound and inbound voice agents built for high conversion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "24/7 Inbound & Outbound Calling",
                            desc: "Never lose a lead to voicemail. AI Voice Agents respond instantly day or night across global time zones.",
                            icon: Clock,
                        },
                        {
                            title: "Human-grade Conversational Voice AI",
                            desc: "Conversations that sound natural, empathetic, professional, and tailored to your brand voice.",
                            icon: MessageSquare,
                        },
                        {
                            title: "Infinite Call Scalability",
                            desc: "Scale from 10 calls to 10,000 simultaneous calls effortlessly without expanding staff headcount.",
                            icon: Globe,
                        },
                        {
                            title: "Real-time CRM & Calendar Auto-Booking",
                            desc: "Syncs directly with Google Calendar, Outlook, HubSpot, and Salesforce to book qualified meetings instantly.",
                            icon: Calendar,
                        },
                        {
                            title: "Intelligent Lead Qualification",
                            desc: "Custom AI prompts screen prospects, verify budget, and escalate high-value opportunities to human reps.",
                            icon: ShieldCheck,
                        },
                        {
                            title: "Proven Revenue Growth",
                            desc: "Accelerate deal velocity, reduce cost per acquisition, and boost sales pipeline throughput.",
                            icon: TrendingUp,
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#ff541f]/50 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#ff541f]/10 text-[#ff541f] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#ff541f] transition-colors">
                                {feature.title}
                            </h3>
                            <p className="font-body text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SEO FAQ Section */}
            <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 border-t border-white/10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-4">
                        <HelpCircle size={14} /> Frequently Asked Questions
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                        Everything You Need to Know About AI Voice Agents
                    </h2>
                    <p className="text-white/50 text-base md:text-lg">
                        Get answers to key questions on implementation, booking rates, and CRM integration.
                    </p>
                </div>

                <div className="space-y-4">
                    {aiCallingFaqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-colors hover:border-white/20"
                        >
                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                            >
                                <span className="font-display font-semibold text-lg text-white">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#ff541f] shrink-0 transition-transform duration-300 ${
                                        openFaq === idx ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openFaq === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-6 text-white/70 leading-relaxed font-body"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#ff541f]/5" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">
                        Ready to Automate Your Outbound & Inbound Sales Calls?
                    </h2>
                    <p className="text-xl text-white/60 mb-10">
                        Book a free demo to see how Syenxa Tech custom AI voice agents fit your business workflow.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-[#ff541f] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 scale-100 hover:scale-105 shadow-xl shadow-[#ff541f]/20"
                    >
                        Schedule a Live Voice AI Demo
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
