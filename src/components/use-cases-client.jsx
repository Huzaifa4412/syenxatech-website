"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Globe2, MessageCircle, Phone, Search, Workflow, LayoutDashboard } from "lucide-react";
import { useCasesData, useCaseIndustries, useCaseServices } from "@/lib/use-cases-data";
import PageClosing from "@/components/interior/PageClosing";
import UseCaseVisual from "./use-case-visual";
import UseCaseTile from "./use-case-tile";
import "./use-cases.css";

const serviceGroups = useCaseServices.map(service => Object.values(useCasesData).filter(item => item.service === service.id));
// Mix services in the unfiltered library so its breadth is visible immediately.
const cases = Array.from({ length: Math.max(...serviceGroups.map(group => group.length)) }, (_, index) => serviceGroups.map(group => group[index]).filter(Boolean)).flat();
const icons = { voice: Phone, website: Globe2, chatbot: MessageCircle, marketing: Search, automation: Workflow, apps: LayoutDashboard };
const featured = [useCasesData["ecommerce-website"], useCasesData["social-messaging-chatbot"], useCasesData["lead-to-crm-automation"]];

export default function UseCasesClient() {
    const [active, setActive] = useState("all");
    const [query, setQuery] = useState("");
    const [industry, setIndustry] = useState("all");
    const filtered = useMemo(() => cases.filter(item => (active === "all" || item.service === active) && (industry === "all" || item.industry === industry) && `${item.title} ${item.accent} ${item.summary} ${item.industry} ${item.tags.join(" ")} ${useCaseServices.find(service => service.id === item.service).name}`.toLowerCase().includes(query.trim().toLowerCase())), [active, query, industry]);
    const reset = () => { setActive("all"); setQuery(""); setIndustry("all"); };
    return <main className="site-page uc-page">
        <section className="uc-hero"><div className="sp-container uc-hero-grid">
            <div className="uc-hero-copy"><p className="uc-eyebrow">The possibilities, made practical</p><h1>One business.<br /><span>So many ways<br />to move it forward.</span></h1><p>From the first website visit to the next customer conversation. Explore what better websites, AI and digital marketing can do for your everyday work.</p><a href="#use-case-library" className="sp-button">Find your use case <ArrowDown size={17} /></a><div className="uc-hero-facts"><span><strong>{cases.length}</strong> practical use cases</span><span><strong>{useCaseServices.length}</strong> connected services</span></div></div>
            <div className="uc-hero-art"><div className="uc-hero-main-photo"><Image src="/images/blog/website-design-v1.webp" alt="A carefully designed website on a laptop in a warm studio" fill priority sizes="(max-width:767px) 100vw, 55vw" /><div className="uc-photo-caption"><Globe2 size={18} /><div><strong>A better first impression.</strong><span>A website built to start the conversation.</span></div></div></div><div className="uc-hero-inset"><Image src="/images/home-chat-service-v1.webp" alt="Conceptual amber glass and cream speech bubbles illustrating customer conversations" fill sizes="(max-width:767px) 40vw, 220px" /></div><div className="uc-hero-route"><span><MessageCircle size={17} />Start a conversation</span><ArrowDown size={15} /><span><Workflow size={17} />Move the work forward</span><p>Website → enquiry → follow-up</p></div></div>
        </div></section>
        <section className="uc-section uc-featured"><div className="sp-container"><header className="uc-heading"><div><p className="uc-eyebrow">A good place to start</p><h2>Small friction.<br /><span>Big opportunity.</span></h2></div><p>A few ways to make the customer journey easier, and give your team more room to do its best work.</p></header><div className="uc-featured-grid">{featured.map((item, i) => <Link key={item.slug} href={`/use-cases/${item.slug}`} className={`uc-featured-item uc-featured-${i}`}><div><span className="uc-eyebrow">{useCaseServices.find(service => service.id === item.service).name}</span><ArrowUpRight size={21} /></div><h3>{item.title}<br /><span>{item.accent}</span></h3><UseCaseVisual data={item} compact /><p>{item.solutions[0].description}</p></Link>)}</div></div></section>
        <section id="use-case-library" className="uc-section uc-library" aria-labelledby="uc-library-heading"><div className="sp-container">
            <header className="uc-heading"><div><p className="uc-eyebrow">Explore the library</p><h2 id="uc-library-heading">Find the fit<br /><span>for your working day.</span></h2></div><p>Browse by service, choose your industry or search for the task you want to make easier.</p></header>
            <div className="uc-service-filters" role="group" aria-label="Filter by service"><button type="button" onClick={() => setActive("all")} aria-pressed={active === "all"}>All services <span>{cases.length}</span></button>{useCaseServices.map(service => { const Icon = icons[service.id]; return <button key={service.id} type="button" aria-pressed={active === service.id} onClick={() => setActive(service.id)}><Icon size={16} />{service.name}<span>{cases.filter(item => item.service === service.id).length}</span></button>; })}</div>
            <div className="uc-search-row"><label className="uc-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search use cases</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try ecommerce, booking, SEO or CRM…" /></label><label className="uc-industry-select"><span>Industry</span><select value={industry} onChange={event => setIndustry(event.target.value)}><option value="all">All industries</option>{useCaseIndustries.map(item => <option key={item}>{item}</option>)}</select></label></div>
            <div className="uc-results-meta"><p aria-live="polite" role="status">Showing {filtered.length} of {cases.length} use cases</p>{(active !== "all" || query || industry !== "all") && <button type="button" onClick={reset}>Clear filters</button>}<span>Explore ideas. Build your own fit.</span></div>
            {filtered.length ? <div className="uc-card-grid">{filtered.map(item => <UseCaseTile key={item.slug} data={item} />)}</div> : <div className="uc-empty"><Search size={30} /><h3>No matching use cases yet.</h3><p>Try a broader search or choose another service or industry.</p><button type="button" className="sp-button" onClick={reset}>Show all use cases</button></div>}
        </div></section>
        <section className="uc-section uc-connected"><div className="sp-container"><div><p className="uc-eyebrow">Better together</p><h2>A website brings them in.<br /><span>The rest keeps things moving.</span></h2><p>Start with the part that needs attention. Connect more services when it makes sense for your business.</p></div><ol className="uc-connected-path">{[["Be discovered", "Search, campaigns and useful content"], ["Make a good first impression", "A clear, fast website"], ["Start the conversation", "A chatbot, calling agent or enquiry form"], ["Follow through", "Booking, CRM and team workflows"]].map(([title, text], i) => <li key={title}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowDown size={17} /></li>)}</ol></div></section>
        <PageClosing title="Your next idea could start here." description="Tell us what slows your team down or where customers drop off. We'll suggest a practical starting point and a clear scope." label="Let's talk about your business" />
    </main>;
}
