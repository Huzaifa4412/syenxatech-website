import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CallDemo from "./CallDemo";
import { HearCallButton, HeroDemoProvider } from "./HeroDemoContext";
import "./home-hero.css";

/** Keep the headline and background server-rendered; audio is a client island. */
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
                        <p className="voice-hero-eyebrow">AI calling agents, built for your business</p>
                        <h1 id="home-hero-heading">
                            Every call.<br />
                            <span>Answered.</span>
                        </h1>
                        <p className="voice-hero-description">
                            Turn missed calls into booked appointments with a
                            voice agent that sounds natural and knows your business.
                        </p>
                        <div className="voice-hero-actions home-rise">
                            <Link href="/contact" className="voice-hero-primary">
                                Book a free demo
                                <span aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.8} /></span>
                            </Link>
                            <HearCallButton className="voice-hero-listen" />
                        </div>
                    </div>
                    <div className="voice-hero-demo home-rise" style={{ "--rise-delay": "0.12s" }}>
                        <CallDemo />
                    </div>
                </div>
            </section>
        </HeroDemoProvider>
    );
}
