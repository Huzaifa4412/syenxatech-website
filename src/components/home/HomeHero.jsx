import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CallDemo from "./CallDemo";
import { HearCallButton, HeroDemoProvider } from "./HeroDemoContext";
import BlurText from "@/components/ui/blur-text";
import BlurFade from "@/components/ui/blur-fade";
import ShinyText from "@/components/ui/shiny-text";
import "./home-hero.css";

/** Keep the background server-rendered with responsive animated text and demo island. */
export default function HomeHero() {
    return (
        <HeroDemoProvider>
            <section id="home" aria-labelledby="home-hero-heading" className="voice-hero">
                <div aria-hidden="true" className="voice-hero-art">
                    <Image
                        src="/images/voice-hero-wave-v1.webp"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="voice-hero-image"
                    />
                </div>
                <div className="voice-hero-layout">
                    <div className="voice-hero-copy">
                        <BlurFade delay={0.05} duration={0.4} offset={10}>
                            <p className="voice-hero-eyebrow">
                                <ShinyText speed={3.5}>
                                    AI calling agents, built for your business
                                </ShinyText>
                            </p>
                        </BlurFade>
                        <h1 id="home-hero-heading">
                            <span style={{ color: "#20201e" }}>
                                <BlurText
                                    text="Every call."
                                    delay={80}
                                    duration={0.6}
                                />
                            </span>
                            <br />
                            <span>
                                <BlurText
                                    text="Answered."
                                    delay={80}
                                    duration={0.7}
                                />
                            </span>
                        </h1>
                        <BlurFade delay={0.2} duration={0.5} offset={12}>
                            <p className="voice-hero-description">
                                Turn missed calls into booked appointments with a
                                voice agent that sounds natural and knows your business.
                            </p>
                        </BlurFade>
                        <BlurFade delay={0.3} duration={0.5} offset={14}>
                            <div className="voice-hero-actions">
                                <Link href="/contact" className="voice-hero-primary">
                                    Book a free demo
                                    <span aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.8} /></span>
                                </Link>
                                <HearCallButton className="voice-hero-listen" />
                            </div>
                        </BlurFade>
                    </div>
                    <div className="voice-hero-demo">
                        <BlurFade delay={0.15} duration={0.6} offset={20}>
                            <CallDemo />
                        </BlurFade>
                    </div>
                </div>
            </section>
        </HeroDemoProvider>
    );
}
