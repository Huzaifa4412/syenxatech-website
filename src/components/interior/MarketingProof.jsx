import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Download, FileText } from "lucide-react";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import Reveal from "@/components/home/Reveal";

export function MarketingPortfolio() {
    return <section className="sx-section mk-portfolio" id="marketing-work" aria-labelledby="marketing-work-heading"><div className="sp-container">
        <div className="sx-heading-row"><div className="sx-section-heading"><p className="sp-eyebrow">The website is part of the marketing</p><h2 id="marketing-work-heading">Work you can open.<br /><span>Details you can see.</span></h2></div><p>Original websites from our portfolio. Explore how the offer, visual identity and next step come together for different kinds of businesses.</p></div>
        <div className="mk-portfolio-grid">
            <Reveal as="article" className="mk-portfolio-item"><div className="mk-portfolio-frame"><div className="mk-project-top"><span>01 / E-commerce</span><span>Original website build</span></div><ProjectScreenshot src="/website-portfolio/knittypetit.png" title="Knitty Petit" alt="Knitty Petit storefront designed and developed by Syenxa Tech" sizes="(max-width:767px) 88vw, 710px" /></div><div className="mk-portfolio-caption"><h3>Knitty Petit</h3><span>Make the product the story.</span></div><p>A product-led storefront with a clear description of the offer and a direct route to explore custom pieces.</p><div className="mk-project-details"><span>Product presentation</span><span>Visual identity</span><span>Shopping journey</span></div></Reveal>
            <Reveal as="article" className="mk-portfolio-item" delay={0.08}><div className="mk-portfolio-frame"><div className="mk-project-top"><span>02 / Industry & energy</span><span>Original website build</span></div><ProjectScreenshot src="/website-portfolio/naturetech.png" title="Nature Tech" alt="Nature Tech industrial products website designed and developed by Syenxa Tech" sizes="(max-width:767px) 88vw, 470px" /></div><div className="mk-portfolio-caption"><h3>Nature Tech</h3><span>Make a complex offer clearer.</span></div><p>A distinct industrial identity, product navigation and a prominent route to request a quote.</p><div className="mk-project-details"><span>Offer clarity</span><span>Product navigation</span><span>Quote enquiry</span></div></Reveal>
        </div>
        <div className="mk-portfolio-footer"><p>Website design and development examples. These show the craft behind the customer experience.</p><Link href="/website-development">Explore more of our work <ArrowUpRight size={16} /></Link></div>
    </div></section>;
}

export function MarketingDeliverables() {
    return <section className="sx-section mk-deliverables" id="deliverables" aria-labelledby="marketing-deliverables-heading"><div className="sp-container sx-split">
        <div className="mk-document-stage"><div className="mk-document-back" aria-hidden="true" /><a className="mk-document-cover" href="/downloads/syenxa-sample-marketing-action-plan.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open the sample marketing action plan PDF"><Image src="/images/marketing/sample-action-plan-preview.webp" alt="Actual cover of Syenxa’s downloadable sample marketing action plan, showing audit priorities and a 90-day roadmap" width={1191} height={1684} sizes="(max-width:767px) 80vw, 420px" /><span><FileText size={15} />Open the sample PDF <ArrowUpRight size={16} /></span></a><div className="mk-document-tag"><span>Something you can use.</span><strong>Priorities. Owners.<br />Next steps.</strong></div></div>
        <div className="sx-section-heading"><p className="sp-eyebrow">What the work leaves you with</p><h2 id="marketing-deliverables-heading">A plan in your hands.<br /><span>Not just a presentation.</span></h2><p>You should know what is being worked on, why it matters and what comes next. Our sample plan shows how an audit becomes a practical sequence of actions.</p><ul className="sx-checklist"><li><Check size={16} />A prioritized audit and action list</li><li><Check size={16} />A page map and content direction</li><li><Check size={16} />An agreed scope and review points</li><li><Check size={16} />A reporting baseline and next priorities</li></ul><a className="sp-button" href="/downloads/syenxa-sample-marketing-action-plan.pdf" download>Download the sample plan <Download size={17} /></a><p className="sx-small-note">Example engagement · 2-page PDF · Prepared to explain our approach. Your plan follows your business and agreed scope.</p></div>
    </div></section>;
}

export function MarketingCommitments() {
    return <section className="sx-section mk-commitments" aria-labelledby="marketing-commitments-heading"><div className="sp-container">
        <div className="sx-heading-row"><div className="sx-section-heading"><p className="sp-eyebrow">A clear working relationship</p><h2 id="marketing-commitments-heading">Know what you’re getting.<br /><span>Know where things stand.</span></h2></div><p>Clear expectations are part of good marketing. We agree the work, keep it reviewable and connect reporting to decisions.</p></div>
        <div className="mk-commitment-grid">{[
            { n: "01", title: "Scope before spend", text: "Agree the services, deliverables and priorities before production. Media spend is separate from service fees." },
            { n: "02", title: "Work you can review", text: "See the proposed content, pages or campaign assets. Check the business details before the agreed work goes live." },
            { n: "03", title: "Reporting with context", text: "Review comparable periods, relevant enquiries and clear next actions. Distinguish modeled traffic from your own analytics." },
        ].map(item => <article key={item.n}><span>{item.n}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </div></section>;
}
