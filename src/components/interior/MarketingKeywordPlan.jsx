"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, FileText, Check } from "lucide-react";

const examples = [
    { label: "Learn", query: "how much does a website cost?", intent: "Informational intent", page: "A clear cost guide", answer: "Explain what affects the price, what is included and which choices fit different budgets.", next: "Explore website development", href: "/website-development", measure: "Relevant search clicks and visits from the guide to your service page" },
    { label: "Compare", query: "chatbot vs live chat for small business", intent: "Commercial intent", page: "An honest comparison", answer: "Explain strengths, limitations, handoffs and the situations where each approach makes sense.", next: "Explore AI chatbots", href: "/ai-chatbots", measure: "Engaged visits, service-page clicks and suitable product enquiries" },
    { label: "Act", query: "AI calling agent for appointment booking", intent: "Service intent", page: "A focused service page", answer: "Show the booking workflow, integrations, human handoff and how to request a demo.", next: "Explore calling agents", href: "/ai-calling-agents", measure: "Demo requests and qualified conversations from the service page" },
];

export default function MarketingKeywordPlan() {
    const [active, setActive] = useState(0);
    const prefix = useId();
    const tabs = useRef([]);
    const example = examples[active];
    function onKeyDown(event) {
        let next;
        if (event.key === "ArrowRight") next = (active + 1) % examples.length;
        else if (event.key === "ArrowLeft") next = (active + examples.length - 1) % examples.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = examples.length - 1;
        else return;
        event.preventDefault(); setActive(next); tabs.current[next]?.focus();
    }
    return (
        <section className="sx-section mk-keyword-section" id="keyword-strategy" aria-labelledby={`${prefix}-heading`}>
            <div className="sp-container sx-split">
                <div className="sx-section-heading"><p className="sp-eyebrow">From a keyword to a customer</p><h2 id={`${prefix}-heading`}>Don’t just find a term.<br /><span>Find its purpose.</span></h2><p>The best keyword plan starts with your offer and the questions customers ask. We group related searches, choose the right page for each topic and connect that page to a useful next step.</p><ul className="sx-checklist"><li><Check size={16} />Research the market, competitors and search intent</li><li><Check size={16} />Map topics to pages and avoid overlapping content</li><li><Check size={16} />Write clear answers with your expertise and evidence</li><li><Check size={16} />Review search clicks alongside enquiries and sales</li></ul><a className="sp-link" href="#audit">Build a plan for your website <ArrowUpRight size={17} /></a></div>
                <div className="mk-intent-board">
                    <div className="mk-intent-heading"><span>The customer’s question</span><span>Illustrative page map</span></div>
                    <div className="mk-intent-tabs" role="tablist" aria-label="Customer search intent">{examples.map((item, i) => <button key={item.label} ref={element => { tabs.current[i] = element; }} type="button" role="tab" id={`${prefix}-tab-${i}`} aria-selected={active === i} aria-controls={`${prefix}-panel`} tabIndex={active === i ? 0 : -1} onKeyDown={onKeyDown} onClick={() => setActive(i)}>{item.label}<ArrowRight size={13} aria-hidden="true" /></button>)}</div>
                    <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-tab-${active}`} tabIndex={0}>
                        <div className="mk-query"><Search size={19} aria-hidden="true" /><p>{example.query}</p></div>
                        <div className="mk-intent-connector"><span>{example.intent}</span><ArrowRight size={18} aria-hidden="true" /></div>
                        <div className="mk-answer"><FileText size={23} aria-hidden="true" /><h3>{example.page}</h3><p>{example.answer}</p><a href={example.href}>{example.next}<ArrowUpRight size={15} /></a></div>
                        <div className="mk-intent-measure"><span>What we review</span><p>{example.measure}</p></div>
                    </div>
                    <p className="sx-small-note">Example searches explain our approach; no search volumes or rankings are claimed.</p>
                </div>
            </div>
        </section>
    );
}
