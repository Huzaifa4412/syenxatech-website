import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { siteConfig } from "@/lib/seo";
import Reveal from "./Reveal";

export default function HomeContact() {
    return (
        <section id="contact" aria-labelledby="contact-heading" className="hp-section hp-contact">
            <div className="hp-container">
                <Reveal className="hp-contact-layout" amount={0.1}>
                    <div className="hp-contact-copy">
                        <div aria-hidden="true" className="hp-contact-art"><Image src="/images/voice-hero-wave-v1.webp" alt="" fill sizes="(max-width: 767px) 100vw, 650px" /></div>
                        <p className="hp-eyebrow">Your next chapter</p>
                        <h2 id="contact-heading">Make room<br />for your customers.</h2>
                        <p>Tell us where the busywork is. We'll come back with a practical plan and a fixed quote.</p>
                        <Link href="/contact" className="hp-button">Book a free demo <ArrowUpRight size={18} /></Link>
                        <address>
                            <a href={`mailto:${siteConfig.email}`}><Mail size={16} />{siteConfig.email}</a>
                            <a href={siteConfig.phoneHref}><Phone size={16} />{siteConfig.phone}</a>
                        </address>
                    </div>
                    <div className="hp-contact-form">
                        <h3>Let's start a conversation.</h3>
                        <p>Share a little about your business.</p>
                        <ContactForm fallbackEmail={siteConfig.email} />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
