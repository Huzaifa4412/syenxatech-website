"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, FileText, Search, Layers, PencilRuler, MessageSquare } from "lucide-react";
import ProjectScreenshot from "@/components/ProjectScreenshot";

const stages = [
    { name: "Discover", icon: Search, title: "Start with what is actually happening.", text: "We look at your website, offer, audience and current enquiry journey. The first conversation sets the context; the audit turns it into a list of decisions.", deliverable: "An audit with priorities and reasons", checks: ["Which pages can search engines reach?", "Does the offer answer the customer’s question?", "Can a visitor easily enquire on a phone?"], ownership: "You share your goals and available data. We identify the gaps and explain the priorities." },
    { name: "Plan", icon: Layers, title: "Give every page and channel a job.", text: "We agree the scope before production. Search topics, page improvements, campaigns and follow-up all connect to the services you want to grow.", deliverable: "A page map, content plan and agreed scope", checks: ["Choose the offer and audience", "Map useful topics to the right pages", "Agree the next step and how it is measured"], ownership: "We propose the roadmap. You confirm the business details, priorities and scope." },
    { name: "Create", icon: PencilRuler, title: "Turn the plan into work you can review.", text: "You see the pages, content or campaign assets before they go live. We connect the experience to a clear action, then check the agreed journey.", deliverable: "Reviewable pages, content or campaign assets", checks: ["Make the offer and next step clear", "Check the mobile experience", "Review content, tracking and handoff"], ownership: "We prepare and check the work. You review the offer and approve the agreed assets." },
    { name: "Improve", icon: MessageSquare, title: "Leave every review with a next step.", text: "A review connects search and website activity with the enquiries your team receives. We explain what changed, what is still uncertain and what deserves attention next.", deliverable: "A review note and next action list", checks: ["Compare the agreed reporting period", "Review enquiries and lead quality", "Choose the next changes and experiments"], ownership: "We bring the reporting context. Your team helps us understand which enquiries were useful." },
];

function Workspace({ active }) {
    if (active === 0) return <div className="mk-audit-sheet"><div className="mk-paper-header"><span>01 / Discovery notes</span><FileText size={18} /></div><h4>Look before<br />you recommend.</h4><div className="mk-audit-route"><span>Search</span><ArrowRight size={14} /><span>Your page</span><ArrowRight size={14} /><span>Enquiry</span></div>{[{ label: "Search foundations", text: "Crawlability, indexing and page structure" }, { label: "The customer’s experience", text: "Offer, answers, mobile layout and next step" }, { label: "The business outcome", text: "Lead capture, handoff and available tracking" }].map((item, i) => <div className="mk-audit-line" key={item.label}><span>0{i + 1}</span><div><strong>{item.label}</strong><p>{item.text}</p></div><Search size={15} /></div>)}<div className="mk-paper-foot">Output: a prioritized action list, with reasons.</div></div>;
    if (active === 1) return <div className="mk-strategy-sheet"><div className="mk-paper-header"><span>02 / The page map</span><Layers size={18} /></div><h4>One offer.<br />Connected answers.</h4><div className="mk-strategy-core"><span>Service page</span><strong>Who you help.<br />How you help.</strong></div><div className="mk-strategy-branches">{["A buying guide", "Useful FAQs", "A comparison"].map(item => <div key={item}><FileText size={17} /><span>{item}</span></div>)}</div><div className="mk-strategy-next"><ArrowRight size={16} /><span>One clear enquiry or booking action</span></div><div className="mk-paper-foot">Output: a keyword map and content brief.</div></div>;
    if (active === 2) return <div className="mk-build-sheet"><div className="mk-paper-header"><span>03 / The experience</span><PencilRuler size={18} /></div><div className="mk-build-screenshot"><ProjectScreenshot src="/website-portfolio/knittypetit.png" title="Knitty Petit" alt="Original Knitty Petit storefront from Syenxa Tech’s website portfolio" sizes="(max-width:767px) 85vw, 560px" /></div><div className="mk-build-notes"><span><Check size={14} />A specific offer</span><span><Check size={14} />A visible next step</span><span><Check size={14} />A product-led layout</span></div><div className="mk-paper-foot">Real website portfolio: Knitty Petit. Design and development example.</div></div>;
    return <div className="mk-review-sheet"><div className="mk-paper-header"><span>04 / The decision note</span><MessageSquare size={18} /></div><h4>What changed?<br />What happens next?</h4><div className="mk-review-sources"><span>Search Console</span><span>GA4</span><span>Lead feedback</span></div>{[{ label: "Observe", text: "Which pages and channels brought relevant activity?" }, { label: "Understand", text: "Which enquiries matched the business and offer?" }, { label: "Decide", text: "What should we improve, test or investigate next?" }].map((item, i) => <div className="mk-review-line" key={item.label}><span>0{i + 1}</span><div><strong>{item.label}</strong><p>{item.text}</p></div></div>)}<div className="mk-paper-foot">Output: a review summary and the next priorities.</div></div>;
}

export default function MarketingWorkflow() {
    const [active, setActive] = useState(0);
    const prefix = useId();
    const tabs = useRef([]);
    const stage = stages[active];
    function onKeyDown(event) {
        let next;
        if (event.key === "ArrowRight") next = (active + 1) % stages.length;
        else if (event.key === "ArrowLeft") next = (active + stages.length - 1) % stages.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = stages.length - 1;
        else return;
        event.preventDefault(); setActive(next); tabs.current[next]?.focus();
    }
    return <section className="sx-section mk-workflow" id="process" aria-labelledby={`${prefix}-heading`}>
        <div className="sp-container">
            <div className="sx-heading-row"><div className="sx-section-heading"><p className="sp-eyebrow">How we work, made visible</p><h2 id={`${prefix}-heading`}>See the thinking.<br /><span>See the work.</span></h2></div><p>A clear process should leave you with something useful at every stage. Explore the decisions, the work and what your team receives.</p></div>
            <div className="mk-workflow-tabs" role="tablist" aria-label="Our marketing delivery process">{stages.map((item, i) => <button ref={element => { tabs.current[i] = element; }} key={item.name} type="button" role="tab" id={`${prefix}-tab-${i}`} aria-controls={`${prefix}-panel`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={onKeyDown}><span>0{i + 1}</span><item.icon size={19} strokeWidth={1.6} /><strong>{item.name}</strong><ArrowRight size={16} /></button>)}</div>
            <div className="mk-workflow-panel" role="tabpanel" id={`${prefix}-panel`} aria-labelledby={`${prefix}-tab-${active}`} tabIndex={0}>
                <div className="mk-workflow-copy"><p className="sp-eyebrow">0{active + 1} / {stage.name}</p><h3>{stage.title}</h3><p>{stage.text}</p><ul className="sx-checklist">{stage.checks.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul><div className="mk-handoff"><span>You receive</span><strong>{stage.deliverable}</strong><p>{stage.ownership}</p></div></div>
                <div className="mk-workspace"><div className="mk-workspace-label"><span>Syenxa / delivery desk</span><span>{active === 2 ? "Portfolio example" : "Process illustration"}</span></div><Workspace active={active} /></div>
            </div>
            <div className="mk-workflow-bottom"><p>Scope and deliverables are agreed for your business before production.</p><a href="#deliverables">Explore a sample action plan <ArrowUpRight size={15} /></a></div>
        </div>
    </section>;
}
