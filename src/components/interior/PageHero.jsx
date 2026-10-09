import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/home/Reveal";

export default function PageHero({ eyebrow, title, accent, description, image, visual, caption, primary, secondary, facts, back }) {
    return (
        <section className={`sp-hero${image || visual ? "" : " sp-hero-text"}`}>
            <div className="sp-container">
                {back && <Link href={back.href} className="sp-back">← {back.label}</Link>}
                <div className="sp-hero-grid">
                    <Reveal className="sp-hero-copy" amount={0.1}>
                        <p className="sp-eyebrow">{eyebrow}</p>
                        <h1>{title}{accent && <> <span>{accent}</span></>}</h1>
                        <p className="sp-intro">{description}</p>
                        {(primary || secondary) && <div className="sp-actions">
                            {primary && <Link href={primary.href} className="sp-button">{primary.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>}
                            {secondary && <Link href={secondary.href} className="sp-link">{secondary.label}<ArrowUpRight size={17} aria-hidden="true" /></Link>}
                        </div>}
                        {facts && <dl className="sp-hero-facts">{facts.map(({ value, label }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
                    </Reveal>
                    {(image || visual) && <Reveal className="sp-hero-media" delay={0.08} amount={0.1}>
                        {image ? <figure className="sp-hero-photo"><Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 620px" /></figure> : <div className="sp-hero-visual">{visual}</div>}
                        {caption && <p className="sp-caption">{caption}</p>}
                    </Reveal>}
                </div>
            </div>
        </section>
    );
}
