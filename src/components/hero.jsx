"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from "motion/react";
import {
    Phone,
    MessageSquare,
    ArrowUpRight,
    Sparkles,
    Check,
    Star,
    CalendarCheck,
} from "lucide-react";
import CountUp from "./countup";

const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_MASS = [0.32, 0.72, 0, 1];

const TYPED_PHRASES = [
    "never sleep.",
    "sell for you.",
    "answer every call.",
    "book meetings.",
];

const MARQUEE_LINKS = [
    { name: "AI Calling Agents", href: "/ai-calling-agents" },
    { name: "AI Chatbots", href: "/ai-chatbots" },
    { name: "Website Development", href: "/website-development" },
    { name: "Mobile Apps", href: "/digital-marketing" },
    { name: "Use Cases", href: "/use-cases" },
];

const WAVE_BARS = [
    0.35, 0.6, 0.45, 0.85, 0.55, 1, 0.7, 0.4, 0.9, 0.5, 0.75, 0.4, 0.95, 0.6,
];

/* Typewriter isolated so per-character updates re-render only itself */
const Typewriter = ({ phrases, className, startDelay = 1200 }) => {
    const reduce = useReducedMotion();
    const [text, setText] = useState(reduce ? phrases[0] : "");

    useEffect(() => {
        if (reduce) {
            setText(phrases[0]);
            return;
        }
        let charIdx = 0;
        let phraseIdx = 0;
        let deleting = false;
        let timer;

        const tick = () => {
            const phrase = phrases[phraseIdx];
            if (!deleting) {
                charIdx += 1;
                setText(phrase.slice(0, charIdx));
                if (charIdx === phrase.length) {
                    deleting = true;
                    timer = setTimeout(tick, 2400);
                } else {
                    timer = setTimeout(tick, 62);
                }
            } else {
                charIdx -= 1;
                setText(phrase.slice(0, charIdx));
                if (charIdx === 0) {
                    deleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    timer = setTimeout(tick, 400);
                } else {
                    timer = setTimeout(tick, 34);
                }
            }
        };

        timer = setTimeout(tick, startDelay);
        return () => clearTimeout(timer);
    }, [reduce, phrases, startDelay]);

    return (
        <span className={className}>
            {text}
            {!reduce && (
                <motion.span
                    aria-hidden
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[4px] h-[0.78em] ml-[0.1em] align-[-0.02em] rounded-full bg-[#ff541f]"
                />
            )}
        </span>
    );
};

const MagneticLink = ({ href, children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 150, damping: 15 });
    const sy = useSpring(y, { stiffness: 150, damping: 15 });
    const reduce = useReducedMotion();

    const onMove = (e) => {
        if (reduce || !ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        x.set((e.clientX - (left + width / 2)) * 0.22);
        y.set((e.clientY - (top + height / 2)) * 0.22);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            style={{ x: sx, y: sy }}
            whileTap={{ scale: 0.97 }}
            className="w-fit"
        >
            <Link href={href} className={className}>
                {children}
            </Link>
        </motion.div>
    );
};

/* Card shell: machined outer tray + white inner core */
const BezelCard = ({ children, className = "", inner = "" }) => (
    <div
        className={`rounded-[1.6rem] bg-zinc-900/[0.05] ring-1 ring-zinc-900/[0.06] p-1.5 ${className}`}
    >
        <div
            className={`rounded-[calc(1.6rem-0.375rem)] bg-white shadow-[0_24px_60px_-20px_rgba(24,24,27,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] ${inner}`}
        >
            {children}
        </div>
    </div>
);

const Hero = () => {
    const sectionRef = useRef(null);
    const reduce = useReducedMotion();

    /* Cursor parallax, one motion value pair, different depth per card */
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const smx = useSpring(mx, { stiffness: 50, damping: 20 });
    const smy = useSpring(my, { stiffness: 50, damping: 20 });
    const depth = (f) => ({
        x: useTransform(smx, (v) => v * f),
        y: useTransform(smy, (v) => v * f * 0.7),
    });
    const dCall = depth(14);
    const dChat = depth(26);
    const dBook = depth(34);
    const dStats = depth(20);

    const onSectionMove = (e) => {
        if (reduce || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const rise = (delay = 0) => ({
        initial: reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.9, delay, ease: EASE_OUT },
    });

    const cardEnter = (delay = 0, rotate = 0) => ({
        initial: reduce
            ? false
            : { opacity: 0, y: 56, rotate: rotate + 6, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, rotate, filter: "blur(0px)" },
        transition: { duration: 1.1, delay, ease: EASE_MASS },
    });

    return (
        <section
            id="home"
            ref={sectionRef}
            onMouseMove={onSectionMove}
            className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#faf9f7]"
        >
            {/* ambient: line grid + drifting glows */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(24,24,27,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.05) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "radial-gradient(ellipse 85% 75% at 50% 40%, black 25%, transparent 78%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 85% 75% at 50% 40%, black 25%, transparent 78%)",
                }}
            />
            <motion.div
                aria-hidden
                animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -24, 0] }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute -top-40 left-[5%] w-[520px] h-[520px] bg-[#ff541f]/[0.08] rounded-full blur-[140px] pointer-events-none"
            />
            <motion.div
                aria-hidden
                animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 26, 0] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 right-[0%] w-[560px] h-[560px] bg-[#ff541f]/[0.07] rounded-full blur-[130px] pointer-events-none"
            />

            <div className="relative flex-1 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-6 items-center">
                {/* ---------- Left: message + trust ---------- */}
                <div className="lg:col-span-6">
                    <motion.div {...rise(0)} className="mb-7">
                        <span className="inline-flex items-center rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-600 bg-white ring-1 ring-zinc-900/10 shadow-sm shadow-zinc-900/5">
                            AI automation for growing businesses
                        </span>
                    </motion.div>

                    <h1
                        aria-label="AI agents that never sleep."
                        className="text-5xl md:text-6xl lg:text-[4.3rem] font-bold text-zinc-900 tracking-tighter leading-[1.05]"
                    >
                        <span aria-hidden>
                            {["AI", "agents", "that"].map((word, i) => (
                                <span
                                    key={i}
                                    className="inline-block overflow-hidden mr-[0.24em] pb-[0.09em] align-bottom"
                                >
                                    <motion.span
                                        initial={
                                            reduce
                                                ? false
                                                : { y: "115%", rotate: 4, opacity: 0 }
                                        }
                                        animate={{ y: 0, rotate: 0, opacity: 1 }}
                                        transition={{
                                            duration: 1.1,
                                            delay: 0.12 + i * 0.08,
                                            ease: EASE_OUT,
                                        }}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                            <br />
                            <Typewriter
                                phrases={TYPED_PHRASES}
                                className="font-playfair italic font-medium text-[1.08em] tracking-tight text-[#ff541f] whitespace-nowrap"
                            />
                        </span>
                    </h1>

                    <motion.p
                        {...rise(0.45)}
                        className="mt-7 text-lg lg:text-xl text-zinc-600 leading-relaxed font-light max-w-[44ch]"
                    >
                        Syenxa Tech builds AI calling agents, chatbots, and
                        websites that answer every lead and book meetings
                        around the clock.
                    </motion.p>

                    <motion.div
                        {...rise(0.58)}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        <MagneticLink
                            href="/contact"
                            className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#ff541f] text-white font-bold text-sm shadow-[0_16px_40px_-12px_rgba(255,84,31,0.55)] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-zinc-900"
                        >
                            Book a Demo
                            <span className="flex items-center justify-center size-9 rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                            </span>
                        </MagneticLink>
                        <MagneticLink
                            href="/services"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-white ring-1 ring-zinc-900/10 text-zinc-800 font-medium text-sm shadow-sm shadow-zinc-900/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-zinc-900/30"
                        >
                            Explore Services
                        </MagneticLink>
                    </motion.div>

                    {/* trust row */}
                    <motion.div
                        {...rise(0.72)}
                        className="mt-10 flex items-center gap-4"
                    >
                        <div className="flex items-center -space-x-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.img
                                    key={i}
                                    whileHover={reduce ? undefined : { y: -6, zIndex: 10 }}
                                    src={`/hero-r-${i}.png`}
                                    alt={`Syenxa Tech client ${i}`}
                                    className="size-10 rounded-full border-2 border-white shadow-md shadow-zinc-900/10 object-cover bg-zinc-200"
                                />
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-3.5 h-3.5 text-[#ff541f] fill-[#ff541f]"
                                        strokeWidth={1.5}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-1">
                                Trusted by 150+ businesses worldwide
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ---------- Right: layered product cluster ---------- */}
                <div
                    aria-hidden
                    className="lg:col-span-6 relative h-[520px] md:h-[560px] select-none"
                >
                    {/* faint concentric rings behind the cluster */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[520px] rounded-full border border-zinc-900/[0.06]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[380px] rounded-full border border-zinc-900/[0.07]" />

                    {/* Card: live voice call */}
                    <motion.div
                        {...cardEnter(0.35, -2)}
                        style={reduce ? undefined : { x: dCall.x, y: dCall.y }}
                        className="absolute top-[4%] left-[2%] md:left-[6%] w-[330px] z-30"
                    >
                        <BezelCard inner="px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center size-10 rounded-xl bg-[#ff541f] shadow-[0_10px_24px_-8px_rgba(255,84,31,0.6)]">
                                        <Phone className="w-4.5 h-4.5 w-[18px] h-[18px] text-white" strokeWidth={1.5} />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-900 leading-tight">
                                            AI voice agent
                                        </p>
                                        <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                                            Inbound call · qualifying lead
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 ring-1 ring-emerald-600/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                                    <motion.span
                                        animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="size-1.5 rounded-full bg-emerald-500"
                                    />
                                    Live
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-[3px] h-10 px-0.5">
                                {WAVE_BARS.map((height, i) => (
                                    <motion.span
                                        key={i}
                                        animate={
                                            reduce
                                                ? undefined
                                                : { scaleY: [height, height * 0.35, height] }
                                        }
                                        transition={{
                                            duration: 1.1 + (i % 5) * 0.14,
                                            repeat: Infinity,
                                            repeatType: "mirror",
                                            ease: "easeInOut",
                                            delay: i * 0.045,
                                        }}
                                        style={{ height: `${height * 100}%` }}
                                        className="flex-1 rounded-full bg-gradient-to-t from-[#ff541f] to-[#ff8a5f] origin-center"
                                    />
                                ))}
                            </div>
                        </BezelCard>
                    </motion.div>

                    {/* Card: chatbot conversation */}
                    <motion.div
                        {...cardEnter(0.5, 2.5)}
                        style={reduce ? undefined : { x: dChat.x, y: dChat.y }}
                        className="absolute top-[24%] right-[0%] md:right-[2%] w-[300px] z-20"
                    >
                        <BezelCard inner="px-5 py-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="flex items-center justify-center size-8 rounded-lg bg-[#ff541f]/10 text-[#ff541f]">
                                    <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                                </span>
                                <p className="text-xs font-semibold text-zinc-900">
                                    WhatsApp chatbot
                                </p>
                            </div>
                            <div className="space-y-2.5">
                                <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-zinc-100 px-3.5 py-2 text-xs text-zinc-700 leading-relaxed">
                                    Can I get a quote for a new website?
                                </div>
                                <div className="w-fit max-w-[85%] ml-auto rounded-2xl rounded-br-md bg-[#ff541f] px-3.5 py-2 text-xs text-white leading-relaxed">
                                    Of course. What does your business do?
                                </div>
                                <div className="w-fit rounded-2xl rounded-bl-md bg-zinc-100 px-3.5 py-2.5 flex items-center gap-1">
                                    {[0, 1, 2].map((dot) => (
                                        <motion.span
                                            key={dot}
                                            animate={
                                                reduce
                                                    ? undefined
                                                    : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }
                                            }
                                            transition={{
                                                duration: 0.9,
                                                repeat: Infinity,
                                                delay: dot * 0.15,
                                            }}
                                            className="size-1.5 rounded-full bg-zinc-400"
                                        />
                                    ))}
                                </div>
                            </div>
                        </BezelCard>
                    </motion.div>

                    {/* Card: booking confirmation */}
                    <motion.div
                        {...cardEnter(0.68, -1)}
                        style={reduce ? undefined : { x: dBook.x, y: dBook.y }}
                        className="absolute bottom-[16%] right-[6%] md:right-[14%] z-40"
                    >
                        <BezelCard inner="px-5 py-4">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center size-9 rounded-full bg-emerald-500 shadow-[0_10px_24px_-8px_rgba(16,185,129,0.6)]">
                                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 leading-tight">
                                        Meeting booked
                                    </p>
                                    <p className="text-[11px] text-zinc-500 leading-tight mt-0.5 flex items-center gap-1">
                                        <CalendarCheck className="w-3 h-3" strokeWidth={1.5} />
                                        Tuesday, 2:30 PM
                                    </p>
                                </div>
                            </div>
                        </BezelCard>
                    </motion.div>

                    {/* Card: stats strip */}
                    <motion.div
                        {...cardEnter(0.82, 1.5)}
                        style={reduce ? undefined : { x: dStats.x, y: dStats.y }}
                        className="absolute bottom-[2%] left-[4%] md:left-[10%] z-10"
                    >
                        <BezelCard inner="px-6 py-4">
                            <div className="flex items-center divide-x divide-zinc-900/5">
                                <div className="pr-5">
                                    <span className="flex items-baseline gap-0.5">
                                        <CountUp
                                            from={0}
                                            to={150}
                                            duration={2}
                                            className="text-xl font-bold text-zinc-900 tracking-tighter tabular-nums"
                                        />
                                        <span className="text-sm font-light text-[#ff541f]">+</span>
                                    </span>
                                    <p className="text-[10px] text-zinc-500 mt-0.5 whitespace-nowrap">
                                        Happy clients
                                    </p>
                                </div>
                                <div className="px-5">
                                    <span className="flex items-baseline gap-0.5">
                                        <CountUp
                                            from={0}
                                            to={120}
                                            duration={2}
                                            className="text-xl font-bold text-zinc-900 tracking-tighter tabular-nums"
                                        />
                                        <span className="text-sm font-light text-[#ff541f]">k</span>
                                    </span>
                                    <p className="text-[10px] text-zinc-500 mt-0.5 whitespace-nowrap">
                                        Conversations
                                    </p>
                                </div>
                                <div className="pl-5">
                                    <span className="text-xl font-bold text-zinc-900 tracking-tighter tabular-nums">
                                        24/7
                                    </span>
                                    <p className="text-[10px] text-zinc-500 mt-0.5 whitespace-nowrap">
                                        Availability
                                    </p>
                                </div>
                            </div>
                        </BezelCard>
                    </motion.div>
                </div>
            </div>

            {/* ---------- Navigable service marquee ---------- */}
            <motion.nav
                {...rise(0.9)}
                aria-label="Browse services"
                className="relative border-t border-zinc-900/5 bg-white/40 backdrop-blur-sm overflow-hidden py-5"
            >
                <motion.div
                    animate={reduce ? undefined : { x: ["0%", "-50%"] }}
                    transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                    className="flex w-max items-center gap-10 will-change-transform"
                >
                    {[0, 1].map((copy) => (
                        <div
                            key={copy}
                            aria-hidden={copy === 1}
                            className="flex items-center gap-10"
                        >
                            {MARQUEE_LINKS.map((link) => (
                                <React.Fragment key={`${copy}-${link.href}`}>
                                    <Link
                                        href={link.href}
                                        tabIndex={copy === 1 ? -1 : 0}
                                        className="text-sm font-semibold tracking-wide text-zinc-500 hover:text-zinc-900 transition-colors duration-300 whitespace-nowrap uppercase"
                                    >
                                        {link.name}
                                    </Link>
                                    <Sparkles
                                        aria-hidden
                                        className="w-4 h-4 text-[#ff541f] shrink-0"
                                        strokeWidth={1.5}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </motion.nav>
        </section>
    );
};

export default Hero;
