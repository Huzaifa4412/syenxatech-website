"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, Check, Dumbbell, Scissors, Stethoscope } from "lucide-react";

const ICONS = { doctor: Stethoscope, "real-estate": Building2, gym: Dumbbell, "beauty-salon": Scissors };

export default function IndustryPanels({ industries }) {
    const [active, setActive] = useState(0);
    const activeIndustry = industries[active];
    const tabRefs = useRef([]);
    const onKeyDown = (event) => {
        let next;
        if (event.key === "ArrowRight") next = (active + 1) % industries.length;
        else if (event.key === "ArrowLeft") next = (active - 1 + industries.length) % industries.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = industries.length - 1;
        else return;
        event.preventDefault();
        setActive(next);
        tabRefs.current[next]?.focus();
    };

    return (
        <div>
            <div role="tablist" aria-label="Explore your industry" className="hp-industry-tabs">
                {industries.map((industry, index) => {
                    const Icon = ICONS[industry.slug];
                    return (
                        <button key={industry.slug} ref={(node) => { tabRefs.current[index] = node; }}
                            type="button" role="tab" id={`industry-button-${industry.slug}`}
                            aria-selected={active === index} aria-controls={`industry-panel-${industry.slug}`}
                            tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={onKeyDown}>
                            <Icon size={19} strokeWidth={1.6} />{industry.name}
                        </button>
                    );
                })}
            </div>
            <div className="hp-industry-layout">
                <div className="hp-industry-photo">
                    <Image key={activeIndustry.slug} src={activeIndustry.image} alt={activeIndustry.imageAlt} fill sizes="(max-width: 767px) 100vw, 650px" />
                </div>
                <div className="hp-industry-panels">
                    {industries.map((industry, index) => (
                        <div key={industry.slug} id={`industry-panel-${industry.slug}`}
                            role="tabpanel" aria-labelledby={`industry-button-${industry.slug}`} hidden={active !== index}
                            tabIndex={0} className="hp-industry-panel">
                            <p className="hp-industry-label">{industry.name}</p>
                            <h3>{industry.headline}</h3>
                            <p className="hp-industry-summary">{industry.summary}</p>
                            <ul>{industry.solutions.map((solution) => <li key={solution}><Check size={16} />{solution}</li>)}</ul>
                            <Link href={`/use-cases/${industry.slug}`} className="hp-text-link">{industry.linkLabel}<ArrowUpRight size={18} /></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
