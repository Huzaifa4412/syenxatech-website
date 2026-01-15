"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Smartphone,
    Globe,
    Search,
    ShoppingCart,
    ArrowRight,
    Code,
    Zap,
    Layers,
    ExternalLink,
} from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#ff541f]/50 hover:bg-white/10 transition-all duration-300 group"
    >
        <div className="w-12 h-12 rounded-xl bg-[#ff541f]/10 text-[#ff541f] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#ff541f] transition-colors">
            {title}
        </h3>
        <p className="font-body text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
            {description}
        </p>
    </motion.div>
);

const ProjectCard = ({ title, category, description, image, link, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]"
    >
        {/* Helper function to check if link is valid */}
        {(() => {
            const hasLink = link && link !== "#";
            const LinkComponent = hasLink ? Link : "div";
            const linkProps = hasLink
                ? { href: link, target: "_blank", rel: "noopener noreferrer" }
                : {};

            return (
                <div className="h-64 w-full relative overflow-hidden cursor-pointer">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    {hasLink && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-[#ff541f] hover:border-[#ff541f]"
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            );
        })()}

        <div className="p-8">
            <span className="text-[#ff541f] text-xs font-mono uppercase tracking-widest mb-2 block">
                {category}
            </span>
            <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#ff541f] transition-colors">
                    {title}
                </h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
                {description}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5">
                        Next.js
                    </span>
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5">
                        Tailwind
                    </span>
                </div>
                {link && link !== "#" && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:text-[#ff541f] transition-colors"
                    >
                        Visit Site <ArrowRight size={14} />
                    </a>
                )}
            </div>
        </div>
    </motion.div>
);

const portfolioProjects = [
    {
        title: "Syenxa AI Platform",
        category: "AI SaaS UI",
        description:
            "A modern AI SaaS interface designed to showcase intelligent automation solutions, featuring a clean UI, scalable layout, and conversion-focused experience tailored for cutting-edge tech brands.",
        image: "/website-portfolio/Ai-Saas-UI.png",
        link: "https://syenxatech.vercel.app/",
    },
    {
        title: "Apni Vibe",
        category: "E-Commerce Website",
        description:
            "A modern e-commerce store designed with a clean, engaging interface and seamless shopping experience, optimized for performance, conversions, and brand storytelling.",
        image: "/website-portfolio/aoni-vibe.png",
        link: "https://apnivibe.vercel.app/",
    },
    {
        title: "AuraByNs",
        category: "Perfume Website",
        description:
            "A sleek and elegant website for a premium perfume brand, designed to showcase products with immersive visuals, smooth navigation, and a refined shopping experience.",
        image: "/website-portfolio/aurabyns.png",
        link: "https://aurabyns.netlify.app/",
    },
    {
        title: "Syenxa AI Calorie Tracker",
        category: "AI Fitness App",
        description:
            "An AI-powered fitness app that tracks calories and nutrition by analyzing food photos, helping users achieve their gym and fitness goals with personalized insights and intelligent tracking.",
        image: "/website-portfolio/ai-calorie-tracker.png",
        link: "https://syenxa-ai-calorie-app.vercel.app/",
    },
    {
        title: "Syenxa GYM",
        category: "Gym Website",
        description:
            "A modern and dynamic website for a fitness center, designed to showcase classes, trainers, and membership plans with an engaging user experience and responsive design.",
        image: "/website-portfolio/syenxa-gym.png",
        link: "https://syenxa-gym.vercel.app/",
    },
    {
        title: "Aurora Beauty Salon",
        category: "Beauty & Wellness Website",
        description:
            "A vibrant and user-friendly website for a premium beauty salon, designed to showcase services, appointments, and products with an elegant and immersive online experience.",
        image: "/website-portfolio/aurora-beauty.png",
        link: "https://aurora-beauty-lab.vercel.app/",
    },
];

export default function WebsiteDevelopment() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-[#ff541f]/30 selection:text-[#ff541f]">
            {/* ... (Global Grain and Hero sections remain unchanged) ... */}
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
                        Digital Craftsmanship
                    </span>
                    <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] tracking-tight text-white mb-8">
                        Crafting Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                            Masterpieces.
                        </span>
                    </h1>
                    <p className="font-body text-lg md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-10">
                        We build high-performance, visually stunning websites
                        and apps that define brands and drive real business
                        growth.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-[#ff541f] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Start Your Project
                        </Link>
                        <Link
                            href="#portfolio"
                            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 group"
                        >
                            View Work
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceCard
                        icon={Globe}
                        title="Responsive Web Design"
                        description="Fluid, pixel-perfect designs that look flawless on screens of every size."
                        delay={0.1}
                    />
                    <ServiceCard
                        icon={Smartphone}
                        title="Mobile App Dev"
                        description="Native and cross-platform mobile applications built for performance and scale."
                        delay={0.2}
                    />
                    <ServiceCard
                        icon={Search}
                        title="SEO Optimization"
                        description="Technical SEO baked into every line of code to dominate search rankings."
                        delay={0.3}
                    />
                    <ServiceCard
                        icon={ShoppingCart}
                        title="E-Commerce"
                        description="High-conversion online stores with seamless payment indicators."
                        delay={0.4}
                    />
                </div>
            </section>

            {/* Featured Projects Portfolio */}
            <section
                id="portfolio"
                className="py-24 bg-white/[0.02] border-y border-white/5 relative"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                                Featured Work
                            </h2>
                            <p className="text-white/50 max-w-xl">
                                A selection of our recent projects, showcasing
                                our expertise in design and engineering.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="text-[#ff541f] hover:text-white transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-widest"
                        >
                            Start Yours <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                {...project}
                                delay={0.1 + index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Strip */}
            <section className="py-20 border-b border-white/5 overflow-hidden">
                <div className="text-center mb-10">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                        Powered by Modern Tech
                    </span>
                </div>
                {/* Simple ticker effect or static grid */}
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Using Lucid icons as tech placeholders for now to stick to imports */}
                    <div className="flex flex-col items-center gap-2">
                        <Code size={40} />
                        <span className="text-xs font-mono">NEXT.JS</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Zap size={40} />
                        <span className="text-xs font-mono">REACT</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Layers size={40} />
                        <span className="text-xs font-mono">TAILWIND</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Globe size={40} />
                        <span className="text-xs font-mono">MOTION</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
                    Ready to Build?
                </h2>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-10 py-5 bg-[#ff541f] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                    Get a Quote
                    <ArrowRight size={20} />
                </Link>
            </section>
        </div>
    );
}
