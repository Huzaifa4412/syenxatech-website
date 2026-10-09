import Image from "next/image";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/contact-form";
import Reveal from "@/components/home/Reveal";
import { siteConfig } from "@/lib/seo";

const serviceOptions = ["AI calling agents", "AI chatbots", "Website development", "Digital marketing & SEO", "Help me choose"];

export default function ContactClient() {
    return <main className="site-page sp-contact-page"><div className="sp-container">
        <Reveal className="sp-contact-header"><p className="sp-eyebrow">Let's talk about your business</p><h1>A good conversation.<br /><span>A clear next step.</span></h1></Reveal>
        <Reveal className="sp-contact-layout" amount={0.1}>
            <div className="sp-contact-info">
                <figure className="sp-contact-photo"><Image src="/images/home-voice-service-v1.webp" alt="Orange telephone handset on a warm ivory pedestal" fill priority sizes="(max-width:767px) 100vw, 480px" /></figure>
                <h2>Tell us where the busywork is.</h2><p>We'll listen, map out what would help and come back with a practical plan and a fixed quote.</p>
                <a href="https://cal.com/syenxa-tech/30min" target="_blank" rel="noopener noreferrer" className="sp-link">Book a free 30-minute call<ArrowUpRight size={17} aria-hidden="true" /></a>
                <address><a href={`mailto:${siteConfig.email}`}><Mail size={16} aria-hidden="true" />{siteConfig.email}</a><a href={siteConfig.phoneHref}><Phone size={16} aria-hidden="true" />{siteConfig.phone}</a></address>
                <nav className="sp-contact-socials" aria-label="Follow Syenxa Tech">{Object.entries(siteConfig.socials).map(([name,href]) => <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name.charAt(0).toUpperCase()+name.slice(1)}</a>)}</nav>
            </div>
            <div className="sp-contact-form"><h2>What's on your mind?</h2><p>Share a little about your business and what you need.</p><ContactForm fallbackEmail={siteConfig.email} serviceOptions={serviceOptions} /></div>
        </Reveal>
    </div></main>;
}
