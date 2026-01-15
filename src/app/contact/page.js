"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    ArrowRight,
    Linkedin,
    Twitter,
    Instagram,
    CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
    const [formState, setFormState] = useState("idle"); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState("submitting");
        // Simulate sending
        setTimeout(() => {
            setFormState("success");
        }, 1500);
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

            <div className="container mx-auto px-6 h-full min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 pt-32 lg:pt-0">
                {/* Background Glows */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff541f]/10 rounded-full blur-[128px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

                {/* Left Column: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center"
                >
                    <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-6 w-fit backdrop-blur-md">
                        Get In Touch
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight text-white mb-8">
                        Let's Start a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                            Conversation.
                        </span>
                    </h1>
                    <p className="font-body text-lg text-white/50 max-w-lg leading-relaxed mb-12">
                        Ready to scale your business with AI or build your next
                        digital masterpiece? Reach out to us directly or fill
                        out the form.
                    </p>

                    <div className="space-y-8 mb-12">
                        <div className="flex items-start gap-4 group">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-[#ff541f] group-hover:border-[#ff541f]/30 transition-all duration-300">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-wider text-white/40 mb-1">
                                    Email
                                </h3>
                                <a
                                    href="mailto:syenxatech@gmail.com"
                                    className="text-xl font-display font-medium text-white hover:text-[#ff541f] transition-colors"
                                >
                                    syenxatech@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Optional: Add Location/Phone if needed later */}
                        {/* <div className="flex items-start gap-4 group">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-[#ff541f] group-hover:border-[#ff541f]/30 transition-all duration-300">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-wider text-white/40 mb-1">HQ</h3>
                                <p className="text-xl font-display font-medium text-white">
                                    San Francisco, CA
                                </p>
                            </div>
                        </div> */}
                    </div>

                    <div className="flex gap-4">
                        {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff541f]/20 to-transparent rounded-3xl blur-2xl opacity-20 pointer-events-none" />
                    <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                        {formState === "success" ? (
                            <div className="h-[400px] flex flex-col items-center justify-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-[#ff541f] rounded-full flex items-center justify-center text-white mb-6"
                                >
                                    <CheckCircle2 size={40} />
                                </motion.div>
                                <h3 className="text-3xl font-display font-bold text-white mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-white/50 mb-8">
                                    We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setFormState("idle")}
                                    className="text-[#ff541f] font-bold hover:text-white transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form
                                action={"https://formspree.io/f/mjkjzeja"}
                                method="POST"
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase tracking-wider text-white/50">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff541f] focus:bg-white/10 transition-all placeholder:text-white/20"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase tracking-wider text-white/50">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff541f] focus:bg-white/10 transition-all placeholder:text-white/20"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-wider text-white/50">
                                        Internet
                                    </label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff541f] focus:bg-white/10 transition-all appearance-none cursor-pointer">
                                        <option className="bg-[#0a0a0a]">
                                            AI Automation & Agents
                                        </option>
                                        <option className="bg-[#0a0a0a]">
                                            Website Development
                                        </option>
                                        <option className="bg-[#0a0a0a]">
                                            Mobile App Development
                                        </option>
                                        <option className="bg-[#0a0a0a]">
                                            Strategic Consulting
                                        </option>
                                        <option className="bg-[#0a0a0a]">
                                            Other
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-wider text-white/50">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff541f] focus:bg-white/10 transition-all placeholder:text-white/20 resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formState === "submitting"}
                                    className="w-full py-4 bg-[#ff541f] text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {formState === "submitting" ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <Send
                                                size={18}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
