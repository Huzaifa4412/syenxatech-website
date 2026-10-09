import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import AboutProcess from "./AboutProcess";
import PageClosing from "./PageClosing";
import { siteConfig } from "@/lib/seo";
import { industryPresentation } from "@/lib/industry-presentation";
import "./about-page.css";

const disciplines = [
    { name: "AI calling agents", line: "Keep the conversation moving.", description: "Answer enquiries, help with bookings and follow up around the way your team works.", href: "/ai-calling-agents", detail: "Voice · Booking · Follow-up" },
    { name: "AI chatbots", line: "A useful first answer.", description: "Help customers in their preferred channel, with your information and a clear path to a person.", href: "/ai-chatbots", detail: "Questions · Enquiries · Handoff" },
    { name: "Website development", line: "Make a good first visit.", description: "Custom websites that feel like your business and make the next step easy to find.", href: "/website-development", detail: "Design · Performance · Clarity" },
    { name: "Digital marketing & SEO", line: "Bring the right people closer.", description: "Connect search, useful content and campaigns to the conversations your business needs.", href: "/digital-marketing", detail: "Search · Content · Campaigns" },
];

const principles = [
    { title: "Your business comes first.", description: "We learn your services, hours, tone and tools. The system follows your working day.", note: "Built around your workflow" },
    { title: "Keep people in the picture.", description: "Automation handles the repeatable work. Clear handoff rules bring your team in when judgment matters.", note: "A person when it matters" },
    { title: "Make the work visible.", description: "Review working versions, ask questions and give feedback before the final handoff.", note: "A build you can review" },
    { title: "Agree what good looks like.", description: "Define the scope, price and support together. Look at useful outcomes: enquiries, bookings and time returned.", note: "A clear plan from the start" },
];

export default function AboutPage() {
    return <main className="site-page ap-page">
        <section className="sx-section ap-hero" aria-labelledby="about-heading">
            <div className="sp-container">
                <div className="ap-hero-top">
                    <Reveal className="ap-hero-copy" amount={0.1}><p className="sp-eyebrow">About Syenxa Tech</p><h1 id="about-heading">Built by people.<br /><span>For your business.</span></h1></Reveal>
                    <Reveal className="ap-hero-intro" delay={0.08} amount={0.1}><p>Good technology should leave more room for people. We build websites, conversations and connected systems that make the working day a little easier.</p><div className="sp-actions"><Link href="/contact" className="sp-button">Let’s talk about your business<ArrowUpRight size={17} aria-hidden="true" /></Link><a href="#who-we-are" className="sp-link">Get to know us<ArrowDown size={16} aria-hidden="true" /></a></div></Reveal>
                </div>
                <Reveal className="ap-hero-scene" delay={0.1} amount={0.1}><figure><Image src="/images/about-studio-v1.webp" alt="Conceptual studio still-life with an orange telephone, laptop and design sketches on a sunlit oak desk" fill priority sizes="(max-width:767px) 100vw, 1232px" /><figcaption><span>Thoughtful design. Useful automation.</span><span>Studio still-life / Our approach, pictured</span></figcaption></figure><div className="ap-photo-note"><span>Our starting point</span><p>How can we give your team<br />more time for people?</p></div></Reveal>
            </div>
        </section>

        <section id="who-we-are" className="sx-section ap-story" aria-labelledby="about-story-heading"><div className="sp-container ap-story-grid">
            <Reveal><p className="sp-eyebrow">The people behind the systems</p><h2 id="about-story-heading">Different skills.<br /><span>One practical purpose.</span></h2><div className="ap-team-disciplines"><span>Engineering</span><span>Design</span><span>Marketing</span></div></Reveal>
            <Reveal delay={0.05} className="ap-story-copy"><p className="ap-lead">We bring engineers, designers and marketers together around the everyday problems a business needs to solve.</p><p>Syenxa Tech has been building software since {siteConfig.foundingYear}. Our work spans AI calling agents, chatbots, websites and digital marketing for small and mid-sized businesses worldwide.</p><p>Sometimes the starting point is a missed enquiry. Sometimes it’s a website that no longer reflects the business. We connect the pieces around the people who use them.</p><dl className="ap-company-facts"><div><dt>Building software</dt><dd>Since {siteConfig.foundingYear}</dd></div><div><dt>Projects shipped worldwide</dt><dd>300+</dd></div></dl></Reveal>
        </div></section>

        <section id="mission" className="sx-section ap-mission" aria-labelledby="about-mission-heading"><div className="sp-container"><div className="ap-mission-inner"><div><p className="sp-eyebrow">What we’re here for</p><h2 id="about-mission-heading">Less busywork.<br />More business.<br /><span>More human.</span></h2></div><div className="ap-mission-copy"><p>Give smaller businesses useful sales and support systems, so their teams can focus on the customer in front of them.</p><p>We look for progress in answered calls, useful enquiries, booked appointments and time handed back to your team.</p><div className="ap-outcomes" aria-label="Outcomes we focus on"><span>Conversations answered</span><span>Next steps made clear</span><span>Time returned to your team</span></div></div></div></div></section>

        <section id="what-we-do" className="sx-section ap-services" aria-labelledby="about-services-heading"><div className="sp-container"><header className="ap-section-header"><div><p className="sp-eyebrow">What we bring to the table</p><h2 id="about-services-heading">Four disciplines.<br /><span>A connected experience.</span></h2></div><p>Your website, conversations and follow-up should feel like parts of the same business. We help them work together.</p></header><div className="ap-service-list">{disciplines.map((item, index) => <Reveal key={item.name} amount={0.15}><Link href={item.href} className="ap-service-row"><span className="ap-service-index">0{index + 1}</span><div className="ap-service-title"><span>{item.name}</span><h3>{item.line}</h3></div><div className="ap-service-description"><p>{item.description}</p><span>{item.detail}</span></div><ArrowUpRight size={25} aria-hidden="true" /></Link></Reveal>)}</div></div></section>

        <section id="why-choose-us" className="sx-section ap-principles" aria-labelledby="about-principles-heading"><div className="sp-container ap-principles-grid"><Reveal className="ap-principles-intro"><p className="sp-eyebrow">The way we think</p><h2 id="about-principles-heading">Good work starts<br />with a few<br /><span>simple principles.</span></h2><p>Useful technology feels natural in the business it’s built for. These are the things we keep coming back to.</p><Link href="/contact" className="sp-link">Bring us your challenge<ArrowUpRight size={17} aria-hidden="true" /></Link></Reveal><div className="ap-principles-list">{principles.map((item, index) => <Reveal as="article" key={item.title} delay={0.025 * index} amount={0.15}><span className="ap-principle-number">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p><span className="ap-principle-note"><Check size={13} aria-hidden="true" />{item.note}</span></div></Reveal>)}</div></div></section>

        <section id="how-we-work" className="sx-section ap-process" aria-labelledby="about-process-heading"><div className="sp-container"><header className="ap-section-header"><div><p className="sp-eyebrow">From first conversation to working system</p><h2 id="about-process-heading">A clear path.<br /><span>With you along the way.</span></h2></div><p>Explore the steps. You bring the business knowledge; we turn it into a plan, a working version and a clear handoff.</p></header><AboutProcess /></div></section>

        <section id="our-work" className="sx-section ap-work" aria-labelledby="about-work-heading"><div className="sp-container"><header className="ap-section-header"><div><p className="sp-eyebrow">A look at the work</p><h2 id="about-work-heading">Different businesses.<br /><span>Their own character.</span></h2></div><Link href="/website-development#portfolio" className="sp-link">Explore the portfolio<ArrowUpRight size={17} aria-hidden="true" /></Link></header><div className="ap-projects"><Reveal className="ap-project ap-project-large"><div className="ap-project-browser"><span aria-hidden="true">● ● ●</span><span>knittypetit.shop</span></div><ProjectScreenshot src="/website-portfolio/knittypetit.png" title="Knitty Petit" alt="Original Knitty Petit storefront website built by Syenxa Tech" sizes="(max-width:767px) 90vw, 690px" /><div className="ap-project-caption"><div><span>Design & development</span><h3>Knitty Petit</h3></div><p>A playful storefront for custom children’s sweaters.</p></div></Reveal><Reveal className="ap-project ap-project-small" delay={0.06}><div className="ap-project-browser"><span aria-hidden="true">● ● ●</span><span>Nature Tech</span></div><ProjectScreenshot src="/website-portfolio/naturetech.png" title="Nature Tech" alt="Original Nature Tech timber and clean-energy website built by Syenxa Tech" sizes="(max-width:767px) 90vw, 475px" /><div className="ap-project-caption"><div><span>Design & development</span><h3>Nature Tech</h3></div><p>A clear home for an industrial and clean-energy business.</p></div></Reveal></div><p className="ap-work-note">Original website projects by Syenxa Tech. Select a screenshot to take a closer look.</p></div></section>

        <section className="sx-section ap-industries" aria-labelledby="about-industries-heading"><div className="sp-container"><header className="ap-section-header"><div><p className="sp-eyebrow">Made for a real working day</p><h2 id="about-industries-heading">Built around<br /><span>businesses like yours.</span></h2></div><p>Different services, different hours, different customers. The approach stays personal to the business.</p></header><div className="ap-industry-grid">{Object.entries(industryPresentation).map(([slug, item], index) => <Reveal key={slug} delay={index * 0.025} amount={0.15}><Link href={`/use-cases/${slug}`} className="ap-industry-link"><div className="ap-industry-image"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width:767px) 45vw, 300px" /></div><span>{item.name}<ArrowUpRight size={17} aria-hidden="true" /></span></Link></Reveal>)}</div></div></section>

        <PageClosing title="Every good project starts with a conversation." description="Tell us what the working day looks like and what you’d like to make easier. We’ll help you find a practical place to start." label="Book a free consultation" />
    </main>;
}
