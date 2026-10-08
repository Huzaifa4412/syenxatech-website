import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Globe, MessageCircle, PhoneCall, Search } from "lucide-react";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import Reveal from "./Reveal";

const SERVICES = [
    {
        href: "/ai-calling-agents", title: "A voice for every call.", name: "AI calling agents",
        description: "Answer questions, qualify leads and book appointments, even when your team is away.",
        price: "Fixed setup fee + per-minute usage", icon: PhoneCall,
        image: "/images/home-voice-service-v1.webp", imageAlt: "Orange telephone handset on an ivory stone pedestal",
        skills: ["Inbound & outbound", "Calendar booking", "Human handoff"], className: "hp-service-voice",
    },
    {
        href: "/ai-chatbots", title: "The conversation continues.", name: "AI chatbots",
        description: "One helpful agent across the channels your customers already use.",
        price: "$150 to $350 one-time setup", icon: MessageCircle,
        image: "/images/home-chat-service-v1.webp", imageAlt: "Orange acrylic and white ceramic conversation sculptures",
        skills: ["WhatsApp & Instagram", "Website chat", "7-day free trial"], className: "hp-service-chat",
    },
];

export default function ServicesBento() {
    return (
        <section id="services" aria-labelledby="services-heading" className="hp-section hp-services">
            <div className="hp-container">
                <Reveal className="hp-section-heading">
                    <p className="hp-eyebrow">Made to work together</p>
                    <h2 id="services-heading">More conversations.<br /><span>Less busywork.</span></h2>
                    <p>Voice agents, chatbots, websites and marketing. One team connecting the whole customer journey.</p>
                </Reveal>
                <div className="hp-service-grid">
                    {SERVICES.map((service, index) => (
                        <Reveal key={service.href} className={service.className} delay={index * 0.08}>
                            <article className="hp-service-card">
                                <div className="hp-service-visual">
                                    <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 767px) 100vw, 650px" />
                                </div>
                                <div className="hp-service-content">
                                    <p className="hp-service-name"><service.icon size={16} />{service.name}</p>
                                    <h3><Link href={service.href}>{service.title}<ArrowUpRight size={23} /></Link></h3>
                                    <p className="hp-service-description">{service.description}</p>
                                    <ul>{service.skills.map((skill) => <li key={skill}><Check size={12} />{skill}</li>)}</ul>
                                    <p className="hp-service-price">{service.price}</p>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                    <Reveal className="hp-service-web">
                        <article className="hp-service-card hp-service-horizontal">
                            <div className="hp-service-content">
                                <p className="hp-service-name"><Globe size={16} />Website development</p>
                                <h3><Link href="/website-development">Your best first impression.<ArrowUpRight size={23} /></Link></h3>
                                <p className="hp-service-description">Fast, thoughtful websites that make the next step easy for your customers.</p>
                                <p className="hp-service-price">From $200 · 5 to 7 working days</p>
                            </div>
                            <div className="hp-service-site">
                                <ProjectScreenshot src="/website-portfolio/knittypetit.png" title="Knitty Petit" alt="Knitty Petit storefront website built by Syenxa Tech" sizes="(max-width: 767px) calc(100vw - 76px), 340px" />
                            </div>
                        </article>
                    </Reveal>
                    <Reveal className="hp-service-marketing" delay={0.08}>
                        <article className="hp-service-card hp-marketing-card">
                            <div className="hp-service-content">
                                <p className="hp-service-name"><Search size={16} />Marketing & SEO</p>
                                <h3><Link href="/digital-marketing">Help the right people find you.<ArrowUpRight size={23} /></Link></h3>
                                <p className="hp-service-description">Search, content and paid campaigns built around enquiries.</p>
                                <div className="hp-marketing-topics"><span>Search</span><span>Content</span><span>Campaigns</span></div>
                                <p className="hp-service-price">Start with a free SEO audit</p>
                            </div>
                        </article>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
