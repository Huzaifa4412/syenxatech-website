"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/interior/PageHero";
import CallDemo from "@/components/home/CallDemo";
import "@/components/home/home-hero.css";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Clock,
    TrendingUp,
    ShieldCheck,
    Globe,
    Calendar,
    MessageSquare,
    ChevronDown,
    HelpCircle,
    Mic,
    Brain,
    Volume2,
    PhoneForwarded,
    Check,
    Minus,
} from "lucide-react";

import { aiCallingFaqs } from "@/lib/faqs";
import CallFlowDiagram from "@/components/illustrations/CallFlowDiagram";
import { CostBarChart, MissedCallsDonut, SpeedToLeadChart } from "@/components/illustrations/Charts";

const sources = {
    mit: {
        label: "MIT / InsideSales Lead Response Management study",
        href: "https://www.chilipiper.com/article/speed-to-lead-statistics",
    },
    missed: {
        label: "Missed call statistics (411 Locals data)",
        href: "https://oncrew.ai/resources/missed-call-statistics",
    },
    mckinsey: {
        label: "CX Today, citing McKinsey",
        href: "https://www.cxtoday.com/contact-center/why-voice-ai-adoption-is-accelerating-in-2026/",
    },
    gartner: {
        label: "Gartner forecast via CloudTalk",
        href: "https://www.cloudtalk.io/blog/ai-voice-agent-statistics/",
    },
    pricing: {
        label: "Aircall, AI voice agent pricing 2026",
        href: "https://aircall.io/blog/best-practices/ai-voice-agent-cost/",
    },
    fcc: {
        label: "FCC ruling on AI-generated voices (Feb 2024)",
        href: "https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal",
    },
};

function Cite({ source }) {
    return (
        <a
            href={source.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-[#ff541f] underline decoration-[#ff541f]/30 hover:decoration-[#ff541f]"
        >
            {source.label}
        </a>
    );
}

const industries = [
    { name: "Dental & medical clinics", href: "/use-cases/doctor", blurb: "After-hours booking, triage and reminders." },
    { name: "Real estate agencies", href: "/use-cases/real-estate", blurb: "Instant lead qualification and viewing scheduling." },
    { name: "Gyms & fitness studios", href: "/use-cases/gym", blurb: "Class booking, renewals and win-back calls." },
    { name: "Salons & spas", href: "/use-cases/beauty-salon", blurb: "Appointments, deposits and rescheduling." },
    { name: "Home services & contractors", href: "/contact", blurb: "Quote requests, dispatch and follow-up." },
    { name: "Agencies & B2B sales teams", href: "/contact", blurb: "Inbound SDR, demo booking and outbound follow-up." },
];

const comparison = [
    { feature: "Answers 24/7 including holidays", ai: true, human: false, service: true },
    { feature: "Response time under 5 seconds", ai: true, human: false, service: false },
    { feature: "Handles 100+ simultaneous calls", ai: true, human: false, service: "partial" },
    { feature: "Books directly into your calendar", ai: true, human: true, service: "partial" },
    { feature: "Follows your exact qualification script", ai: true, human: "partial", service: "partial" },
    { feature: "Logs transcript and outcome to CRM", ai: true, human: "partial", service: false },
    { feature: "Runs outbound follow-up campaigns", ai: true, human: "partial", service: false },
    { feature: "Typical monthly cost (US, 200 calls)", ai: "$60 to $300", human: "$3,000+", service: "$300 to $900" },
];

function Mark({ value }) {
    if (value === true) return <Check className="w-5 h-5 text-emerald-600 mx-auto" aria-label="Yes" />;
    if (value === false) return <Minus className="w-5 h-5 text-zinc-300 mx-auto" aria-label="No" />;
    if (value === "partial") return <span className="text-xs font-semibold text-zinc-500">Partial</span>;
    return <span className="text-sm font-semibold text-zinc-800">{value}</span>;
}

export default function AICallingAgentsClient() {
    const [openFaq, setOpenFaq] = useState(null);
    const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

    return (
        <main className="site-page sp-voice-page">
            <PageHero eyebrow="AI calling agents" title="A helpful voice." accent="Every time they call."
                description="Answer questions, qualify leads and book appointments with a natural voice agent that knows your business. Cover inbound calls and outbound follow-ups, including after hours."
                image={{ src: "/images/home-voice-service-v1.webp", alt: "Orange telephone handset on an ivory stone pedestal" }}
                primary={{ href: "/contact", label: "Book a live voice demo" }} secondary={{ href: "#sample-calls", label: "Hear a sample call" }}
                caption="Your greeting, your services and your rules for when a human takes over."
                facts={[{value:"24/7",label:"Call coverage"},{value:"Your calendar",label:"Booking integration"},{value:"Human handoff",label:"When it matters"}]} />
            <section id="sample-calls" className="sp-call-samples" aria-labelledby="sample-calls-heading">
                <div className="sp-container">
                    <div className="sp-call-stage">
                        <div className="sp-call-story">
                            <p className="sp-eyebrow"><Volume2 size={15} aria-hidden="true" /> Put a voice to the idea</p>
                            <h2 id="sample-calls-heading">A natural hello.<br /><span>A useful next step.</span></h2>
                            <p>Hear the same sample calls featured on our homepage. Choose a business, press play and follow the conversation as it happens.</p>
                            <ol className="sp-call-journey">
                                {[
                                    { icon: MessageSquare, title: "Answers with context", detail: "A greeting and conversation shaped around the business." },
                                    { icon: Calendar, title: "Moves the conversation forward", detail: "From an appointment request to a clear next step." },
                                    { icon: PhoneForwarded, title: "Keeps people in the loop", detail: "Useful details for follow-up and human handoff." },
                                ].map((item, index) => (
                                    <li key={item.title}>
                                        <span className="sp-call-journey-icon"><item.icon size={19} strokeWidth={1.6} aria-hidden="true" /></span>
                                        <div><span className="sp-call-step">0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></div>
                                    </li>
                                ))}
                            </ol>
                            <Link href="#pricing" className="sp-link">Find your fit <ArrowRight size={16} /></Link>
                        </div>
                        <div className="sp-call-player"><CallDemo /></div>
                    </div>
                </div>
            </section>

                        {/* Stats */}
            <section className="py-16 border-y border-zinc-900/5 bg-zinc-900/[0.02]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { value: "21x", label: "More likely to qualify a lead when contacted in 5 minutes" },
                        { value: "62%", label: "Of small business calls go unanswered" },
                        { value: "<5s", label: "Average response time of our agents" },
                        { value: "24/7", label: "Coverage across every US time zone" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="font-display font-bold text-4xl md:text-5xl text-[#ff541f] mb-2">
                                {stat.value}
                            </div>
                            <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider font-mono leading-snug">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Definition: answer-first */}
            <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                    What is an AI calling agent?
                </h2>
                <p className="text-lg md:text-xl text-zinc-700 leading-relaxed">
                    An AI calling agent is software that makes and receives phone
                    calls and holds a natural conversation with the caller. It
                    listens with speech recognition, decides what to say with a
                    large language model trained on your scripts, and replies in
                    a human-like voice. Unlike an IVR menu, it can answer
                    questions, qualify a lead and book an appointment in one
                    call.
                </p>
                <p className="mt-6 text-zinc-600 leading-relaxed">
                    Businesses use AI calling agents (also called AI voice
                    agents, AI phone agents or AI receptionists) to stop missing
                    calls, to follow up with web leads within seconds, and to
                    take routine booking and support conversations off their
                    staff. Syenxa Tech builds each agent around your business:
                    your greeting, your qualification questions, your calendar,
                    your CRM and your rules for when a human should take over.
                </p>
            </section>

            {/* Why (with citations) */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-zinc-900/5">
                <div className="mb-14 text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        Why US businesses are switching to AI calling agents
                    </h2>
                    <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                        The numbers behind missed calls and slow follow-up are
                        stark. Every figure below links to its source.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <figure className="p-8 rounded-3xl bg-white border border-zinc-900/10">
                        <figcaption className="mb-5">
                            <p className="text-xs font-mono uppercase tracking-widest text-[#ff541f] mb-1">Speed to lead</p>
                            <h3 className="font-display text-xl font-bold">Odds of qualifying a lead, by response time</h3>
                        </figcaption>
                        <SpeedToLeadChart />
                        <p className="mt-4 text-xs text-zinc-500">Source: <Cite source={sources.mit} /></p>
                    </figure>
                    <figure className="p-8 rounded-3xl bg-white border border-zinc-900/10">
                        <figcaption className="mb-5">
                            <p className="text-xs font-mono uppercase tracking-widest text-[#ff541f] mb-1">Missed calls</p>
                            <h3 className="font-display text-xl font-bold">What happens to inbound calls today</h3>
                        </figcaption>
                        <MissedCallsDonut />
                        <p className="mt-4 text-xs text-zinc-500">Source: <Cite source={sources.missed} /></p>
                    </figure>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="p-8 rounded-3xl bg-white border border-zinc-900/10">
                        <h3 className="font-display text-xl font-bold mb-3">Speed to lead decides who wins</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            Contacting a lead within five minutes makes a business
                            21 times more likely to qualify it than waiting 30
                            minutes, according to the{" "}
                            <Cite source={sources.mit} />. Most teams respond in
                            hours. An AI agent responds in seconds, at any hour.
                        </p>
                    </article>
                    <article className="p-8 rounded-3xl bg-white border border-zinc-900/10">
                        <h3 className="font-display text-xl font-bold mb-3">Most small business calls go unanswered</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            Roughly 62% of calls to small businesses ring out to
                            voicemail, and up to 85% of those callers never call
                            back (<Cite source={sources.missed} />). For a clinic
                            or contractor, each of those calls is a booked job
                            that went to a competitor.
                        </p>
                    </article>
                    <article className="p-8 rounded-3xl bg-white border border-zinc-900/10">
                        <h3 className="font-display text-xl font-bold mb-3">Dramatically lower cost per call</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            McKinsey reports AI agents cutting cost per call by
                            around 50% in real deployments, with voice AI at
                            roughly $0.40 per call against $7 to $12 for a human
                            agent (<Cite source={sources.mckinsey} />). Gartner
                            expects conversational AI to remove $80 billion in
                            contact center labor cost in 2026 (
                            <Cite source={sources.gartner} />).
                        </p>
                    </article>
                    <article className="p-8 rounded-3xl bg-white border border-zinc-900/10">
                        <h3 className="font-display text-xl font-bold mb-3">Consistent data, every time</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            The agent runs the same qualification script on every
                            call and writes budget, timeline, outcome and a full
                            transcript into HubSpot, Salesforce, GoHighLevel or
                            your booking system. No more chasing reps to update
                            the CRM.
                        </p>
                    </article>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900/5">
                <div className="mb-14">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        How our AI calling agents work
                    </h2>
                    <p className="text-lg text-zinc-600 max-w-2xl">
                        Four layers, tuned together so the conversation feels
                        immediate and stays on-brand.
                    </p>
                </div>
                <div className="mb-10">
                    <CallFlowDiagram />
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { icon: Mic, title: "1. Listen", desc: "Streaming speech recognition transcribes the caller in real time, with noise suppression and interruption handling." },
                        { icon: Brain, title: "2. Reason", desc: "A large language model, prompted with your scripts, pricing and policies, decides the next best response and checks qualification criteria." },
                        { icon: Volume2, title: "3. Speak", desc: "A natural, low-latency voice replies in under a second. Choose accent, tone and languages (English and Spanish are standard)." },
                        { icon: PhoneForwarded, title: "4. Act", desc: "Books the appointment, updates the CRM, sends an SMS confirmation, or transfers to a human with a summary." },
                    ].map((step) => (
                        <li key={step.title} className="p-8 rounded-3xl bg-zinc-900/5 border border-zinc-900/10">
                            <div className="w-12 h-12 rounded-xl bg-[#ff541f]/10 text-[#ff541f] flex items-center justify-center mb-6">
                                <step.icon size={24} />
                            </div>
                            <h3 className="font-display text-xl font-bold text-zinc-900 mb-3">{step.title}</h3>
                            <p className="text-zinc-600 leading-relaxed">{step.desc}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Features */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900/5">
                <div className="mb-14 text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        Everything included with a Syenxa Tech voice agent
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "24/7 inbound and outbound calling", desc: "Never lose a lead to voicemail. Agents answer instantly and run scheduled follow-up campaigns across every US time zone.", icon: Clock },
                        { title: "Human-grade conversational voice", desc: "Natural, empathetic, professional voices tailored to your brand, with sub-second response latency.", icon: MessageSquare },
                        { title: "Unlimited concurrency", desc: "Handle 10 or 10,000 simultaneous calls during a campaign or a busy Monday morning without adding staff.", icon: Globe },
                        { title: "Calendar and CRM auto-booking", desc: "Direct integrations with Google Calendar, Outlook, Calendly, HubSpot, Salesforce and GoHighLevel.", icon: Calendar },
                        { title: "Lead qualification and routing", desc: "Custom prompts screen prospects, verify budget and timeline, and escalate high-value opportunities to your reps.", icon: ShieldCheck },
                        { title: "Reporting on revenue, not minutes", desc: "Dashboards show calls answered, appointments booked and pipeline created, so ROI is visible from week one.", icon: TrendingUp },
                    ].map((feature) => (
                        <div key={feature.title} className="p-8 rounded-3xl bg-white border border-zinc-900/10 hover:border-[#ff541f]/50 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[#ff541f]/10 text-[#ff541f] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="font-display text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                            <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Industries */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900/5">
                <div className="mb-12">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        AI calling agents by industry
                    </h2>
                    <p className="text-lg text-zinc-600 max-w-2xl">
                        The agent is trained on the questions your callers
                        actually ask. Explore how it is configured for your
                        industry.
                    </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {industries.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="group flex items-start justify-between gap-4 p-6 rounded-2xl bg-white border border-zinc-900/10 hover:border-[#ff541f]/50 transition-colors h-full"
                            >
                                <div>
                                    <h3 className="font-display font-bold text-lg text-zinc-900 group-hover:text-[#ff541f] transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-zinc-600 mt-1">{item.blurb}</p>
                                </div>
                                <ArrowRight size={18} className="shrink-0 mt-1 text-zinc-400 group-hover:text-[#ff541f] group-hover:translate-x-1 transition-all" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Comparison */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900/5">
                <div className="mb-10">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        AI calling agent vs receptionist vs answering service
                    </h2>
                    <p className="text-lg text-zinc-600 max-w-3xl">
                        How the three most common ways to cover the phone compare
                        for a US small business.
                    </p>
                </div>
                <figure className="mb-8 p-8 rounded-3xl bg-white border border-zinc-900/10">
                    <figcaption className="mb-4">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#ff541f] mb-1">Monthly cost</p>
                        <h3 className="font-display text-xl font-bold">Phone coverage options for about 200 calls a month</h3>
                    </figcaption>
                    <CostBarChart />
                </figure>
                <div className="overflow-x-auto rounded-3xl border border-zinc-900/10 bg-white">
                    <table className="w-full min-w-[640px] text-left">
                        <thead>
                            <tr className="border-b border-zinc-900/10 text-xs font-mono uppercase tracking-widest text-zinc-500">
                                <th scope="col" className="p-5">Capability</th>
                                <th scope="col" className="p-5 text-center text-[#ff541f]">AI calling agent</th>
                                <th scope="col" className="p-5 text-center">In-house receptionist</th>
                                <th scope="col" className="p-5 text-center">Live answering service</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparison.map((row) => (
                                <tr key={row.feature} className="border-b border-zinc-900/5 last:border-0">
                                    <th scope="row" className="p-5 font-medium text-zinc-800">{row.feature}</th>
                                    <td className="p-5 text-center"><Mark value={row.ai} /></td>
                                    <td className="p-5 text-center"><Mark value={row.human} /></td>
                                    <td className="p-5 text-center"><Mark value={row.service} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                    Cost figures are 2026 US market ranges for roughly 200 calls a
                    month; see <Cite source={sources.pricing} />. A full-time
                    receptionist figure reflects a typical US salary plus
                    benefits.
                </p>
            </section>

            {/* US compliance */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-5">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Built for US calling rules
                        </h2>
                        <p className="text-lg text-zinc-600">
                            AI voice is regulated in the United States, and the
                            details matter. We configure every agent to respect
                            them.
                        </p>
                    </div>
                    <div className="lg:col-span-7 space-y-6">
                        <div className="p-6 rounded-2xl bg-white border border-zinc-900/10">
                            <h3 className="font-display font-bold text-lg mb-2">TCPA and consent</h3>
                            <p className="text-zinc-600 leading-relaxed">
                                In February 2024 the FCC confirmed that
                                AI-generated voices count as “artificial voices”
                                under the Telephone Consumer Protection Act (
                                <Cite source={sources.fcc} />). Outbound campaigns
                                therefore run only to contacts with prior express
                                consent, and the agent identifies itself and
                                honors opt-out requests immediately.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-zinc-900/10">
                            <h3 className="font-display font-bold text-lg mb-2">Call recording disclosures</h3>
                            <p className="text-zinc-600 leading-relaxed">
                                Several states, including California, Florida and
                                Illinois, require all parties to consent to
                                recording. Agents announce recording where
                                required, and recording can be disabled per state
                                or per campaign.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-zinc-900/10">
                            <h3 className="font-display font-bold text-lg mb-2">Local numbers, human handoff</h3>
                            <p className="text-zinc-600 leading-relaxed">
                                Use your existing business number or add local
                                numbers for each location. Calls that need a
                                person are transferred warm, with a summary, to
                                your team during business hours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900/5">
                <div className="mb-10">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        AI calling agent pricing
                    </h2>
                    <p className="text-lg text-zinc-600 max-w-3xl">
                        Pricing has two parts: a one-time setup fee for building
                        and training your agent, and a usage rate per call minute.
                        Every engagement starts with a free consultation and a
                        live demo on your own scripts.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-3xl bg-white border border-zinc-900/10">
                        <h3 className="font-display font-bold text-xl mb-2">Setup and training</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            Fixed, quoted up front. Covers script design, voice
                            selection, calendar and CRM integration, compliance
                            configuration and a test period before go-live.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white border border-zinc-900/10">
                        <h3 className="font-display font-bold text-xl mb-2">Usage</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            Billed per call minute. For context, managed AI voice
                            platforms in the US typically charge $0.25 to $0.50
                            per minute in 2026, and a business handling about 200
                            calls a month pays roughly $60 to $150 (
                            <Cite source={sources.pricing} />). We quote your
                            rate based on volume and languages.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-900">
                        <h3 className="font-display font-bold text-xl mb-2">Included</h3>
                        <ul className="space-y-2 text-zinc-300">
                            {["Free consultation and demo", "Unlimited concurrent calls", "Transcripts and call outcomes", "Ongoing prompt tuning and support"].map((item) => (
                                <li key={item} className="flex gap-2"><Check className="w-5 h-5 text-[#ff541f] shrink-0" />{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto relative z-10 border-t border-zinc-900/10">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-zinc-900/10 bg-zinc-900/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-4">
                        <HelpCircle size={14} /> Frequently asked questions
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-900 mb-4">
                        AI calling agents, explained
                    </h2>
                    <p className="text-zinc-600 text-base md:text-lg">
                        Answers on cost, compliance, integrations and rollout.
                    </p>
                </div>

                <div className="space-y-4">
                    {aiCallingFaqs.map((faq, idx) => (
                        <div key={idx} className="rounded-2xl border border-zinc-900/10 bg-white overflow-hidden transition-colors hover:border-zinc-900/20">
                            <h3>
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    aria-expanded={openFaq === idx}
                                    className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                                >
                                    <span className="font-display font-semibold text-lg text-zinc-900">{faq.question}</span>
                                    <ChevronDown size={20} className={`text-[#ff541f] shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                                </button>
                            </h3>
                            <AnimatePresence>
                                {openFaq === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-6 text-zinc-700 leading-relaxed font-body"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-center text-zinc-600">
                    Want the full cost breakdown? Read{" "}
                    <Link href="/blog/ai-calling-agent-cost-2026" className="font-semibold text-[#ff541f] hover:underline">
                        how much AI calling agents cost in 2026
                    </Link>{" "}
                    or see{" "}
                    <Link href="/blog/how-ai-calling-agents-are-transforming-sales" className="font-semibold text-[#ff541f] hover:underline">
                        how sales teams roll them out
                    </Link>
                    .
                </p>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#ff541f]/5" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 mb-8">
                        Ready to answer every call?
                    </h2>
                    <p className="text-xl text-zinc-600 mb-10">
                        Book a free demo and hear an AI calling agent trained on
                        your own scripts, calendar and FAQs.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-[#ff541f] text-white font-bold rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-300 hover:scale-105 shadow-xl shadow-[#ff541f]/20"
                    >
                        Schedule a Live Voice AI Demo
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
