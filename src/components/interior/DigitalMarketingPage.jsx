import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Search, MousePointer2, MessageSquare, CalendarCheck, Check } from "lucide-react";
import PageHero from "./PageHero";
import MarketingServices from "./MarketingServices";
import ServiceFaq from "./ServiceFaq";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import SearchVisibilityMockup from "@/components/illustrations/SearchVisibilityMockup";
import ContactForm from "@/components/contact-form";
import { digitalMarketingFaqs } from "@/lib/faqs";
import { siteConfig } from "@/lib/seo";
import "./service-pages.css";

export default function DigitalMarketingPage() {
    return (
        <main className="site-page sx-marketing-page">
            <PageHero eyebrow="Digital marketing & SEO" title="Be found." accent="Be the next call."
                description="Build a clear path from search and social to an enquiry. We bring SEO, useful content, paid campaigns and lead follow-up together around your business."
                primary={{ href: "#audit", label: "Get a free SEO audit" }} secondary={{ href: "#seo-services", label: "Explore the approach" }}
                visual={<div className="sx-marketing-hero-art"><div className="sx-preview-top"><Search size={16} /> Meet your next customer <span>Search + AI</span></div><SearchVisibilityMockup /></div>}
                caption="Illustrative search and AI results. Rankings and citations are not guaranteed."
                facts={[{ label: "Start with", value: "A clear roadmap" }, { label: "Connect", value: "Search to enquiry" }, { label: "Measure", value: "Useful outcomes" }]} />
            <div className="sx-discipline-strip sp-container" aria-label="Connected marketing services">{["Search visibility", "Content with purpose", "Paid acquisition", "Lead follow-up"].map(text => <span key={text}><Check size={15} />{text}</span>)}</div>
            <MarketingServices />
            <section className="sx-section sx-journey-section" id="marketing-automation">
                <div className="sp-container">
                    <div className="sx-heading-row"><div className="sx-section-heading"><p className="sp-eyebrow">From first search to next appointment</p><h2>Make the whole<br /><span>journey work.</span></h2></div><p>A good campaign does more than bring traffic. It makes every next step clear, from the first visit to the conversation with your team.</p></div>
                    <div className="sx-customer-journey">{[
                        { icon: Search, title: "Get discovered", text: "A service search, a helpful article or a relevant ad puts your business in view." },
                        { icon: MousePointer2, title: "Make it clear", text: "A focused landing page explains the offer and answers the important questions." },
                        { icon: MessageSquare, title: "Start talking", text: "A chatbot or calling agent captures details and helps qualify the enquiry." },
                        { icon: CalendarCheck, title: "Take the next step", text: "A booking, a quote request or a team handoff moves the conversation forward." },
                    ].map((step, i) => <article key={step.title}><div className="sx-journey-icon"><step.icon size={23} strokeWidth={1.6} /><span>0{i + 1}</span></div><h3>{step.title}</h3><p>{step.text}</p>{i < 3 && <ArrowRight className="sx-journey-arrow" size={20} aria-hidden="true" />}</article>)}</div>
                    <div className="sx-related-links"><Link href="/website-development">The landing page <ArrowUpRight size={16} /></Link><Link href="/ai-chatbots">The conversation <ArrowUpRight size={16} /></Link><Link href="/ai-calling-agents">The follow-up call <ArrowUpRight size={16} /></Link></div>
                </div>
            </section>
            <section className="sx-section sx-landing-section" id="paid-acquisition">
                <div className="sp-container sx-split">
                    <div className="sx-project-stage"><div className="sx-preview-top"><span className="sx-window-dots" aria-hidden="true">● ● ●</span> A real Syenxa Tech build</div><ProjectScreenshot src="/website-portfolio/knittypetit.png" title="Knitty Petit" alt="Knitty Petit storefront built by Syenxa Tech" sizes="(max-width: 767px) 90vw, 600px" /><p>Knitty Petit · Original storefront design and development.</p></div>
                    <div className="sx-section-heading"><p className="sp-eyebrow">The page is part of the campaign</p><h2>A click deserves<br /><span>a good landing.</span></h2><p>Fast, focused pages help people understand your offer. We can build or improve the landing experience alongside your campaigns, rather than send paid traffic to a page that leaves people guessing.</p><ul className="sx-checklist"><li><Check size={16} />A clear offer and one primary next step</li><li><Check size={16} />Mobile layouts and fast-loading media</li><li><Check size={16} />Search-ready structure and relevant answers</li><li><Check size={16} />Enquiry capture connected to your team</li></ul><Link className="sp-link" href="/website-development">Explore our website work <ArrowUpRight size={17} /></Link></div>
                </div>
            </section>
            <section className="sx-section" id="reporting">
                <div className="sp-container sx-split">
                    <div className="sx-section-heading"><p className="sp-eyebrow">A report you can use</p><h2>Know what brought<br /><span>the enquiry.</span></h2><p>See which channels create conversations and where customers drop off. Rankings and traffic add context; enquiries, lead quality and booked appointments tell us what to improve next.</p><p className="sx-small-note">Tracking is configured around the tools, consent choices and customer journey in your business.</p></div>
                    <div className="sx-report-board"><div className="sx-preview-top">Your monthly review <span>What we track</span></div><div className="sx-report-summary"><span>What changed?</span><strong>Visibility → enquiries → bookings</strong><p>A clear view of the journey, without a wall of charts.</p></div>{[{ name: "Organic search", detail: "Service pages, search queries and enquiries" }, { name: "Paid campaigns", detail: "Spend, conversions and cost per lead" }, { name: "Follow-up", detail: "Qualified conversations and booked appointments" }].map(item => <div className="sx-report-row" key={item.name}><span className="sx-report-dot" /><div><strong>{item.name}</strong><p>{item.detail}</p></div><ArrowUpRight size={17} /></div>)}<div className="sx-report-next"><Check size={16} />Next month’s priorities, tied to what we learned.</div></div>
                </div>
            </section>
            <section className="sx-section sx-process-section" id="process">
                <div className="sp-container"><div className="sx-section-heading"><p className="sp-eyebrow">A practical start</p><h2>Clarity first.<br /><span>Then steady progress.</span></h2></div><ol className="sx-process-grid">{[
                    { when: "Week 1", title: "Audit & roadmap", text: "Review technical health, your market and your current lead journey. Agree the priorities in a 90-day plan." },
                    { when: "Weeks 2–4", title: "Fix the foundation", text: "Improve indexing, speed, page structure and lead capture before expanding the campaign." },
                    { when: "Ongoing", title: "Publish, test & refine", text: "Build useful content, run the right campaigns and review lead quality together each month." },
                ].map((item, i) => <li key={item.title}><span className="sx-process-number">0{i + 1}</span><p className="sp-eyebrow">{item.when}</p><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></div>
            </section>
            <ServiceFaq faqs={digitalMarketingFaqs} title="Search, campaigns and the details." description="A few answers about the work, the channels and what progress can look like." />
            <section id="audit" className="sx-section sx-audit-section">
                <div className="sp-container"><div className="sx-audit-layout"><div className="sx-audit-copy"><p className="sp-eyebrow">Start with your website</p><h2>Let’s find your<br /><span>next opportunity.</span></h2><p>Tell us about your business and include your website URL in the message. We’ll review where you stand and send back a practical list of priorities.</p><ul className="sx-checklist"><li><Check size={16} />Technical and search visibility gaps</li><li><Check size={16} />Pages and questions worth focusing on</li><li><Check size={16} />A clear next step for your business</li></ul><div className="sx-audit-photo"><Image src="/images/home-reception-v1.webp" alt="Sunlit business reception with an orange telephone" fill sizes="(max-width: 767px) 90vw, 500px" /></div></div><div className="sx-audit-form"><h3>Request your free audit.</h3><p>A little context helps us make it useful.</p><ContactForm fallbackEmail={siteConfig.email} serviceOptions={["Digital marketing & SEO", "SEO audit", "Paid campaigns", "Marketing automation"]} messageLabel="Website URL & marketing goals" messagePlaceholder="Your website, the services you want to grow and what you would like to improve." /></div></div></div>
            </section>
        </main>
    );
}
