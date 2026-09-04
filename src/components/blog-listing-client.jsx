"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
} from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { formatPostDate } from "@/lib/reading-time";

const ease = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ */
/* Signature: a voice waveform. Syenxa builds agents that talk, so the  */
/* page "speaks" under the headline. Bar heights are deterministic so   */
/* server and client render the same markup.                            */
/* ------------------------------------------------------------------ */
const BAR_COUNT = 96;
const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
    const a = Math.sin(i * 0.55) * 0.5 + 0.5;
    const b = Math.sin(i * 1.9 + 1.3) * 0.5 + 0.5;
    const c = Math.sin(i * 0.17) * 0.5 + 0.5;
    const height = 14 + Math.round((a * 0.5 + b * 0.3 + c * 0.2) * 86);
    const duration = (2.2 + ((i * 7) % 9) * 0.12).toFixed(2);
    const delay = (((i * 13) % 17) * 0.09).toFixed(2);
    return { height, duration, delay };
});

function Waveform({ reduce }) {
    return (
        <div
            aria-hidden="true"
            className="relative h-20 md:h-28 flex items-end gap-[3px] md:gap-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
            {bars.map((bar, i) => (
                <span
                    key={i}
                    className={`flex-1 rounded-full bg-gradient-to-t from-[#ff541f] via-[#ff541f]/70 to-[#ff541f]/15 ${
                        reduce ? "" : "blog-wave-bar"
                    }`}
                    style={{
                        height: `${bar.height}%`,
                        "--wave-duration": `${bar.duration}s`,
                        "--wave-delay": `${bar.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* Scrolling ticker of every topic covered on the blog */
function TopicTicker({ topics }) {
    if (!topics.length) return null;
    const items = [...topics, ...topics];
    return (
        <div className="relative overflow-hidden border-y border-zinc-900/10 py-3.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul className="blog-marquee flex w-max items-center whitespace-nowrap">
                {items.map((topic, i) => (
                    <li
                        key={`${topic}-${i}`}
                        className="flex items-center font-geometric text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700"
                    >
                        <span aria-hidden="true" className="mx-6 size-1.5 rounded-full bg-[#ff541f]" />
                        {topic}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* Small caps meta line: "Sep 3, 2026 · 4 min" */
function Meta({ post, className = "", tone = "light" }) {
    const date = formatPostDate(post.publishedAt);
    const color = tone === "dark" ? "text-white/70" : "text-zinc-500";
    const dot = tone === "dark" ? "text-white/30" : "text-zinc-300";
    return (
        <p
            className={`font-geometric text-xs font-medium uppercase tracking-[0.18em] ${color} ${className}`}
        >
            {date ? (
                <time dateTime={post.publishedAt}>{date}</time>
            ) : (
                <span>Guide</span>
            )}
            {post.readingTime && (
                <>
                    <span aria-hidden="true" className={`mx-2 ${dot}`}>
                        ·
                    </span>
                    <span>{post.readingTime} min</span>
                </>
            )}
        </p>
    );
}

/* Five tiny bars that "speak" when the card is hovered */
function MiniWave({ className = "" }) {
    const heights = [40, 75, 100, 60, 35];
    return (
        <span
            aria-hidden="true"
            className={`flex h-4 items-end gap-[2px] ${className}`}
        >
            {heights.map((h, i) => (
                <span
                    key={i}
                    className="w-[3px] rounded-full bg-current origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100 scale-y-[0.45]"
                    style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
                />
            ))}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* Featured post                                                        */
/* ------------------------------------------------------------------ */
function FeaturedCover({ post }) {
    if (post.coverImage?.src) {
        return (
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
                <Image
                    src={post.coverImage.src}
                    alt={post.coverImage.alt || ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    priority
                />
            </div>
        );
    }

    const date = post.publishedAt ? new Date(post.publishedAt) : null;
    const day = date ? String(date.getDate()).padStart(2, "0") : null;
    const month = date ? date.toLocaleDateString("en-US", { month: "short" }) : null;
    const year = date ? date.getFullYear() : null;

    return (
        <div className="relative h-full min-h-[300px] lg:min-h-0 overflow-hidden bg-zinc-900">
            <Image
                src="/blog/fallback-cover.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8 lg:p-10 text-white">
                <div className="font-display leading-none tracking-tighter">
                    {day ? (
                        <>
                            <span className="block text-7xl lg:text-8xl font-bold tabular-nums">
                                {day}
                            </span>
                            <span className="mt-2 block text-lg font-medium text-white/80">
                                {month} {year}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="block text-4xl lg:text-5xl font-bold">Guide</span>
                            <span className="mt-2 block text-sm font-medium text-white/70">
                                From the Syenxa Tech team
                            </span>
                        </>
                    )}
                </div>
                {post.keywords?.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                        {post.keywords.slice(0, 3).map((kw) => (
                            <li
                                key={kw}
                                className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-xs font-medium text-white"
                            >
                                {kw}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function FeaturedPost({ post, reduce }) {
    return (
        <motion.article
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
        >
            <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-zinc-900/10 shadow-xl shadow-zinc-900/[0.04] overflow-hidden hover:border-zinc-900/20 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff541f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#faf9f7]"
            >
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <FeaturedCover post={post} />
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col p-8 md:p-10 lg:p-12">
                    <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white text-[11px] font-semibold uppercase tracking-[0.16em]">
                            <span className="relative flex size-1.5">
                                <span className="absolute inline-flex size-full rounded-full bg-[#ff541f] opacity-75 motion-safe:animate-ping" />
                                <span className="relative inline-flex size-1.5 rounded-full bg-[#ff541f]" />
                            </span>
                            Latest
                        </span>
                        <MiniWave className="text-[#ff541f]" />
                    </div>
                    <Meta post={post} className="mt-8" />
                    <h2 className="mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-zinc-900 tracking-tighter leading-[1.05] text-balance group-hover:text-[#ff541f] transition-colors duration-300">
                        {post.title}
                    </h2>
                    <p className="mt-5 text-base md:text-lg text-zinc-600 leading-relaxed font-light max-w-[52ch] line-clamp-3">
                        {post.description}
                    </p>
                    <span className="mt-8 lg:mt-auto lg:pt-10 inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full bg-[#ff541f] text-white text-sm font-bold group-hover:bg-zinc-900 transition-colors duration-300">
                        Read article
                        <ArrowRight
                            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                            strokeWidth={2}
                        />
                    </span>
                </div>
            </Link>
        </motion.article>
    );
}

/* ------------------------------------------------------------------ */
/* Bento cards with a cursor spotlight                                  */
/* ------------------------------------------------------------------ */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

function PostCard({ post, index, reduce, wide = false }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const tinted = index % 4 === 1;
    const dark = index % 4 === 2;

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const surface = dark
        ? "bg-zinc-900 border-zinc-900 text-white"
        : tinted
          ? "bg-[#ff541f]/[0.06] border-[#ff541f]/15 text-zinc-900"
          : "bg-white border-zinc-900/10 text-zinc-900";
    const body = dark ? "text-zinc-400" : "text-zinc-600";
    const chip = dark
        ? "bg-white/10 text-zinc-200"
        : tinted
          ? "bg-white/80 text-zinc-700"
          : "bg-zinc-900/5 text-zinc-600";
    const arrow = dark
        ? "border-white/15 text-white/70 group-hover:bg-[#ff541f] group-hover:border-[#ff541f] group-hover:text-white"
        : "border-zinc-900/10 text-zinc-500 group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:text-white";
    const spotlight = dark ? "rgba(255, 84, 31, 0.22)" : "rgba(255, 84, 31, 0.10)";

    return (
        <motion.li
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 + Math.min(index * 0.08, 0.5), ease }}
            className={`${wide ? "lg:col-span-12" : spans[index % spans.length]} min-w-0`}
        >
            <Link
                href={`/blog/${post.slug}`}
                onMouseMove={handleMouseMove}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 md:p-9 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff541f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#faf9f7] ${surface} ${
                    wide
                        ? "lg:grid lg:grid-cols-12 lg:gap-10 lg:p-12"
                        : "min-h-[300px]"
                }`}
            >
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`radial-gradient(${wide ? 720 : 520}px circle at ${mouseX}px ${mouseY}px, ${spotlight}, transparent 75%)`,
                    }}
                />

                <div className={wide ? "relative lg:col-span-6 flex flex-col" : "contents"}>
                    <div className="relative flex items-start justify-between gap-4">
                        <Meta post={post} tone={dark ? "dark" : "light"} />
                        <MiniWave className="text-[#ff541f]" />
                    </div>

                    <h3
                        className={`relative mt-6 font-bold tracking-tight leading-[1.1] text-balance group-hover:text-[#ff541f] transition-colors duration-300 ${
                            wide
                                ? "text-3xl md:text-4xl lg:text-[2.5rem] max-w-[18ch]"
                                : "text-2xl md:text-[1.75rem]"
                        }`}
                    >
                        {post.title}
                    </h3>
                </div>

                <p
                    className={`relative leading-relaxed line-clamp-3 ${body} ${
                        wide
                            ? "mt-6 lg:mt-0 lg:col-span-6 lg:self-center text-base md:text-lg max-w-[48ch]"
                            : "mt-4 max-w-[56ch]"
                    }`}
                >
                    {post.description}
                </p>

                <div
                    className={`relative mt-auto pt-8 flex items-end justify-between gap-4 ${
                        wide ? "lg:col-span-12 lg:pt-10" : ""
                    }`}
                >
                    {post.keywords?.length > 0 ? (
                        <ul className="flex flex-wrap gap-2">
                            {post.keywords.slice(0, 2).map((kw) => (
                                <li
                                    key={kw}
                                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${chip}`}
                                >
                                    {kw}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span />
                    )}
                    <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${arrow}`}
                    >
                        <ArrowUpRight
                            className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                            strokeWidth={1.8}
                        />
                    </span>
                </div>
            </Link>
        </motion.li>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function BlogListingClient({ posts = [] }) {
    const reduce = useReducedMotion();
    const [featured, ...rest] = posts;
    const topics = Array.from(
        new Set(posts.flatMap((post) => post.keywords || []))
    );

    const fadeUp = (delay = 0) => ({
        initial: reduce ? false : { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease },
    });

    return (
        <main className="relative bg-[#faf9f7] text-zinc-900 overflow-hidden">
            <div className="absolute -top-40 right-[-12%] w-[560px] h-[560px] bg-[#ff541f]/[0.07] rounded-full blur-[130px] pointer-events-none" />

            {/* Hero */}
            <section className="relative max-w-7xl mx-auto px-6 pt-32 md:pt-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
                    <div className="lg:col-span-8">
                        <motion.p
                            {...fadeUp(0)}
                            className="inline-flex items-center gap-3 font-geometric text-xs font-semibold uppercase tracking-[0.2em] text-[#ff541f]"
                        >
                            <span className="h-px w-8 bg-[#ff541f]" />
                            Blog
                        </motion.p>
                        <motion.h1
                            {...fadeUp(0.08)}
                            className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tighter leading-[0.98] max-w-[16ch] text-balance"
                        >
                            AI calling agents, chatbots and automation,{" "}
                            <span className="text-[#ff541f]">explained</span>.
                        </motion.h1>
                    </div>
                    <motion.div {...fadeUp(0.16)} className="lg:col-span-4 lg:pb-3">
                        <p className="text-lg text-zinc-600 leading-relaxed font-light max-w-[36ch]">
                            Practical writing from the team that builds calling
                            agents, chatbots and websites for real businesses.
                            No hype, just what works.
                        </p>
                        <p className="mt-5 font-geometric text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 tabular-nums">
                            {posts.length} {posts.length === 1 ? "article" : "articles"}
                            {topics.length > 0 && (
                                <>
                                    <span aria-hidden="true" className="mx-2 text-zinc-300">
                                        ·
                                    </span>
                                    {topics.length} topics
                                </>
                            )}
                        </p>
                    </motion.div>
                </div>

                {/* Signature: the page speaks */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, scaleY: 0.4 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.25, ease }}
                    className="mt-14 md:mt-20 origin-bottom"
                >
                    <Waveform reduce={reduce} />
                </motion.div>
            </section>

            {/* Topic ticker */}
            <motion.div {...fadeUp(0.35)} className="mt-2">
                <TopicTicker topics={topics} />
            </motion.div>

            {/* Featured + bento */}
            <section className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 md:pb-28">
                {posts.length === 0 ? (
                    <div className="rounded-3xl bg-white border border-zinc-900/10 p-10 md:p-16 text-center">
                        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                            The first article is on its way
                        </h2>
                        <p className="mt-3 text-zinc-600 max-w-[46ch] mx-auto">
                            We are writing up what we learned building AI agents
                            for our clients. In the meantime, see what we build.
                        </p>
                        <Link
                            href="/services"
                            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-[#ff541f] transition-colors duration-300"
                        >
                            Explore services
                            <ArrowRight className="w-4 h-4" strokeWidth={2} />
                        </Link>
                    </div>
                ) : (
                    <>
                        <FeaturedPost post={featured} reduce={reduce} />

                        {rest.length > 0 && (
                            <div className="mt-20 md:mt-28">
                                <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
                                    <div>
                                        <p className="font-geometric text-xs font-semibold uppercase tracking-[0.2em] text-[#ff541f]">
                                            Archive
                                        </p>
                                        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter">
                                            All articles
                                        </h2>
                                    </div>
                                    <span className="font-geometric text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 tabular-nums pb-2">
                                        {String(rest.length).padStart(2, "0")} more
                                    </span>
                                </div>
                                <ul className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
                                    {rest.map((post, index) => (
                                        <PostCard
                                            key={post.slug}
                                            post={post}
                                            index={index}
                                            reduce={reduce}
                                            wide={
                                                rest.length % 2 === 1 &&
                                                index === rest.length - 1
                                            }
                                        />
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6, ease }}
                    className="relative overflow-hidden rounded-3xl bg-zinc-900 text-white px-8 py-12 md:px-14 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                    <div className="absolute -top-32 -right-24 w-[420px] h-[420px] bg-[#ff541f]/25 rounded-full blur-[110px] pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-16 opacity-30 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                        <Waveform reduce={reduce} />
                    </div>
                    <div className="relative lg:col-span-8">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight text-balance max-w-[22ch]">
                            Want any of this working in your business?
                        </h2>
                        <p className="mt-4 text-zinc-400 text-lg font-light max-w-[48ch]">
                            Tell us what you handle by hand today. We will show
                            you what an agent could take over.
                        </p>
                    </div>
                    <div className="relative lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                        <Link
                            href="/contact"
                            className="px-7 py-3.5 rounded-full bg-[#ff541f] text-white text-sm font-bold hover:bg-white hover:text-zinc-900 active:scale-[0.98] transition-all duration-300"
                        >
                            Talk to us
                        </Link>
                        <Link
                            href="/services"
                            className="px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/60 active:scale-[0.98] transition-all duration-300"
                        >
                            See services
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
