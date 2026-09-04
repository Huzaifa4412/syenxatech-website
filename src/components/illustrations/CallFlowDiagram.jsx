"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mic, Brain, Volume2, CalendarCheck } from "lucide-react";

/**
 * Animated flow: caller -> listen -> reason -> speak -> action.
 * Text is real DOM content so the steps are indexable.
 */
const steps = [
    { icon: Phone, title: "Caller", sub: "Inbound or outbound", ms: null },
    { icon: Mic, title: "Listen", sub: "Speech to text", ms: "~150 ms" },
    { icon: Brain, title: "Reason", sub: "LLM on your scripts", ms: "~300 ms" },
    { icon: Volume2, title: "Speak", sub: "Natural voice", ms: "~200 ms" },
    { icon: CalendarCheck, title: "Act", sub: "Book, log, transfer", ms: null },
];

export default function CallFlowDiagram() {
    const reduce = useReducedMotion();
    return (
        <figure
            aria-label="How an AI calling agent processes a call in under a second"
            className="rounded-3xl bg-zinc-900 text-white p-6 md:p-10 relative overflow-hidden"
        >
            <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff541f]/25 rounded-full blur-[100px] pointer-events-none" />
            <ol className="relative grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-3 items-start">
                {steps.map((step, i) => (
                    <li key={step.title} className="relative flex flex-col items-center text-center">
                        {i < steps.length - 1 && (
                            <div aria-hidden className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-white/15">
                                {!reduce && (
                                    <motion.span
                                        className="absolute -top-[3px] size-[7px] rounded-full bg-[#ff541f]"
                                        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                                        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                                    />
                                )}
                            </div>
                        )}
                        <span className={`relative z-10 flex items-center justify-center size-14 rounded-2xl ${i === 0 || i === steps.length - 1 ? "bg-white/10 text-white" : "bg-[#ff541f] text-white shadow-[0_12px_30px_-10px_rgba(255,84,31,0.8)]"}`}>
                            <step.icon size={24} strokeWidth={1.8} />
                        </span>
                        <p className="mt-4 font-display font-bold text-base">{step.title}</p>
                        <p className="text-xs text-zinc-400 mt-1">{step.sub}</p>
                        {step.ms && <p className="mt-2 text-[11px] font-mono text-[#ff8a5f]">{step.ms}</p>}
                    </li>
                ))}
            </ol>
            <figcaption className="relative mt-8 pt-6 border-t border-white/10 text-sm text-zinc-400 text-center">
                End-to-end response in well under a second, so the conversation feels like talking to a person, not waiting on a system.
            </figcaption>
        </figure>
    );
}
