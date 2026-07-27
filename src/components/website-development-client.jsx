"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
    ChevronDown,
    HelpCircle,
} from "lucide-react";

import { webDevFaqs } from "@/lib/faqs";

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
        {(() => {
            const hasLink = link && link !== "#";
            return (
                <div className="h-64 w-full relative overflow-hidden cursor-pointer">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
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
        title: "Home Services",
        category: "Home Services Website",
        description:
            "A professional website for a home services client, built to highlight service offerings, streamline customer inquiries, and establish a trustworthy online presence with a clean, user-friendly design.",
        image: "/website-portfolio/home-services1.png",
        link: "https://home-service-site.vercel.app/",
    },
    {
        title: "Pane Di Dio",
        category: "Bakery Website",
        description:
            "A warm and inviting website for an Italian bakery, crafted to showcase artisan breads and pastries with rich visuals, an appetizing layout, and a delightful browsing experience that mirrors the brand's heritage.",
        image: "/website-portfolio/pane-di-dio.png",
        link: "https://pane-di-dio-website.vercel.app/",
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
        title: "Home Services Pro",
        category: "Home Services Website",
        description:
            "A conversion-focused website for a home services business, featuring service catalogs, booking flows, and trust-building elements designed to turn visitors into loyal customers.",
        image: "/website-portfolio/home-services.png",
        link: "https://home-services-virid.vercel.app/",
    },
    {
        title: "Knitty Petit",
        category: "E-Commerce Website",
        description:
            "A charming online store for custom kids' sweaters, blending playful design with a seamless shopping experience — from product browsing to checkout — built to delight parents and grow the brand.",
        image: "/website-portfolio/knittypetit.png",
        link: "https://www.knittypetit.shop/",
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
        title: "Nature Tech",
        category: "Industrial & Energy Website",
        description:
            "A robust website for a timber and clean-energy specialist, presenting their wood-to-fuel pipeline, EN+ graded pellets, and custom burner engineering with authoritative design and clear technical communication.",
        image: "/website-portfolio/naturetech.png",
        link: "https://naturetech-website.vercel.app/",
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
        title: "Neon Craft",
        category: "Custom Products Website",
        description:
            "A bold and eye-catching website for a custom neon sign studio, designed to showcase vibrant creations, streamline custom orders, and capture the brand's creative energy with striking visuals.",
        image: "/website-portfolio/neon-craft.png",
        link: "https://website-codex-ivory.vercel.app/",
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

export default function WebsiteDevelopmentClient() {
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
                        Custom Web Development Services
                    </span>
                    <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] tracking-tight text-white mb-8">
                        Custom Website <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                            Development Agency.
                        </span>
                    </h1>
                    <p className="font-body text-lg md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-10">
                        We build high-performance Next.js websites, custom web apps, and modern digital platforms engineered for lightning speed, technical SEO, and business growth.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-[#ff541f] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-[#ff541f]/20"
                        >
                            Start Your Website Project
                        </Link>
                        <Link
                            href="#portfolio"
                            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 group"
                        >
                            View Our Portfolio
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
                        description="Fluid, pixel-perfect layouts engineered to look flawless on every desktop and mobile viewport."
                        delay={0.1}
                    />
                    <ServiceCard
                        icon={Smartphone}
                        title="Mobile App Dev"
                        description="High-performance iOS and Android applications built for maximum scalability."
                        delay={0.2}
                    />
                    <ServiceCard
                        icon={Search}
                        title="Technical SEO Built-in"
                        description="Core Web Vitals, JSON-LD schemas, and fast server-side rendering built into every page."
                        delay={0.3}
                    />
                    <ServiceCard
                        icon={ShoppingCart}
                        title="E-Commerce Platforms"
                        description="Secure, high-conversion web stores with seamless payments and fast product discovery."
                        delay={0.4}
                    />
                </div>
            </section>

            {/* Portfolio */}
            <section
                id="portfolio"
                className="py-24 bg-white/[0.02] border-y border-white/5 relative"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                                Featured Web Development Projects
                            </h2>
                            <p className="text-white/50 max-w-xl">
                                Explore a curated selection of our custom Next.js websites and web applications built for clients worldwide.
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

            {/* Tech Stack */}
            <section className="py-20 border-b border-white/5 overflow-hidden">
                <div className="text-center mb-10">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                        Powered by Enterprise Web Stack
                    </span>
                </div>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
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

            {/* Web Dev FAQ */}
            <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 border-t border-white/10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-4">
                        <HelpCircle size={14} /> Web Development FAQs
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                        Custom Website Development Questions
                    </h2>
                    <p className="text-white/50 text-base md:text-lg">
                        Learn how our web development process delivers unmatched performance, speed, and organic search ranking.
                    </p>
                </div>

                <div className="space-y-4">
                    {webDevFaqs.map((faq, idx) => (
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

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
                    Ready to Build Your Custom Website?
                </h2>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-10 py-5 bg-[#ff541f] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-xl shadow-[#ff541f]/20"
                >
                    Get a Custom Website Proposal
                    <ArrowRight size={20} />
                </Link>
            </section>
        </div>
    );
}
