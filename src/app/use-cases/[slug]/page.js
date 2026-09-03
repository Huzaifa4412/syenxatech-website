"use client";

import React, { useEffect } from "react";
import { useCasesData } from "@/lib/use-cases-data";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
    Check,
    ArrowRight,
    Phone,
    Calendar,
    MessageCircle,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import CountUp from "@/components/countup";

const DetailPage = ({ params }) => {
    // Unwrap params using React.use() or await in newer Next.js versions if this was a server component.
    // Since this is a client component receiving params prop (Next.js 13/14 behavior for client pages), we access it directly.
    // Note: dependent on Next.js version, params might need unwrapping.
    // Given current context (15.1.11), params is a Promise in Server Components but passed as prop in Client?
    // Actually in 15+, dynamic params in page.js are async.
    // BUT this is marked "use client".
    // Let's use `React.use` for unwrapping if needed, or handle it safely.
    // Safe bet: await properly if async. Since we can't await in top level of client component easily without suspence:
    // We will assume layout passes it or we unwrap.
    // Let's look at standard 15 patterns. `params` is a Promise.
    // So we need to `use(params)`.

    const { slug } = React.use(params);

    const data = useCasesData[slug];

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#faf9f7] text-zinc-900 selection:bg-[#ff541f]/30 selection:text-[#ff541f]">
            {/* Global Grain */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-white"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Back Button */}
            <div className="absolute top-24 left-6 md:left-12 z-50">
                <Link
                    href="/use-cases"
                    className="flex items-center gap-2 text-zinc-600 hover:text-[#ff541f] transition-colors group"
                >
                    <ArrowLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="font-mono text-xs tracking-wider uppercase">
                        Back to Use Cases
                    </span>
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff541f]/10 rounded-full blur-[128px] pointer-events-none" />

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-display text-4xl md:text-7xl font-bold leading-[1.1] text-zinc-900 mb-6"
                >
                    {data.hero.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-body text-lg md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed"
                >
                    {data.hero.subtitle}
                </motion.p>
            </section>

            {/* Challenges Section */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        Common Challenges
                    </h2>
                    <div className="h-1 w-20 bg-[#ff541f] mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.challenges.map((challenge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-zinc-900/5 border border-zinc-900/10 hover:border-[#ff541f]/50 transition-colors duration-300"
                        >
                            <div className="mb-4 text-[#ff541f] opacity-80">
                                <Check size={24} />
                            </div>
                            <p className="font-body text-zinc-800 leading-relaxed">
                                {challenge}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Solutions Section */}
            <section className="py-20 bg-zinc-900/5 border-y border-zinc-900/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-16">
                        <span className="text-[#ff541f] font-mono uppercase tracking-widest text-sm mb-2 block">
                            AI Capabilities
                        </span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold">
                            Intelligent Solutions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                        {data.solutions.map((solution, index) => (
                            <div key={index} className="group">
                                <div className="flex items-start gap-4 mb-4">
                                    <span className="font-display text-4xl text-zinc-200 group-hover:text-[#ff541f] transition-colors duration-500 font-bold">
                                        0{index + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-zinc-900 mb-2 group-hover:text-[#ff541f] transition-colors">
                                            {solution.title}
                                        </h3>
                                        <p className="font-body text-zinc-600 leading-relaxed">
                                            {solution.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-zinc-900/10 group-hover:bg-[#ff541f]/30 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-[#faf9f7] relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                    {data.stats.map((stat, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-baseline justify-center font-display font-bold text-6xl md:text-7xl text-zinc-900">
                                <CountUp
                                    to={stat.value}
                                    duration={2.5}
                                    className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-900/50"
                                />
                                <span className="text-[#ff541f] text-4xl ml-1">
                                    {stat.suffix}
                                </span>
                            </div>
                            <p className="font-mono text-sm text-zinc-500 uppercase tracking-widest px-8">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Case Study Section */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="rounded-3xl bg-white border border-zinc-900/10 p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ff541f]/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff541f]/10 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-6">
                                Success Story
                            </span>
                            <h2 className="font-display text-3xl md:text-5xl font-bold mb-8 text-zinc-900">
                                {data.caseStudy.title}
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-zinc-900 font-bold mb-2 flex items-center gap-2">
                                        <Phone
                                            size={18}
                                            className="text-[#ff541f]"
                                        />{" "}
                                        The Challenge
                                    </h4>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        {data.caseStudy.challenge}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-zinc-900 font-bold mb-2 flex items-center gap-2">
                                        <MessageCircle
                                            size={18}
                                            className="text-[#ff541f]"
                                        />{" "}
                                        The Solution
                                    </h4>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        {data.caseStudy.solution}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/5 rounded-2xl p-8 border border-zinc-900/5 flex flex-col justify-center relative">
                            {/* Quote Icon */}
                            <div className="absolute top-8 left-8 text-[#ff541f]/20 font-serif text-8xl leading-none">
                                "
                            </div>

                            <blockquote className="relative z-10 text-xl font-body italic text-zinc-800 leading-relaxed mb-6">
                                {data.caseStudy.result}
                            </blockquote>
                            <div className="h-[1px] w-12 bg-[#ff541f] mb-4" />
                            <cite className="not-italic text-sm text-zinc-500 block">
                                — {data.caseStudy.title}
                            </cite>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 text-center">
                <h2 className="font-display text-4xl font-bold text-zinc-900 mb-8">
                    Ready to transform your business?
                </h2>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff541f] text-white font-bold rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-300 group"
                >
                    Get Started Now
                    <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            </section>
        </div>
    );
};

export default DetailPage;
