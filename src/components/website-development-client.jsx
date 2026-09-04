"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    Smartphone,
    Globe,
    Search,
    ShoppingCart,
    ArrowRight,
    Code,
    ExternalLink,
    ChevronDown,
    HelpCircle,
    Check,
    Minus,
    PhoneCall,
    PenTool,
    Rocket,
    LifeBuoy,
    Sparkles,
    MessageSquareText,
    RefreshCw,
    Gauge,
    FileJson,
    Bot,
} from "lucide-react";

import { webDevFaqs } from "@/lib/faqs";
import SearchVisibilityMockup from "@/components/illustrations/SearchVisibilityMockup";
import BeforeAfterVisual from "@/components/illustrations/BeforeAfterVisual";
import { DeviceShowcase } from "@/components/illustrations/DeviceMockups";
import { LocalSearchFunnel, ScoreRings, WebsiteCostChart, ZeroClickChart } from "@/components/illustrations/Charts";

const LAST_UPDATED = "September 2026";

const sources = {
    zeroClick: { label: "Search Engine Land / SparkToro, 2026", href: "https://searchengineland.com/google-zero-click-searches-2026-study-479717" },
    aio: { label: "Digital Applied, zero-click data 2026", href: "https://www.digitalapplied.com/blog/zero-click-search-statistics-2026-complete-data" },
    noSite: { label: "Network Solutions, small business website statistics 2026", href: "https://www.networksolutions.com/blog/small-business-website-statistics/" },
    credibility: { label: "Zippia, website statistics", href: "https://www.zippia.com/advice/website-statistics/" },
    research: { label: "Invoca, retail marketing statistics 2026", href: "https://www.invoca.com/blog/retail-marketing-statistics" },
    local: { label: "Shopify, local SEO statistics 2026", href: "https://www.shopify.com/blog/local-seo-statistics" },
    aiTraffic: { label: "The Stacc, AI search referral statistics 2026", href: "https://thestacc.com/blog/ai-search-referral-traffic-stats/" },
    geo: { label: "upGrowth, AI traffic share report 2026", href: "https://upgrowth.in/ai-traffic-share-report-2026/" },
    google: { label: "Google / SOASTA mobile speed benchmarks", href: "https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/" },
    cost: { label: "Elementor, small business website cost 2026", href: "https://elementor.com/blog/how-much-does-a-small-business-website-cost/" },
    clutch: { label: "Digital Applied, citing the Clutch 2026 survey", href: "https://www.digitalapplied.com/blog/website-development-cost-2026-complete-pricing-data" },
};

function Cite({ source }) {
    return (
        <a href={source.href} target="_blank" rel="noopener noreferrer nofollow" className="text-[#ff541f] underline decoration-[#ff541f]/30 hover:decoration-[#ff541f]">
            {source.label}
        </a>
    );
}

const eyebrow = "text-xs font-mono uppercase tracking-[0.2em] text-[#ff541f]";

/* ------------------------------------------------------------------ */
/* Portfolio                                                            */
/* ------------------------------------------------------------------ */
const ProjectCard = ({ title, category, description, image, link, delay, featured = false }) => {
    const hasLink = link && link !== "#";
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay, duration: 0.5 }}
            className={`group relative overflow-hidden rounded-3xl border border-zinc-900/10 bg-white ${featured ? "md:col-span-2" : ""}`}
        >
            <div className={`relative w-full overflow-hidden ${featured ? "h-72 md:h-96" : "h-60"}`}>
                <Image
                    src={image}
                    alt={`${title} website homepage, a ${category.toLowerCase()} built by Syenxa Tech`}
                    fill
                    sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                    className="object-cover object-top transform group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-white">
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">{category}</span>
                        <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">{title}</h3>
                    </div>
                    {hasLink && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open the live ${title} website`}
                            className="shrink-0 p-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-[#ff541f] hover:border-[#ff541f] transition-colors"
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>
            <div className="p-6">
                <p className="text-zinc-600 text-sm leading-relaxed">{description}</p>
            </div>
        </motion.article>
    );
};

const portfolioProjects = [
    { title: "Syenxa AI Platform", category: "AI SaaS UI", description: "A modern AI SaaS interface designed to showcase intelligent automation solutions, featuring a clean UI, scalable layout, and conversion-focused experience tailored for cutting-edge tech brands.", image: "/website-portfolio/Ai-Saas-UI.png", link: "https://syenxatech.vercel.app/", featured: true },
    { title: "Home Services", category: "Home Services Website", description: "A professional website for a home services client, built to highlight service offerings, streamline customer inquiries, and establish a trustworthy online presence.", image: "/website-portfolio/home-services1.png", link: "https://home-service-site.vercel.app/" },
    { title: "Pane Di Dio", category: "Bakery Website", description: "A warm and inviting website for an Italian bakery, crafted to showcase artisan breads and pastries with rich visuals and an appetizing layout.", image: "/website-portfolio/pane-di-dio.png", link: "https://pane-di-dio-website.vercel.app/" },
    { title: "AuraByNs", category: "Perfume Website", description: "A sleek and elegant website for a premium perfume brand, designed to showcase products with immersive visuals and a refined shopping experience.", image: "/website-portfolio/aurabyns.png", link: "https://aurabyns.netlify.app/" },
    { title: "Home Services Pro", category: "Home Services Website", description: "A conversion-focused website for a home services business, featuring service catalogs, booking flows and trust-building elements.", image: "/website-portfolio/home-services.png", link: "https://home-services-virid.vercel.app/" },
    { title: "Knitty Petit", category: "E-Commerce Website", description: "A charming online store for custom kids' sweaters, blending playful design with a seamless shopping experience from browsing to checkout.", image: "/website-portfolio/knittypetit.png", link: "https://www.knittypetit.shop/", featured: true },
    { title: "Syenxa AI Calorie Tracker", category: "AI Fitness App", description: "An AI-powered fitness app that tracks calories and nutrition by analyzing food photos, with personalized insights and intelligent tracking.", image: "/website-portfolio/ai-calorie-tracker.png", link: "https://syenxa-ai-calorie-app.vercel.app/" },
    { title: "Nature Tech", category: "Industrial & Energy Website", description: "A robust website for a timber and clean-energy specialist, presenting their wood-to-fuel pipeline and custom burner engineering.", image: "/website-portfolio/naturetech.png", link: "https://naturetech-website.vercel.app/" },
    { title: "Syenxa GYM", category: "Gym Website", description: "A modern and dynamic website for a fitness center, showcasing classes, trainers and membership plans with a responsive design.", image: "/website-portfolio/syenxa-gym.png", link: "https://syenxa-gym.vercel.app/" },
    { title: "Neon Craft", category: "Custom Products Website", description: "A bold website for a custom neon sign studio, designed to showcase vibrant creations and streamline custom orders.", image: "/website-portfolio/neon-craft.png", link: "https://website-codex-ivory.vercel.app/" },
    { title: "Aurora Beauty Salon", category: "Beauty & Wellness Website", description: "A vibrant, user-friendly website for a premium beauty salon, showcasing services, appointments and products.", image: "/website-portfolio/aurora-beauty.png", link: "https://aurora-beauty-lab.vercel.app/" },
];

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */
const comparison = [
    { feature: "Typical 2026 US price for a 5 to 8 page business site", diy: "$200 to $600 per year", freelancer: "$2,000 to $8,000", agency: "$8,000 to $15,000+", syenxa: "From $200" },
    { feature: "Custom design (no template)", diy: false, freelancer: "partial", agency: true, syenxa: true },
    { feature: "Server-rendered Next.js for Core Web Vitals", diy: false, freelancer: "partial", agency: "partial", syenxa: true },
    { feature: "Technical SEO and structured data included", diy: false, freelancer: "partial", agency: "partial", syenxa: true },
    { feature: "AEO and GEO (AI Overviews, ChatGPT citations)", diy: false, freelancer: false, agency: "partial", syenxa: true },
    { feature: "AI chatbot or calling agent integration", diy: false, freelancer: false, agency: "partial", syenxa: true },
    { feature: "Typical delivery time", diy: "Days (your time)", freelancer: "3 to 6 weeks", agency: "6 to 12 weeks", syenxa: "5 to 7 working days" },
    { feature: "You own the code and design", diy: false, freelancer: true, agency: true, syenxa: true },
];

function Mark({ value }) {
    if (value === true) return <Check className="w-5 h-5 text-emerald-600 mx-auto" aria-label="Yes" />;
    if (value === false) return <Minus className="w-5 h-5 text-zinc-300 mx-auto" aria-label="No" />;
    if (value === "partial") return <span className="text-xs font-semibold text-zinc-500">Varies</span>;
    return <span className="text-sm font-semibold text-zinc-800">{value}</span>;
}

const process = [
    { icon: PhoneCall, title: "Discovery call", desc: "A free 30-minute call to understand your business, competitors and the searches you need to win. You get a fixed quote and delivery date." },
    { icon: Search, title: "Keyword and answer map", desc: "We map every page to a primary search intent and list the questions AI assistants get asked about your service, so the structure is decided before design." },
    { icon: PenTool, title: "Design and content", desc: "Custom mobile-first layouts, brand typography and imagery, and copy written answer-first so it reads well to people and extracts cleanly for AI." },
    { icon: Code, title: "Build on Next.js", desc: "Server-rendered code with metadata, sitemap, JSON-LD schema, llms.txt and image optimization built in. You review on a live staging link." },
    { icon: Rocket, title: "Launch and index", desc: "Domain, hosting and analytics connected, redirects handled, Search Console and Bing Webmaster submitted on day one." },
    { icon: LifeBuoy, title: "Support", desc: "Post-launch fixes included. Optional care plans cover new pages, content refreshes and ongoing SEO." },
];

const visibilityLayers = [
    {
        key: "seo",
        icon: Search,
        name: "SEO",
        full: "Search Engine Optimization",
        where: "Google and Bing results",
        what: "Server-rendered pages, keyword-mapped structure, internal linking, schema markup, Core Web Vitals and local SEO signals so each service page can rank in its city and category.",
        proof: "Ranks for the searches your customers type.",
    },
    {
        key: "aeo",
        icon: MessageSquareText,
        name: "AEO",
        full: "Answer Engine Optimization",
        where: "Featured snippets, AI Overviews, voice search",
        what: "Answer-first paragraphs, FAQ blocks, comparison tables and FAQPage schema so search engines can lift a direct answer from your page and name your business as the source.",
        proof: "Becomes the answer, not just a link.",
    },
    {
        key: "geo",
        icon: Bot,
        name: "GEO",
        full: "Generative Engine Optimization",
        where: "ChatGPT, Perplexity, Gemini, Copilot",
        what: "AI crawlers allowed, consistent entity data (who, where, what it costs), cited statistics, llms.txt and a machine-readable pricing file so AI assistants can read and cite you with confidence.",
        proof: "Gets recommended when people ask an AI.",
    },
];

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function WebsiteDevelopmentClient() {
    const [openFaq, setOpenFaq] = useState(null);
    const reduce = useReducedMotion();
    const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
    const fadeUp = (delay = 0) => ({
        initial: reduce ? false : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    });

    return (
        <div className="min-h-screen bg-[#faf9f7] text-zinc-900 selection:bg-[#ff541f]/30 selection:text-[#ff541f]">
            <div
                aria-hidden
                className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ============================ Hero ============================ */}
            <section className="relative pt-36 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
                <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-[#ff541f]/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-6 items-center">
                    <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-6">
                        <span className="inline-block py-1 px-3 rounded-full border border-zinc-900/10 bg-white text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-6">
                            Website development + SEO, AEO &amp; GEO · USA
                        </span>
                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight text-zinc-900 mb-7 text-balance">
                            Websites that rank on Google{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff541f] to-[#ff8a5f]">and get cited by AI.</span>
                        </h1>
                        <p className="font-body text-lg md:text-xl text-zinc-600 max-w-[52ch] leading-relaxed mb-10">
                            Anyone can put up a website in a weekend. Most of them never
                            appear in a Google result or an AI answer, so they never bring a
                            customer. We build custom Next.js websites for US businesses
                            with search, answer and generative engine optimization built in
                            from the first line of code.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Link href="/contact" className="px-8 py-4 bg-[#ff541f] text-white font-bold rounded-full hover:bg-zinc-900 transition-all duration-300 shadow-lg shadow-[#ff541f]/20 active:scale-[0.98]">
                                Get a Free Website Quote
                            </Link>
                            <a href="#portfolio" className="flex items-center gap-2 px-8 py-4 bg-white border border-zinc-900/10 text-zinc-900 font-medium rounded-full hover:border-zinc-900/30 transition-all duration-300 group active:scale-[0.98]">
                                See Our Work
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                            {[["From $200", "starting price"], ["5 to 7 days", "to launch"], ["300+", "projects shipped"]].map(([v, l]) => (
                                <div key={l}>
                                    <dt className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 order-2">{l}</dt>
                                    <dd className="font-display text-xl font-bold text-zinc-900 tabular-nums">{v}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-6 text-[11px] font-mono uppercase tracking-widest text-zinc-400">Last updated {LAST_UPDATED}</p>
                    </motion.div>

                    <div className="lg:col-span-6">
                        <SearchVisibilityMockup />
                    </div>
                </div>
            </section>

            {/* ============================ Problem ============================ */}
            <section className="relative py-20 md:py-28 px-6 md:px-12 border-y border-zinc-900/5 bg-white/60">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
                        <motion.div {...fadeUp(0)} className="lg:col-span-7">
                            <p className={eyebrow}>The problem</p>
                            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
                                A website nobody finds is a business card in a drawer.
                            </h2>
                        </motion.div>
                        <motion.p {...fadeUp(0.1)} className="lg:col-span-5 text-lg text-zinc-600 leading-relaxed">
                            Search has changed. Most Google searches now end without a
                            click, AI Overviews answer questions directly, and buyers ask
                            ChatGPT for recommendations. A template site built for 2018
                            is invisible to all three.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <motion.figure {...fadeUp(0)} className="md:col-span-7 p-8 rounded-3xl bg-white border border-zinc-900/10">
                            <figcaption className="mb-5">
                                <p className={eyebrow}>Zero-click search</p>
                                <h3 className="mt-2 font-display text-2xl font-bold">Where US Google searches end in 2026</h3>
                            </figcaption>
                            <ZeroClickChart />
                            <p className="mt-4 text-xs text-zinc-500">Sources: <Cite source={sources.zeroClick} />; <Cite source={sources.aio} /></p>
                        </motion.figure>

                        <div className="md:col-span-5 grid grid-cols-1 gap-6">
                            {[
                                { value: "20%+", text: "of Google searches now show an AI Overview, and clicks drop by about 60% when one appears.", src: sources.aio },
                                { value: "27%", text: "of US small businesses still have no website at all, leaving the search results to competitors who do.", src: sources.noSite },
                                { value: "75%", text: "of people judge a company's credibility by its website design, and 88% will not return after a bad experience.", src: sources.credibility },
                            ].map((s, i) => (
                                <motion.div key={s.value} {...fadeUp(0.05 * (i + 1))} className="p-7 rounded-3xl bg-zinc-900 text-white relative overflow-hidden">
                                    <div aria-hidden className="absolute -top-16 -right-16 w-40 h-40 bg-[#ff541f]/30 rounded-full blur-[60px]" />
                                    <p className="relative font-display text-4xl font-bold text-[#ff8a5f] tabular-nums">{s.value}</p>
                                    <p className="relative mt-2 text-sm text-zinc-300 leading-relaxed">{s.text}</p>
                                    <p className="relative mt-3 text-[11px] text-zinc-500">Source: <a href={s.src.href} target="_blank" rel="noopener noreferrer nofollow" className="underline hover:text-white">{s.src.label}</a></p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16">
                        <motion.div {...fadeUp(0)} className="mb-8 max-w-2xl">
                            <p className={eyebrow}>Template site vs Syenxa build</p>
                            <h3 className="mt-2 font-display text-3xl font-bold">What the difference looks like under the hood</h3>
                        </motion.div>
                        <BeforeAfterVisual />
                    </div>
                </div>
            </section>

            {/* ============================ Why US businesses need one ============================ */}
            <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <motion.div {...fadeUp(0)} className="lg:col-span-5">
                        <p className={eyebrow}>Why it matters in the US</p>
                        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
                            Your customers check you online before they ever call.
                        </h2>
                        <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                            In the United States the website is the first visit. Shoppers
                            research online, compare reviews, check your site, and then walk
                            in or book. If the site is slow, thin or missing, that journey
                            ends with a competitor.
                        </p>
                        <ul className="mt-8 space-y-4">
                            {[
                                ["81%", "of US shoppers research online before buying", sources.research],
                                ["76%", "of people who search locally on mobile visit a business within a day", sources.local],
                                ["7.1M", "monthly “near me” searches in the US, 88% of them on mobile", sources.local],
                            ].map(([v, t, src]) => (
                                <li key={v} className="flex gap-4">
                                    <span className="font-display text-2xl font-bold text-[#ff541f] tabular-nums w-20 shrink-0">{v}</span>
                                    <span className="text-zinc-700 leading-snug">
                                        {t}
                                        <span className="block text-[11px] text-zinc-400 mt-0.5">Source: <Cite source={src} /></span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.figure {...fadeUp(0.1)} className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-white border border-zinc-900/10">
                        <figcaption className="mb-6">
                            <p className={eyebrow}>From search to sale</p>
                            <h3 className="mt-2 font-display text-2xl font-bold">How US consumers move from a search to a purchase</h3>
                        </figcaption>
                        <LocalSearchFunnel />
                        <p className="mt-4 text-xs text-zinc-500">Sources: <Cite source={sources.research} />; <Cite source={sources.local} /></p>
                    </motion.figure>
                </div>
            </section>

            {/* ============================ SEO / AEO / GEO ============================ */}
            <section id="seo-aeo-geo" className="py-20 md:py-28 px-6 md:px-12 border-y border-zinc-900/5 bg-white/60">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp(0)} className="max-w-3xl mb-14">
                        <p className={eyebrow}>Built into every website</p>
                        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
                            SEO, AEO and GEO: three ways to be found, one build.
                        </h2>
                        <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                            SEO gets you ranked in Google. AEO (Answer Engine Optimization)
                            gets your page quoted as the answer in featured snippets and AI
                            Overviews. GEO (Generative Engine Optimization) gets you cited
                            and recommended by ChatGPT, Perplexity, Gemini and Copilot. We
                            build all three into the structure of the site rather than
                            bolting them on later.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {visibilityLayers.map((layer, i) => (
                            <motion.article key={layer.key} {...fadeUp(0.08 * i)} className={`relative p-8 rounded-3xl border flex flex-col ${i === 2 ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-900/10"}`}>
                                {i === 2 && <div aria-hidden className="absolute -top-20 -right-20 w-56 h-56 bg-[#ff541f]/25 rounded-full blur-[80px] pointer-events-none" />}
                                <div className="relative flex items-center gap-4 mb-6">
                                    <span className={`flex items-center justify-center size-12 rounded-2xl ${i === 2 ? "bg-[#ff541f] text-white" : "bg-[#ff541f]/10 text-[#ff541f]"}`}>
                                        <layer.icon size={22} strokeWidth={1.8} />
                                    </span>
                                    <div>
                                        <h3 className="font-display text-3xl font-bold leading-none">{layer.name}</h3>
                                        <p className={`text-xs mt-1 ${i === 2 ? "text-zinc-400" : "text-zinc-500"}`}>{layer.full}</p>
                                    </div>
                                </div>
                                <p className={`relative text-[11px] font-mono uppercase tracking-widest ${i === 2 ? "text-[#ff8a5f]" : "text-[#ff541f]"}`}>Where you show up</p>
                                <p className={`relative mt-1 font-semibold ${i === 2 ? "text-white" : "text-zinc-900"}`}>{layer.where}</p>
                                <p className={`relative mt-5 text-sm leading-relaxed ${i === 2 ? "text-zinc-300" : "text-zinc-600"}`}>{layer.what}</p>
                                <p className={`relative mt-auto pt-6 text-sm font-semibold flex items-center gap-2 ${i === 2 ? "text-white" : "text-zinc-900"}`}>
                                    <Check size={16} className="text-emerald-500" /> {layer.proof}
                                </p>
                            </motion.article>
                        ))}
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { v: "200%+", t: "year-over-year growth in referral traffic from AI search platforms into 2026", src: sources.aiTraffic },
                            { v: "30 to 40%", t: "more AI referral traffic reported by brands investing in GEO versus SEO alone", src: sources.geo },
                            { v: "74.8%", t: "of AI referral traffic comes from ChatGPT, followed by Gemini and Perplexity", src: sources.geo },
                        ].map((s, i) => (
                            <motion.div key={s.v} {...fadeUp(0.05 * i)} className="flex gap-5 p-6 rounded-3xl bg-white border border-zinc-900/10">
                                <p className="font-display text-3xl font-bold text-[#ff541f] tabular-nums shrink-0">{s.v}</p>
                                <div>
                                    <p className="text-sm text-zinc-700 leading-snug">{s.t}</p>
                                    <p className="mt-1.5 text-[11px] text-zinc-400">Source: <Cite source={s.src} /></p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div {...fadeUp(0.1)} className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                        <span className="font-semibold text-zinc-900">Included on every build:</span>
                        {[
                            [FileJson, "JSON-LD schema"],
                            [Gauge, "Core Web Vitals tuning"],
                            [MessageSquareText, "FAQ and answer blocks"],
                            [Bot, "llms.txt and pricing.md"],
                            [Sparkles, "AI crawler access"],
                            [RefreshCw, "Sitemap and Search Console"],
                        ].map(([Icon, label]) => (
                            <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-zinc-900/10 px-3 py-1.5">
                                <Icon size={14} className="text-[#ff541f]" /> {label}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ============================ What we build ============================ */}
            <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 order-2 lg:order-1">
                        <DeviceShowcase
                            desktop={{ src: "/website-portfolio/home-services1.png", alt: "Home services company website on a laptop, built by Syenxa Tech" }}
                            mobile={{ src: "/website-portfolio/aurora-beauty.png", alt: "Aurora Beauty Salon website on a phone, built by Syenxa Tech" }}
                        />
                    </div>
                    <motion.div {...fadeUp(0)} className="lg:col-span-6 order-1 lg:order-2">
                        <p className={eyebrow}>Website development services</p>
                        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">What we build for US businesses</h2>
                        <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                            Strategy, custom design, copy structure, Next.js code, technical
                            SEO, hosting setup and launch. One team, one fixed quote.
                            Because we also build{" "}
                            <Link href="/ai-chatbots" className="font-semibold text-[#ff541f] hover:underline">AI chatbots</Link>{" "}
                            and{" "}
                            <Link href="/ai-calling-agents" className="font-semibold text-[#ff541f] hover:underline">AI calling agents</Link>
                            , every site can ship with lead capture and follow-up wired in.
                        </p>
                        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                [Globe, "Business websites", "Clinics, contractors, salons, agencies and professional services with a booking or quote path on every page."],
                                [ShoppingCart, "E-commerce stores", "Fast storefronts with secure checkout, product schema for Google Shopping and inventory sync."],
                                [RefreshCw, "Redesigns and migrations", "Keep your rankings and URLs, replace the slow template, set up redirects properly."],
                                [Smartphone, "Web apps and mobile apps", "Portals, dashboards and SaaS interfaces on Next.js, plus iOS and Android when native is needed."],
                            ].map(([Icon, t, d]) => (
                                <li key={t} className="p-5 rounded-2xl bg-white border border-zinc-900/10">
                                    <Icon size={20} className="text-[#ff541f] mb-3" />
                                    <h3 className="font-display font-bold text-zinc-900">{t}</h3>
                                    <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">{d}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* ============================ Portfolio ============================ */}
            <section id="portfolio" className="py-20 md:py-28 px-6 md:px-12 border-y border-zinc-900/5 bg-white/60">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <motion.div {...fadeUp(0)}>
                            <p className={eyebrow}>Portfolio</p>
                            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Recent website development work</h2>
                            <p className="mt-4 text-zinc-600 max-w-xl">
                                Custom Next.js websites and web apps for clients in the US and
                                worldwide. Every one is live; open it and test the speed on your
                                phone.
                            </p>
                        </motion.div>
                        <Link href="/contact" className="text-[#ff541f] hover:text-zinc-900 transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-widest">
                            Start Yours <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {portfolioProjects.map((project, index) => (
                            <ProjectCard key={project.title} {...project} delay={0.04 * (index % 3)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================ Speed / Next.js ============================ */}
            <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <motion.div {...fadeUp(0)} className="lg:col-span-5">
                        <p className={eyebrow}>Performance</p>
                        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">Why we build on Next.js</h2>
                        <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                            Speed and crawlability are ranking factors and conversion
                            factors. Google found that 53% of mobile visits are abandoned
                            when a page takes longer than three seconds to load (
                            <Cite source={sources.google} />). Server rendering, image
                            optimization and code splitting keep our sites well under that
                            line, and put your content in the HTML on the first request so
                            search engines and AI crawlers read it immediately.
                        </p>
                        <div className="mt-8 rounded-3xl bg-white border border-zinc-900/10 p-6">
                            <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Target Lighthouse scores, every build</p>
                            <ScoreRings />
                        </div>
                    </motion.div>
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            ["Content Google can read immediately", "Titles, headings, copy and structured data are rendered on the server, so nothing waits on JavaScript to be indexed."],
                            ["Images that do not slow the page", "Automatic AVIF and WebP conversion, responsive sizes and lazy loading for everything below the fold."],
                            ["No plugin upkeep or security patches", "A small modern codebase on a global edge network. Fewer moving parts, fewer outages, lower maintenance."],
                            ["Built to extend", "Add a booking system, chatbot, calling agent, blog or customer portal later without rebuilding."],
                        ].map(([t, d], i) => (
                            <motion.div key={t} {...fadeUp(0.06 * i)} className="p-6 rounded-3xl bg-white border border-zinc-900/10">
                                <h3 className="font-display font-bold text-lg text-zinc-900">{t}</h3>
                                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================ Process ============================ */}
            <section className="py-20 md:py-28 px-6 md:px-12 border-y border-zinc-900/5 bg-white/60">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp(0)} className="mb-12 max-w-2xl">
                        <p className={eyebrow}>Process</p>
                        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">From first call to indexed in Google</h2>
                        <p className="mt-4 text-lg text-zinc-600">Six steps, each with a clear deliverable. Standard business websites go live in 5 to 7 working days.</p>
                    </motion.div>
                    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {process.map((step, i) => (
                            <motion.li key={step.title} {...fadeUp(0.05 * i)} className="p-7 rounded-3xl bg-white border border-zinc-900/10 flex gap-5">
                                <span className="font-display text-4xl font-bold text-zinc-200 leading-none tabular-nums">0{i + 1}</span>
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-[#ff541f]"><step.icon size={18} /><h3 className="font-display text-lg font-bold text-zinc-900">{step.title}</h3></div>
                                    <p className="text-sm text-zinc-600 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ============================ Pricing ============================ */}
            <section id="pricing" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div {...fadeUp(0)} className="mb-10 max-w-3xl">
                    <p className={eyebrow}>Pricing</p>
                    <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Website development cost in the USA</h2>
                    <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                        A professional small business website in the US typically costs
                        $2,000 to $8,000 in 2026, with boutique agencies charging $8,000
                        to $15,000 or more (<Cite source={sources.cost} />). The Clutch
                        2026 survey found 61% of small business buyers spent under $10,000
                        on their last site (<Cite source={sources.clutch} />). Syenxa Tech
                        standard business websites start at $200 USD because we work from
                        a proven Next.js foundation and a fixed process. Stores, web apps
                        and multi-language sites are quoted after a free discovery call.
                    </p>
                </motion.div>
                <motion.figure {...fadeUp(0.05)} className="mb-8 p-8 rounded-3xl bg-white border border-zinc-900/10">
                    <figcaption className="mb-4">
                        <p className={eyebrow}>2026 US price ranges</p>
                        <h3 className="mt-2 font-display text-xl font-bold">Small business website cost by build type</h3>
                    </figcaption>
                    <WebsiteCostChart />
                </motion.figure>
                <div className="overflow-x-auto rounded-3xl border border-zinc-900/10 bg-white">
                    <table className="w-full min-w-[760px] text-left">
                        <thead>
                            <tr className="border-b border-zinc-900/10 text-xs font-mono uppercase tracking-widest text-zinc-500">
                                <th scope="col" className="p-5">Option</th>
                                <th scope="col" className="p-5 text-center">DIY builder</th>
                                <th scope="col" className="p-5 text-center">Freelancer</th>
                                <th scope="col" className="p-5 text-center">Traditional agency</th>
                                <th scope="col" className="p-5 text-center text-[#ff541f]">Syenxa Tech</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparison.map((row) => (
                                <tr key={row.feature} className="border-b border-zinc-900/5 last:border-0">
                                    <th scope="row" className="p-5 font-medium text-zinc-800">{row.feature}</th>
                                    <td className="p-5 text-center"><Mark value={row.diy} /></td>
                                    <td className="p-5 text-center"><Mark value={row.freelancer} /></td>
                                    <td className="p-5 text-center"><Mark value={row.agency} /></td>
                                    <td className="p-5 text-center"><Mark value={row.syenxa} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                    Hosting and domain fees are paid to the provider separately for every option. Market ranges are 2026 US averages from the sources linked above.
                </p>
            </section>

            {/* ============================ FAQ ============================ */}
            <section className="py-20 md:py-28 px-6 md:px-12 border-t border-zinc-900/5 bg-white/60">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <motion.div {...fadeUp(0)} className="lg:col-span-4">
                        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-zinc-900/10 bg-white text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-4">
                            <HelpCircle size={14} /> FAQ
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Website development questions, answered</h2>
                        <p className="text-zinc-600">Cost, timelines, hosting, redesigns, and what SEO, AEO and GEO actually mean for your site.</p>
                        <p className="mt-6 text-sm text-zinc-600">
                            Planning a budget? Read our guide to{" "}
                            <Link href="/blog/small-business-website-cost-usa-2026" className="font-semibold text-[#ff541f] hover:underline">
                                small business website costs in the USA for 2026
                            </Link>.
                        </p>
                    </motion.div>
                    <div className="lg:col-span-8 space-y-3">
                        {webDevFaqs.map((faq, idx) => (
                            <div key={idx} className="rounded-2xl border border-zinc-900/10 bg-white overflow-hidden transition-colors hover:border-zinc-900/20">
                                <h3>
                                    <button onClick={() => toggleFaq(idx)} aria-expanded={openFaq === idx} className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff541f]/40 rounded-2xl">
                                        <span className="font-display font-semibold text-lg text-zinc-900">{faq.question}</span>
                                        <ChevronDown size={20} className={`text-[#ff541f] shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                                    </button>
                                </h3>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6 pb-6 text-zinc-700 leading-relaxed font-body">
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================ CTA ============================ */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-zinc-900 text-white p-10 md:p-16 relative overflow-hidden text-center">
                    <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 bg-[#ff541f]/30 rounded-full blur-[120px] pointer-events-none" />
                    <p className={`${eyebrow} relative text-[#ff8a5f]`}>Free quote</p>
                    <h2 className="relative mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">Ready for a website that actually gets found?</h2>
                    <p className="relative mt-5 text-lg text-zinc-300 max-w-2xl mx-auto">
                        Tell us about your business and we will send a fixed quote, a
                        delivery date, and a short audit of how your current site shows
                        up in Google and AI answers.
                    </p>
                    <Link href="/contact" className="relative mt-8 inline-flex items-center gap-2 px-10 py-5 bg-[#ff541f] text-white font-bold rounded-full hover:bg-white hover:text-zinc-900 transition-all duration-300 shadow-xl shadow-[#ff541f]/20 active:scale-[0.98]">
                        Get a Custom Website Proposal
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
