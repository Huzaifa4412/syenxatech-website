"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import "./website-services-showcase.css";

const designs = [
    { id: "business-website", label: "Business website", name: "Luma / Healthcare", alt: "Illustrative Luma clinic website design with a clear appointment action, spacious typography and warm clinic photography" },
    { id: "ecommerce-store", label: "Ecommerce store", name: "Solma / Homewares", alt: "Illustrative Solma homewares storefront design featuring editorial product photography and a clean shopping interface" },
    { id: "website-redesign", label: "Website redesign", name: "Northline / Consulting", alt: "Illustrative Northline consulting website redesign with confident typography, refined navigation and a clear project enquiry route" },
    { id: "web-mobile-app", label: "App interface", name: "Deskflow / Workspace", alt: "Illustrative Deskflow project workspace app with organised navigation, a weekly schedule and clearly separated tasks" },
];

export default function WebsiteServicesShowcase() {
    const id = useId();
    const [active, setActive] = useState(0);
    const design = designs[active];
    const image = `/images/website-design/${design.id}-v1.webp`;

    function moveTab(event, index) {
        const keys = { ArrowRight: (index + 1) % designs.length, ArrowLeft: (index + designs.length - 1) % designs.length, Home: 0, End: designs.length - 1 };
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = keys[event.key];
        setActive(next);
        event.currentTarget.parentElement.children[next].focus();
    }

    return <div className="ws-showcase">
        <div className="ws-showcase-heading"><span>A closer look at the design</span><span aria-hidden="true">0{active + 1} / 04</span></div>
        <div className="ws-design-tabs" role="tablist" aria-label="Explore website and app design concepts">
            {designs.map((item, index) => <button key={item.id} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={index === active} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => moveTab(event, index)}>{item.label}</button>)}
        </div>
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="ws-design-panel">
            <a className="ws-design-image" href={image} target="_blank" rel="noopener noreferrer" aria-label={`View the full-size ${design.label.toLowerCase()} concept in a new tab`}>
                <Image key={image} src={image} alt={design.alt} width={1448} height={1086} sizes="(max-width: 767px) calc(100vw - 72px), (max-width: 1023px) 85vw, 560px" />
                <span className="ws-design-expand" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </a>
            <div className="ws-design-caption"><div><strong>{design.name}</strong><span>Illustrative UI/UX concept</span></div><a href={image} target="_blank" rel="noopener noreferrer">View design<ArrowUpRight size={14} aria-hidden="true" /></a></div>
        </div>
        <p className="ws-showcase-note">Different businesses. Thoughtfully designed experiences.</p>
    </div>;
}
