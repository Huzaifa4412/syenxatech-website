import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/seo";
import Reveal from "./Reveal";
import BlurText from "@/components/ui/blur-text";
import NumberTicker from "@/components/ui/number-ticker";

export default function AboutStatement() {
    const foundingYearNum = parseInt(siteConfig.foundingYear, 10) || 2020;

    return (
        <section id="about" aria-labelledby="about-heading" className="hp-section hp-about">
            <div className="hp-container">
                <Reveal className="hp-about-layout" amount={0.15} blur={6}>
                    <div className="hp-about-brand" aria-hidden="true">
                        <Image src="/images/voice-hero-wave-v1.webp" alt="" fill sizes="(max-width: 767px) 100vw, 550px" className="hp-about-background" />
                        <Image src="/logo-mark.png" alt="" width={144} height={144} className="hp-about-logo" />
                        <span>Syenxa Tech</span>
                    </div>
                    <div className="hp-about-copy">
                        <h2 id="about-heading">
                            <span style={{ color: "var(--hp-ink)" }}>
                                <BlurText text="Built by people." delay={60} duration={0.6} />
                            </span>
                            <br />
                            <span>
                                <BlurText text="For people." delay={60} duration={0.65} />
                            </span>
                        </h2>
                        <p>We build voice agents, chatbots and websites so your team can spend more time with the customers in front of them.</p>
                        <dl className="hp-about-facts">
                            <div>
                                <dt>Building software since</dt>
                                <dd>
                                    <NumberTicker value={foundingYearNum} startValue={2000} delay={0.2} useGrouping={false} />
                                </dd>
                            </div>
                            <div>
                                <dt>Projects shipped worldwide</dt>
                                <dd>
                                    <NumberTicker value={300} delay={0.3} />+
                                </dd>
                            </div>
                        </dl>
                        <Link href="/about" className="hp-text-link">Meet Syenxa Tech <ArrowUpRight size={18} /></Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
