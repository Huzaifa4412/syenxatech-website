"use client";
import React from "react";
import { motion } from "motion/react";
import { BorderBeam } from "./ui/border-beam";
import {
    Cpu,
    MessageSquare,
    Globe,
    Smartphone,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

const Services = () => {
    const services = [
        {
            title: "AI Calling Agent",
            description:
                "Boost your customer outreach with automated calling solutions, appointment reminders, and follow-up services powered by smart voice technology. Trusted by businesses worldwide.",
            icon: Cpu,
            href: "/ai-calling-agents",
            color: "#ff541f",
            span: "lg:col-span-1",
        },
        {
            title: "Website Development",
            description:
                "High-performance, SEO-optimized, and mobile-responsive websites designed to convert visitors into loyal customers.",
            icon: Globe,
            href: "/website-development",
            color: "#d4a900",
            span: "lg:col-span-2",
        },
        {
            title: "AI Chatbot",
            description:
                "Intelligent chat automation across social platforms, providing 24/7 support and lead qualification for your growing business.",
            icon: MessageSquare,
            href: "/ai-chatbots",
            color: "#ff541f",
            span: "lg:col-span-2",
        },
        {
            title: "Digital Marketing & Apps",
            description:
                "Custom Android and iOS mobile applications with scalable architecture and seamless user experiences for national brands.",
            icon: Smartphone,
            href: "/digital-marketing",
            color: "#d4a900",
            span: "lg:col-span-1",
        },
    ];

    return (
        <section
            id="services"
            className="w-full py-24 bg-[#faf9f7] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#ff541f] text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
                        >
                            What We Do
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-6xl font-bold text-zinc-900 tracking-tighter leading-tight"
                        >
                            Our Services &{" "}
                            <span className="text-[#ff541f]">Expertise</span>.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-500 text-lg mt-6 leading-relaxed font-light"
                        >
                            Unlock the full potential of your business with our
                            cutting-edge AI Calling Agents, custom AI Chatbots,
                            and premium Digital solutions.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`${service.span} relative group`}
                        >
                            <div className="h-full p-8 rounded-[2.5rem] bg-white/60 border border-zinc-900/5 backdrop-blur-xl flex flex-col justify-between transition-all duration-500 hover:bg-white hover:border-zinc-900/10 overflow-hidden min-h-[320px]">
                                <BorderBeam
                                    size={200}
                                    duration={12}
                                    delay={idx * 2}
                                    colorFrom={service.color}
                                    colorTo={service.color}
                                    className="opacity-0 group-hover:opacity-100"
                                />

                                <div className="z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div
                                            className={`p-4 rounded-2xl bg-zinc-900/5 text-zinc-700 group-hover:bg-[#ff541f]/10 group-hover:text-[#ff541f] transition-all duration-300`}
                                        >
                                            <service.icon className="w-8 h-8" />
                                        </div>
                                        <Link
                                            href={service.href}
                                            className="size-12 rounded-full border border-zinc-900/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all group-hover:rotate-45"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                    <h3 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tighter">
                                        {service.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed font-light max-w-[80%]">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Subtle glow on hover */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#ff541f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
