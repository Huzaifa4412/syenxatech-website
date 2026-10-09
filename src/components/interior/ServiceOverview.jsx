import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "./PageHero";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import SearchVisibilityMockup from "@/components/illustrations/SearchVisibilityMockup";
import Reveal from "@/components/home/Reveal";

const services = [
    { title: "A voice for every call.", name: "AI calling agents", description: "Natural conversations that answer questions, qualify leads and book appointments while your team gets on with their work.", features: ["Inbound calls and outbound follow-ups", "Calendar booking and CRM sync", "A clear route to a human when needed"], href: "/ai-calling-agents", image: "/images/home-voice-service-v1.webp", alt: "Orange telephone handset on an ivory stone pedestal", price: "Fixed setup fee + per-minute usage" },
    { title: "Keep the conversation going.", name: "AI chatbots", description: "One helpful agent across the channels your customers already use, built around your services and answers.", features: ["WhatsApp, Instagram, Messenger and website chat", "Customer support and lead qualification", "Delivery in about 3 working days"], href: "/ai-chatbots", image: "/images/home-chat-service-v1.webp", alt: "Orange acrylic and ivory ceramic conversation sculptures", price: "$150 to $350 one-time setup · 7-day free trial" },
    { title: "A better first impression.", name: "Website development", description: "Thoughtful design, useful details and a clear next step. Custom websites built to make finding and contacting your business easy.", features: ["Custom design and responsive layouts", "SEO, accessibility and performance foundations", "Standard websites delivered in 5 to 7 working days"], href: "/website-development", price: "Standard business websites from $200", website: true },
    { title: "Be there when they search.", name: "Digital marketing & SEO", description: "Connect search, content and campaigns to the systems that turn an enquiry into a real customer conversation.", features: ["Technical SEO and content planning", "Paid search and social campaigns", "Lead follow-up and reporting"], href: "/digital-marketing", price: "Start with a free SEO audit", marketing: true },
];

export function ServicesIntro() {
    return <PageHero eyebrow="Services that work together" title="Less busywork." accent="More business." description="Calling agents, chatbots, websites and marketing. One team connecting the whole journey, from the first enquiry to the next booking." image={{src:"/images/home-reception-v1.webp",alt:"A welcoming sunlit business reception with an orange telephone on the counter"}} caption="Built around your team, your customers and your working day." primary={{href:"/contact",label:"Book a free demo"}} secondary={{href:"#our-services",label:"Explore our services"}} />;
}

export default function ServiceOverview() {
    return <section id="our-services" className="sp-service-list"><div className="sp-container">
        {services.map(service => <Reveal as="article" key={service.href} className="sp-service-row" amount={0.1}>
            <div className={`sp-service-image${service.marketing ? " sp-service-marketing" : ""}`}>
                {service.image && <Image src={service.image} alt={service.alt} fill sizes="(max-width:767px) 100vw, 590px" />}
                {service.website && <ProjectScreenshot src="/website-portfolio/knittypetit.png" title="Knitty Petit" alt="Knitty Petit online store built by Syenxa Tech" sizes="(max-width:767px) 85vw, 500px" />}
                {service.marketing && <SearchVisibilityMockup />}
            </div>
            <div className="sp-service-copy"><p className="sp-eyebrow">{service.name}</p><h2>{service.title}</h2><p>{service.description}</p><ul>{service.features.map(feature => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}</ul><p className="sp-caption">{service.price}</p><Link href={service.href} className="sp-link">Explore {service.name}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </Reveal>)}
    </div></section>;
}
