"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Search, FileText, MousePointer2, MessagesSquare } from "lucide-react";

const services = [
    { id: "seo-services", name: "SEO & AI search", icon: Search, title: "Show up when the need is real.", text: "Build a search foundation around what you sell and what your customers ask. We connect technical SEO, local intent and useful answers for search engines and AI assistants.", includes: ["Indexing, speed and structured-data fixes", "Commercial-intent keyword and page mapping", "Local SEO and business profile improvements", "Answer-ready content for AEO and GEO"], note: "Search visibility takes consistent work. Rankings and AI citations are never guaranteed." },
    { id: "content-strategy", name: "Content that helps", icon: FileText, title: "Give each page a reason to exist.", text: "A useful service page answers the questions that stand between a customer and a decision. We plan content around those questions, then make it easy to find and navigate.", includes: ["Topic clusters and a practical content calendar", "Service pages, buying guides and useful FAQs", "Clear titles, headings and internal links", "Content refreshes based on search and enquiry data"], note: "You get a page and topic map before production, so the purpose of every piece is clear." },
    { id: "paid-acquisition", name: "Paid campaigns", icon: MousePointer2, title: "Make the click worth paying for.", text: "Connect Google Search, Meta and TikTok campaigns to focused landing pages. The offer, page and follow-up work together so visitors know exactly what to do next.", includes: ["Campaign structure, audiences and creative direction", "Fast landing pages with one clear offer", "Conversion tracking and channel attribution", "Testing and budget adjustments from lead quality"], note: "Campaign scope and media budget are agreed up front. Ad spend is separate from our service fee." },
    { id: "marketing-automation", name: "Lead follow-up", icon: MessagesSquare, title: "Keep the conversation going.", text: "Connect enquiries to a chatbot, voice agent or follow-up workflow. Capture useful details, give people a clear next step and keep your team informed in the tools they already use.", includes: ["Chatbot and voice-agent enquiry capture", "Qualification and booking workflows", "CRM updates and team notifications", "Follow-up sequences around your customer journey"], note: "The workflow follows your business rules, with a clear route to a person when needed." },
];

function ServicePreview({ active }) {
    if (active === 0) return (
        <div className="sx-search-plan">
            <div className="sx-preview-top"><Search size={16} /> Search foundation <span>Audit → action</span></div>
            {[{ label: "Technical health", detail: "Crawlability · speed · schema", icon: "01" }, { label: "Customer intent", detail: "Services · locations · buying questions", icon: "02" }, { label: "Useful answers", detail: "Clear pages · credible sources · internal links", icon: "03" }].map(item => <div className="sx-plan-row" key={item.label}><span>{item.icon}</span><div><strong>{item.label}</strong><p>{item.detail}</p></div><ArrowRight size={16} /></div>)}
            <p className="sx-preview-note">A practical roadmap for the searches that matter.</p>
        </div>
    );
    if (active === 1) return (
        <div className="sx-content-map">
            <div className="sx-preview-top"><FileText size={16} /> One topic. Connected answers.</div>
            <div className="sx-topic-main"><span>Your service page</span><strong>What you do.<br />Who it helps.</strong></div>
            <div className="sx-topic-branches">{["Common questions", "A buying guide", "Local service details"].map(text => <div key={text}><FileText size={18} /><span>{text}</span></div>)}</div>
            <p className="sx-preview-note">Content with a place in the customer journey.</p>
        </div>
    );
    if (active === 2) return (
        <div className="sx-ad-preview">
            <div className="sx-preview-top"><MousePointer2 size={16} /> From campaign to enquiry</div>
            <div className="sx-ad-art"><Image src="/images/home-industry-clinic-v1.webp" alt="Warm, welcoming clinic reception used in an illustrative campaign" fill sizes="(max-width: 767px) 90vw, 480px" /><div><span>Example campaign</span><strong>A calmer visit.<br />A simple booking.</strong></div></div>
            <div className="sx-ad-path"><span>Relevant offer</span><ArrowRight size={14} /><span>Focused page</span><ArrowRight size={14} /><span>Clear next step</span></div>
        </div>
    );
    return (
        <div className="sx-followup-preview">
            <div className="sx-preview-top"><MessagesSquare size={16} /> No enquiry left hanging</div>
            <div className="sx-lead-message">“Can I book an appointment this week?”</div>
            <div className="sx-followup-steps">{["Capture the enquiry", "Ask the right questions", "Offer a next step", "Update your team"].map((text, i) => <div key={text}><span>{i + 1}</span>{text}<Check size={15} /></div>)}</div>
            <p className="sx-preview-note">Illustrative workflow, configured around your business.</p>
        </div>
    );
}

export default function MarketingServices() {
    const [active, setActive] = useState(0);
    const prefix = useId();
    const tabs = useRef([]);
    const service = services[active];
    function onKeyDown(event) {
        let next;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (active + 1) % services.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (active - 1 + services.length) % services.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = services.length - 1;
        else return;
        event.preventDefault(); setActive(next); tabs.current[next]?.focus();
    }
    return (
        <section className="sx-section" id="seo-services" aria-labelledby="marketing-services-heading">
            <div className="sp-container">
                <div className="sx-heading-row"><div className="sx-section-heading"><p className="sp-eyebrow">The work behind the growth</p><h2 id="marketing-services-heading">One connected plan.<br /><span>Four ways to move forward.</span></h2></div><p>Start where the biggest gap is. We build the right mix for your business, rather than a checklist of services you don’t need.</p></div>
                <div className="sx-service-tabs" role="tablist" aria-label="Marketing services">
                    {services.map((item, i) => <button key={item.id} ref={el => { tabs.current[i] = el; }} type="button" role="tab" id={`${prefix}-tab-${i}`} aria-selected={active === i} aria-controls={`${prefix}-panel`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={onKeyDown}><item.icon size={19} strokeWidth={1.6} />{item.name}<ArrowRight size={15} /></button>)}
                </div>
                <div className="sx-service-panel" id={`${prefix}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${prefix}-tab-${active}`}>
                    <div className="sx-service-panel-copy"><p className="sp-eyebrow">{service.name}</p><h3>{service.title}</h3><p>{service.text}</p><ul className="sx-checklist">{service.includes.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><p className="sx-small-note">{service.note}</p></div>
                    <div className="sx-service-preview"><ServicePreview active={active} /></div>
                </div>
            </div>
        </section>
    );
}
