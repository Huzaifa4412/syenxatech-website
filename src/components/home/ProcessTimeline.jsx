import Link from "next/link";
import { ArrowUpRight, CheckCheck, ClipboardList, Settings2, SlidersHorizontal } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
    { icon: ClipboardList, title: "Talk it through", time: "Free 30-minute call", text: "We understand your business, map the customer journey and send a fixed quote." },
    { icon: Settings2, title: "Make it yours", time: "3 days to 2 weeks", text: "Your voice, services and working hours, connected to the calendar and tools you use." },
    { icon: CheckCheck, title: "Try it for yourself", time: "7-day chatbot trial", text: "Test real questions on your own channels. We refine the answers with your feedback." },
    { icon: SlidersHorizontal, title: "Launch. Keep improving.", time: "Ongoing support", text: "Go live with call transcripts and clear outcomes. We keep tuning as your business changes." },
];

export default function ProcessTimeline() {
    return (
        <section id="process" aria-labelledby="process-heading" className="hp-section hp-process">
            <div className="hp-container">
                <Reveal className="hp-section-heading hp-centered">
                    <h2 id="process-heading">From first call<br /><span>to go-live.</span></h2>
                    <p>A clear plan, one team and a chance to try it before it becomes part of your business.</p>
                </Reveal>
                <ol className="hp-process-steps">
                    {STEPS.map((step, index) => (
                        <Reveal key={step.title} as="li" className="hp-process-step" delay={index * 0.06} amount={0.15}>
                            <div className="hp-process-marker"><step.icon size={24} strokeWidth={1.5} /><span>0{index + 1}</span></div>
                            <h3>{step.title}</h3>
                            <p className="hp-process-time">{step.time}</p>
                            <p className="hp-process-description">{step.text}</p>
                        </Reveal>
                    ))}
                </ol>
                <Link href="/contact" className="hp-button hp-process-cta">Book a free demo <ArrowUpRight size={18} /></Link>
            </div>
        </section>
    );
}
