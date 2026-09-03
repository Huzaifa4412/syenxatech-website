"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    Link2,
    Share2,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Contact from "./form";
import { formatPostDate } from "@/lib/reading-time";

const ease = [0.16, 1, 0.3, 1];
const label =
    "font-geometric text-xs font-semibold uppercase tracking-[0.18em]";

/* ------------------------------------------------------------------ */
/* Reading progress, pinned under the top edge                          */
/* ------------------------------------------------------------------ */
function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-[#ff541f]"
        />
    );
}

/* ------------------------------------------------------------------ */
/* Share                                                                */
/* ------------------------------------------------------------------ */
function ShareBar({ url, title }) {
    const [copied, setCopied] = useState(false);
    if (!url) return null;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title || "");
    const targets = [
        { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
        { name: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
        { name: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    ];

    async function copy() {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard unavailable: the URL is still in the address bar */
        }
    }

    const pill =
        "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-zinc-900/10 bg-white text-xs font-semibold text-zinc-700 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-300";

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-zinc-500">
                <Share2 className="w-4 h-4" strokeWidth={1.8} />
                <span className={label}>Share</span>
            </span>
            {targets.map((t) => (
                <a key={t.name} href={t.href} target="_blank" rel="noopener noreferrer" className={pill}>
                    {t.name}
                </a>
            ))}
            <button type="button" onClick={copy} className={pill} aria-live="polite">
                {copied ? <Check className="w-3.5 h-3.5" strokeWidth={2.2} /> : <Link2 className="w-3.5 h-3.5" strokeWidth={2} />}
                {copied ? "Copied" : "Copy link"}
            </button>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Table of contents with active section tracking                       */
/* ------------------------------------------------------------------ */
function TableOfContents({ headings }) {
    const [active, setActive] = useState(headings[0]?.id);

    useEffect(() => {
        if (!headings.length || typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
        );
        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [headings]);

    if (!headings.length) return null;

    return (
        <nav aria-label="On this page">
            <p className={`${label} text-zinc-500`}>On this page</p>
            <ol className="mt-4 border-l border-zinc-900/10">
                {headings.map((h) => {
                    const isActive = h.id === active;
                    return (
                        <li key={h.id}>
                            <a
                                href={`#${h.id}`}
                                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors duration-300 ${
                                    isActive
                                        ? "border-[#ff541f] text-zinc-900 font-semibold"
                                        : "border-transparent text-zinc-500 hover:text-zinc-900"
                                }`}
                            >
                                {h.text}
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

/* ------------------------------------------------------------------ */
/* Author                                                               */
/* ------------------------------------------------------------------ */
function Avatar({ author, size = 44 }) {
    if (author?.imageUrl) {
        return (
            <Image
                src={author.imageUrl}
                alt={author.imageAlt || author.name || ""}
                width={size}
                height={size}
                className="rounded-full object-cover shrink-0"
            />
        );
    }
    const initials = (author?.name || "S T")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    return (
        <span
            style={{ width: size, height: size }}
            className="flex shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white font-display text-sm font-bold"
        >
            {initials}
        </span>
    );
}

function AuthorCard({ author }) {
    if (!author?.name) return null;
    return (
        <div className="rounded-3xl bg-white border border-zinc-900/10 p-6">
            <p className={`${label} text-zinc-500`}>Written by</p>
            <div className="mt-4 flex items-center gap-3">
                <Avatar author={author} size={48} />
                <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 leading-tight">{author.name}</p>
                    {author.role && <p className="text-sm text-zinc-500 leading-tight mt-0.5">{author.role}</p>}
                </div>
            </div>
            {author.bio && <p className="mt-4 text-sm text-zinc-600 leading-relaxed">{author.bio}</p>}
            {author.linkedin && (
                <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-[#ff541f] transition-colors"
                >
                    LinkedIn
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
                </a>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Key takeaways, FAQ, related                                          */
/* ------------------------------------------------------------------ */
function KeyTakeaways({ items }) {
    if (!items?.length) return null;
    return (
        <aside className="not-prose mb-12 rounded-3xl border border-[#ff541f]/20 bg-[#ff541f]/[0.06] p-7 md:p-8">
            <p className={`${label} text-[#ff541f]`}>Key takeaways</p>
            <ul className="mt-5 space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-zinc-800 leading-relaxed">
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#ff541f] text-white">
                            <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

function FaqSection({ items }) {
    if (!items?.length) return null;
    return (
        <section className="not-prose mt-16 pt-12 border-t border-zinc-900/10">
            <p className={`${label} text-[#ff541f]`}>FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tighter text-zinc-900">
                Common questions
            </h2>
            <Accordion type="single" collapsible className="mt-6">
                {items.map((item, i) => (
                    <AccordionItem key={item._key || i} value={`faq-${i}`} className="border-zinc-900/10">
                        <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-zinc-900 hover:text-[#ff541f] hover:no-underline py-5">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-zinc-600 leading-relaxed pb-5">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}

function RelatedPosts({ posts }) {
    if (!posts?.length) return null;
    return (
        <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
            <div className="flex items-end justify-between gap-6 mb-8">
                <div>
                    <p className={`${label} text-[#ff541f]`}>Keep reading</p>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900">
                        Related articles
                    </h2>
                </div>
                <Link
                    href="/blog"
                    className="group hidden md:inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-[#ff541f] transition-colors"
                >
                    All articles
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {posts.map((post) => {
                    const date = formatPostDate(post.publishedAt);
                    return (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white border border-zinc-900/10 hover:border-zinc-900/25 transition-colors duration-300"
                            >
                                <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                                    <Image
                                        src={post.coverImage?.src || "/blog/fallback-cover.jpg"}
                                        alt={post.coverImage?.alt || ""}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />
                                    {post.category && (
                                        <span className="absolute left-4 top-4 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-zinc-800">
                                            {post.category}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <p className={`${label} text-zinc-500 font-medium`}>
                                        {date || "Guide"}
                                        {post.readingTime && <span> · {post.readingTime} min</span>}
                                    </p>
                                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight leading-snug text-zinc-900 group-hover:text-[#ff541f] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed line-clamp-2">
                                        {post.description}
                                    </p>
                                    <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                                        Read
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                                    </span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
const SEOContentPage = ({
    title,
    subtitle,
    content,
    keywords,
    category,
    author,
    date,
    dateTime,
    readingTime,
    coverImage,
    heroMedia,
    headings = [],
    keyTakeaways,
    faq,
    related,
    shareUrl,
    backHref = "/blog",
    backLabel = "All articles",
}) => {
    const reduce = useReducedMotion();
    const fadeUp = (delay = 0) => ({
        initial: reduce ? false : { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease },
    });

    const hasMeta = Boolean(date || readingTime);
    const hasHero = Boolean(heroMedia || coverImage?.src);

    return (
        <main className="relative bg-[#faf9f7] text-zinc-900 overflow-hidden">
            <ReadingProgress />
            <div className="absolute -top-40 right-[-12%] w-[520px] h-[520px] bg-[#ff541f]/[0.06] rounded-full blur-[130px] pointer-events-none" />

            {/* Header */}
            <header className="relative max-w-7xl mx-auto px-6 pt-32 md:pt-40">
                <motion.div {...fadeUp(0)}>
                    <Link
                        href={backHref}
                        className={`group inline-flex items-center gap-2 ${label} text-zinc-500 hover:text-zinc-900 transition-colors`}
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" strokeWidth={1.8} />
                        {backLabel}
                    </Link>
                </motion.div>

                <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
                    <div className="lg:col-span-9 max-w-4xl">
                        <motion.p {...fadeUp(0.06)} className={`${label} text-[#ff541f]`}>
                            {category || "Blog"}
                            {hasMeta && (
                                <span className="text-zinc-500 font-medium">
                                    {date && (
                                        <>
                                            <span aria-hidden="true" className="mx-2 text-zinc-300">·</span>
                                            <time dateTime={dateTime}>{date}</time>
                                        </>
                                    )}
                                    {readingTime && (
                                        <>
                                            <span aria-hidden="true" className="mx-2 text-zinc-300">·</span>
                                            {readingTime} min read
                                        </>
                                    )}
                                </span>
                            )}
                        </motion.p>
                        <motion.h1
                            {...fadeUp(0.12)}
                            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tighter leading-[1.02] text-balance"
                        >
                            {title}
                        </motion.h1>
                        {subtitle && (
                            <motion.p
                                {...fadeUp(0.18)}
                                className="mt-6 text-lg md:text-2xl text-zinc-600 leading-relaxed font-light max-w-[46ch]"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </div>

                    <motion.div {...fadeUp(0.22)} className="lg:col-span-3 flex lg:justify-end">
                        {author?.name && (
                            <div className="flex items-center gap-3">
                                <Avatar author={author} />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 leading-tight">{author.name}</p>
                                    {author.role && <p className="text-xs text-zinc-500 mt-0.5">{author.role}</p>}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {hasHero && (
                    <motion.div {...fadeUp(0.28)} className="mt-12 md:mt-16">
                        {heroMedia ? (
                            heroMedia
                        ) : (
                            <figure className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl border border-zinc-900/10 bg-zinc-900 shadow-xl shadow-zinc-900/[0.06]">
                                <Image
                                    src={coverImage.src}
                                    alt={coverImage.alt || ""}
                                    fill
                                    priority
                                    sizes="(max-width: 1280px) 100vw, 1280px"
                                    className="object-cover"
                                />
                            </figure>
                        )}
                    </motion.div>
                )}
            </header>

            {/* Body */}
            <section className={`relative max-w-7xl mx-auto px-6 pb-20 md:pb-28 ${hasHero ? "mt-14 md:mt-20" : "mt-12 md:mt-16 pt-12 border-t border-zinc-900/10"}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    <aside className="lg:col-span-3 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-28 flex flex-col gap-10">
                            <TableOfContents headings={headings} />
                            {keywords?.length > 0 && (
                                <div>
                                    <p className={`${label} text-zinc-500`}>Topics</p>
                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {keywords.map((kw) => (
                                            <li key={kw} className="px-3 py-1.5 rounded-full bg-white border border-zinc-900/10 text-xs font-medium text-zinc-700">
                                                {kw}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <AuthorCard author={author} />
                            <div className="rounded-3xl bg-zinc-900 text-white p-6 relative overflow-hidden">
                                <div className="absolute -top-16 -right-12 w-40 h-40 rounded-full bg-[#ff541f]/30 blur-[60px] pointer-events-none" />
                                <p className={`relative ${label} text-[#ff541f]`}>Put this to work</p>
                                <p className="relative mt-3 text-sm text-zinc-300 leading-relaxed">
                                    We build and run the AI agents, chatbots and websites described here. Tell us what you need handled.
                                </p>
                                <Link
                                    href="/contact"
                                    className="group relative mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff541f] text-sm font-bold text-white hover:bg-white hover:text-zinc-900 transition-colors duration-300"
                                >
                                    Talk to us
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
                                </Link>
                            </div>
                        </div>
                    </aside>

                    <div className="lg:col-span-8 lg:col-start-5 order-1 lg:order-2 min-w-0">
                        <motion.div {...fadeUp(0.32)}>
                            <KeyTakeaways items={keyTakeaways} />
                            <article className="article-body">{content}</article>
                            <FaqSection items={faq} />
                            <div className="mt-14 pt-8 border-t border-zinc-900/10 flex flex-wrap items-center justify-between gap-6">
                                <ShareBar url={shareUrl} title={title} />
                                <Link
                                    href={backHref}
                                    className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-[#ff541f] transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
                                    {backLabel}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <RelatedPosts posts={related} />

            <Contact />
        </main>
    );
};

export default SEOContentPage;
