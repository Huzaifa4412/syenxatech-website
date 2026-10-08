import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/seo";
import Reveal from "./Reveal";

export default function AboutStatement() {
    return (
        <section id="about" aria-labelledby="about-heading" className="hp-section hp-about">
            <div className="hp-container">
                <Reveal className="hp-about-layout" amount={0.15}>
                    <div className="hp-about-brand" aria-hidden="true">
                        <Image src="/images/voice-hero-wave-v1.webp" alt="" fill sizes="(max-width: 767px) 100vw, 550px" className="hp-about-background" />
                        <Image src="/logo-mark.png" alt="" width={144} height={144} className="hp-about-logo" />
                        <span>Syenxa Tech</span>
                    </div>
                    <div className="hp-about-copy">
                        <h2 id="about-heading">Built by people.<br /><span>For people.</span></h2>
                        <p>We build voice agents, chatbots and websites so your team can spend more time with the customers in front of them.</p>
                        <dl className="hp-about-facts">
                            <div><dt>Building software since</dt><dd>{siteConfig.foundingYear}</dd></div>
                            <div><dt>Projects shipped worldwide</dt><dd>300+</dd></div>
                        </dl>
                        <Link href="/about" className="hp-text-link">Meet Syenxa Tech <ArrowUpRight size={18} /></Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
