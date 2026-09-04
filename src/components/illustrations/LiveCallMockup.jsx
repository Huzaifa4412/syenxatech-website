"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, CalendarCheck, PhoneForwarded, Check } from "lucide-react";

const WAVE = [0.35, 0.6, 0.45, 0.85, 0.55, 1, 0.7, 0.4, 0.9, 0.5, 0.75, 0.4, 0.95, 0.6, 0.5, 0.8];

const transcript = [
    { who: "ai", text: "Thanks for calling Bright Smile Dental, this is Ava. How can I help today?" },
    { who: "caller", text: "I chipped a tooth this morning. Can I get in today?" },
    { who: "ai", text: "I'm sorry to hear that. Dr. Patel has 2:30 or 4:15 open today. Which works for you?" },
    { who: "caller", text: "2:30 is perfect." },
    { who: "ai", text: "Booked for 2:30 PM. I've texted you a confirmation and the insurance form." },
];

/**
 * Phone-style card showing a live AI receptionist call. Transcript is real
 * text so it doubles as indexable, descriptive content.
 */
export default function LiveCallMockup() {
    const reduce = useReducedMotion();
    return (
        <figure aria-label="Example of an AI calling agent booking a same-day dental appointment" className="relative w-full max-w-[420px] mx-auto">
            <div aria-hidden className="absolute -inset-6 bg-[#ff541f]/10 rounded-[3rem] blur-3xl pointer-events-none" />
            <div className="relative rounded-[2.2rem] bg-zinc-900/[0.05] ring-1 ring-zinc-900/[0.06] p-1.5">
                <div className="rounded-[calc(2.2rem-0.375rem)] bg-white shadow-[0_30px_70px_-25px_rgba(24,24,27,0.35)] overflow-hidden">
                    {/* header */}
                    <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-zinc-900/5">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center size-11 rounded-xl bg-[#ff541f] text-white shadow-[0_10px_24px_-8px_rgba(255,84,31,0.6)]">
                                <Phone size={18} strokeWidth={1.6} />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-zinc-900 leading-tight">AI receptionist</p>
                                <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">Inbound · (512) 555-0142 · 00:48</p>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 ring-1 ring-emerald-600/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                            <motion.span animate={reduce ? undefined : { opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="size-1.5 rounded-full bg-emerald-500" />
                            Live
                        </span>
                    </div>

                    {/* waveform */}
                    <div className="px-6 pt-4 flex items-center justify-between gap-[3px] h-12">
                        {WAVE.map((height, i) => (
                            <motion.span
                                key={i}
                                animate={reduce ? undefined : { scaleY: [height, height * 0.3, height] }}
                                transition={{ duration: 1 + (i % 5) * 0.13, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.04 }}
                                style={{ height: `${height * 100}%` }}
                                className="flex-1 rounded-full bg-gradient-to-t from-[#ff541f] to-[#ff8a5f] origin-center"
                            />
                        ))}
                    </div>

                    {/* transcript */}
                    <ol className="px-6 py-5 space-y-2.5">
                        {transcript.map((line, i) => (
                            <motion.li
                                key={i}
                                initial={reduce ? false : { opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 + i * 0.18, duration: 0.5 }}
                                className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                                    line.who === "ai"
                                        ? "bg-zinc-100 text-zinc-700 rounded-bl-md"
                                        : "ml-auto bg-[#ff541f] text-white rounded-br-md"
                                }`}
                            >
                                {line.text}
                            </motion.li>
                        ))}
                    </ol>

                    {/* outcome */}
                    <div className="px-6 pb-6 grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-600/15 bg-emerald-50 px-3 py-2.5">
                            <span className="flex items-center justify-center size-7 rounded-full bg-emerald-500 text-white"><Check size={14} strokeWidth={3} /></span>
                            <div>
                                <p className="text-xs font-semibold text-zinc-900 leading-tight">Booked</p>
                                <p className="text-[10px] text-zinc-500 leading-tight flex items-center gap-1"><CalendarCheck size={10} /> Today, 2:30 PM</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-2xl border border-zinc-900/10 bg-white px-3 py-2.5">
                            <span className="flex items-center justify-center size-7 rounded-full bg-zinc-900 text-white"><PhoneForwarded size={13} /></span>
                            <div>
                                <p className="text-xs font-semibold text-zinc-900 leading-tight">CRM updated</p>
                                <p className="text-[10px] text-zinc-500 leading-tight">Transcript saved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <figcaption className="sr-only">
                A live call card showing the AI receptionist greeting a caller, offering two same-day appointment slots, booking 2:30 PM, texting a confirmation and updating the CRM.
            </figcaption>
        </figure>
    );
}
