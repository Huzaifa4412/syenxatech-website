"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X, Check, Gauge, Search, Sparkles, Smartphone, Code2 } from "lucide-react";

const rows = [
    { icon: Gauge, label: "Mobile load time", bad: "4.8 s", good: "0.9 s" },
    { icon: Search, label: "Google indexing", bad: "12 of 40 pages", good: "All pages, day one" },
    { icon: Code2, label: "Structured data", bad: "None", good: "Organization, Service, FAQ" },
    { icon: Sparkles, label: "Cited by AI assistants", bad: "Never", good: "Yes, with source link" },
    { icon: Smartphone, label: "Mobile experience", bad: "Pinch to zoom", good: "Designed mobile-first" },
];

function Frame({ tone, title, subtitle, children }) {
    const dark = tone === "good";
    return (
        <div className={`rounded-[1.4rem] p-1.5 ${dark ? "bg-[#ff541f]/15 ring-1 ring-[#ff541f]/20" : "bg-zinc-900/[0.05] ring-1 ring-zinc-900/[0.06]"}`}>
            <div className={`rounded-[calc(1.4rem-0.375rem)] overflow-hidden ${dark ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"} shadow-[0_24px_60px_-25px_rgba(24,24,27,0.35)]`}>
                <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${dark ? "border-white/10" : "border-zinc-900/5"}`}>
                    <span className="flex gap-1.5" aria-hidden>
                        <span className={`size-2 rounded-full ${dark ? "bg-white/20" : "bg-zinc-300"}`} />
                        <span className={`size-2 rounded-full ${dark ? "bg-white/20" : "bg-zinc-300"}`} />
                        <span className={`size-2 rounded-full ${dark ? "bg-white/20" : "bg-zinc-300"}`} />
                    </span>
                    <span className={`flex-1 text-center text-[10px] font-mono ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{subtitle}</span>
                </div>
                <div className="p-5">
                    <p className={`text-[11px] font-mono uppercase tracking-widest ${dark ? "text-[#ff8a5f]" : "text-zinc-400"}`}>{title}</p>
                    {children}
                </div>
            </div>
        </div>
    );
}

/**
 * Side-by-side comparison of a template website and a Syenxa build,
 * rendered as two browser frames with a metric list.
 */
export default function BeforeAfterVisual() {
    const reduce = useReducedMotion();
    return (
        <figure aria-label="Comparison of a typical template website with a Syenxa Tech website across speed, indexing, structured data, AI citations and mobile experience" className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch">
            <motion.div initial={reduce ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
                <Frame tone="bad" title="A typical template website" subtitle="random-builder-site.com">
                    <div className="mt-3 space-y-2" aria-hidden>
                        <div className="h-16 rounded-xl bg-zinc-100" />
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-10 rounded-lg bg-zinc-100" />
                            <div className="h-10 rounded-lg bg-zinc-100" />
                            <div className="h-10 rounded-lg bg-zinc-100" />
                        </div>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                        {rows.map((r) => (
                            <li key={r.label} className="flex items-center justify-between gap-3 text-[13px]">
                                <span className="flex items-center gap-2 text-zinc-600"><r.icon size={14} className="text-zinc-400" />{r.label}</span>
                                <span className="flex items-center gap-1.5 font-semibold text-zinc-500"><X size={13} className="text-red-500" />{r.bad}</span>
                            </li>
                        ))}
                    </ul>
                </Frame>
            </motion.div>

            <motion.div initial={reduce ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Frame tone="good" title="A Syenxa Tech website" subtitle="yourbusiness.com">
                    <div className="mt-3 space-y-2" aria-hidden>
                        <div className="h-16 rounded-xl bg-gradient-to-r from-[#ff541f] to-[#ff8a5f]" />
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-10 rounded-lg bg-white/10" />
                            <div className="h-10 rounded-lg bg-white/10" />
                            <div className="h-10 rounded-lg bg-white/10" />
                        </div>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                        {rows.map((r) => (
                            <li key={r.label} className="flex items-center justify-between gap-3 text-[13px]">
                                <span className="flex items-center gap-2 text-zinc-300"><r.icon size={14} className="text-zinc-500" />{r.label}</span>
                                <span className="flex items-center gap-1.5 font-semibold text-white"><Check size={13} className="text-emerald-400" />{r.good}</span>
                            </li>
                        ))}
                    </ul>
                </Frame>
            </motion.div>
            <figcaption className="md:col-span-2 text-center text-sm text-zinc-500">
                Illustrative comparison. Load times and indexing figures are typical of template builders versus a server-rendered Next.js build.
            </figcaption>
        </figure>
    );
}
