"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search, Sparkles, Star, MapPin, Quote, ArrowUpRight } from "lucide-react";

/**
 * Hero visual: the same business showing up three ways at once:
 * a Google result, an AI Overview citation, and a ChatGPT-style answer.
 * All text is real DOM content, so it doubles as descriptive copy.
 */
export default function SearchVisibilityMockup() {
    const reduce = useReducedMotion();
    const rise = (delay) => ({
        initial: reduce ? false : { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    });

    return (
        <figure
            aria-label="A US business appearing in a Google search result, an AI Overview and a ChatGPT answer at the same time"
            className="relative w-full max-w-[560px] mx-auto"
        >
            <div aria-hidden className="absolute -inset-8 bg-[#ff541f]/10 rounded-[3rem] blur-3xl pointer-events-none" />

            {/* Google-style panel */}
            <motion.div {...rise(0.1)} className="relative rounded-[1.6rem] bg-zinc-900/[0.05] ring-1 ring-zinc-900/[0.06] p-1.5">
                <div className="rounded-[calc(1.6rem-0.375rem)] bg-white shadow-[0_30px_70px_-25px_rgba(24,24,27,0.35)] overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 border-b border-zinc-900/5">
                        <span className="flex items-center gap-2 flex-1 rounded-full border border-zinc-900/10 bg-zinc-50 px-3 py-1.5 text-[12px] text-zinc-700">
                            <Search size={13} className="text-zinc-400" />
                            emergency dentist austin tx
                        </span>
                    </div>

                    {/* AI Overview block */}
                    <div className="px-5 pt-4">
                        <div className="rounded-2xl border border-[#ff541f]/20 bg-gradient-to-br from-[#fff4ee] to-white p-4">
                            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-700">
                                <Sparkles size={13} className="text-[#ff541f]" /> AI Overview
                            </p>
                            <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-700">
                                Several Austin clinics offer same-day emergency care.{" "}
                                <span className="rounded-md bg-white px-1.5 py-0.5 text-[11px] font-semibold text-[#ff541f] ring-1 ring-[#ff541f]/25">
                                    Bright Smile Dental
                                </span>{" "}
                                lists walk-in hours until 7 PM and accepts most PPO plans.
                            </p>
                        </div>
                    </div>

                    {/* Organic result */}
                    <div className="px-5 py-4">
                        <p className="text-[11px] text-zinc-500">brightsmile-austin.com › emergency-dentist</p>
                        <p className="mt-0.5 text-[15px] font-semibold text-[#1a0dab] leading-snug">
                            Emergency Dentist in Austin, TX | Same-Day Appointments
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-zinc-600">
                            Chipped tooth or toothache? Book a same-day emergency visit online or by phone, 7 days a week. Most PPO insurance accepted.
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-[11px] text-zinc-500">
                            <span className="flex items-center gap-0.5 text-amber-500">
                                {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={11} className="fill-current" />)}
                            </span>
                            4.9 · 312 reviews
                            <span aria-hidden>·</span>
                            <MapPin size={11} /> Austin, TX
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* ChatGPT-style card, overlapping */}
            <motion.div
                {...rise(0.35)}
                className="relative -mt-10 ml-auto w-[88%] md:w-[80%] rounded-[1.4rem] bg-zinc-900 text-white p-5 shadow-[0_30px_70px_-25px_rgba(24,24,27,0.6)]"
            >
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                        <span className="size-2 rounded-full bg-emerald-400" /> AI assistant
                    </p>
                    <span className="text-[10px] text-zinc-500">ChatGPT · Perplexity · Gemini</span>
                </div>
                <p className="mt-3 text-[12px] text-zinc-400 italic">“Who does same-day emergency dental work in Austin?”</p>
                <p className="mt-3 text-[13px] leading-relaxed text-zinc-100">
                    <Quote size={12} className="inline -mt-1 mr-1 text-[#ff541f]" />
                    Bright Smile Dental offers same-day emergency appointments with walk-in hours until 7 PM and online booking.
                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="ml-1.5 inline-flex items-center gap-1 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#ff8a5f] ring-1 ring-white/10"
                        aria-label="Citation: brightsmile-austin.com"
                    >
                        brightsmile-austin.com <ArrowUpRight size={10} />
                    </a>
                </p>
            </motion.div>

            <figcaption className="sr-only">
                Mockup showing one business, Bright Smile Dental, ranking in Google organic results, being named inside a Google AI Overview, and being cited by an AI assistant for the query emergency dentist Austin.
            </figcaption>
        </figure>
    );
}
