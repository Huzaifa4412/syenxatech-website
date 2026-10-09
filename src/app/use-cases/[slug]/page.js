import { notFound } from "next/navigation";
import { Check, Phone, MessageCircle } from "lucide-react";
import { useCasesData } from "@/lib/use-cases-data";
import { industryPresentation } from "@/lib/industry-presentation";
import PageHero from "@/components/interior/PageHero";
import PageClosing from "@/components/interior/PageClosing";
import Reveal from "@/components/home/Reveal";

const headlines = {
    doctor: { title: "A calmer front desk.", accent: "More time for patients." },
    "real-estate": { title: "More viewings.", accent: "Fewer missed leads." },
    gym: { title: "Focus on the floor.", accent: "We'll handle the phone." },
    "beauty-salon": { title: "Keep the chair booked.", accent: "Stay with your client." },
};

export default async function DetailPage({ params }) {
    const { slug } = await params;
    const data = useCasesData[slug];
    const niche = industryPresentation[slug];
    if (!data || !niche) notFound();

    return <main className="site-page sp-niche-page">
        <PageHero eyebrow={niche.linkLabel} {...headlines[slug]} description={data.hero.subtitle}
            image={{src:niche.image,alt:niche.imageAlt}} back={{href:"/use-cases",label:"All use cases"}}
            primary={{href:"/contact",label:"Book an industry demo"}} secondary={{href:"#solutions",label:"See what we handle"}}
            caption="Configured around your services, working hours and customer questions." />
        <section><div className="sp-container">
            <Reveal className="sp-content-header"><p className="sp-eyebrow">The everyday pressure</p><h2>When your team has<br />more than one job to do.</h2></Reveal>
            <div className="sp-challenges">{data.challenges.map(challenge => <div key={challenge}><Check size={18} aria-hidden="true" /><p>{challenge}</p></div>)}</div>
        </div></section>
        <section id="solutions"><div className="sp-container sp-solutions-grid">
            <Reveal className="sp-content-header"><p className="sp-eyebrow">What your agent can handle</p><h2>The useful details.<br />Taken care of.</h2><p>Your team sets the services, answers and handoff rules. The agent follows them across each customer conversation.</p></Reveal>
            <div className="sp-solutions-list">{data.solutions.map(solution => <Reveal as="article" key={solution.title} amount={0.1}><Check size={18} aria-hidden="true" /><div><h3>{solution.title}</h3><p>{solution.description}</p></div></Reveal>)}</div>
        </div></section>
        <section><div className="sp-container"><dl className="sp-niche-stats">{data.stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}<span>{stat.suffix}</span></dd></div>)}</dl></div></section>
        <section><div className="sp-container"><Reveal className="sp-case-study" amount={0.1}>
            <div><p className="sp-eyebrow">A workflow in practice</p><h2>{data.caseStudy.title}</h2><p className="sp-case-scenario">{data.caseStudy.scenario}</p><div className="sp-case-detail"><h3><Phone size={17} aria-hidden="true" />The challenge</h3><p>{data.caseStudy.challenge}</p></div><div className="sp-case-detail"><h3><MessageCircle size={17} aria-hidden="true" />The solution</h3><p>{data.caseStudy.solution}</p></div></div>
            <blockquote><p>{data.caseStudy.result}</p><cite>{data.caseStudy.title}</cite></blockquote>
        </Reveal></div></section>
        <PageClosing title="Make it work for your team." description={`Tell us how your ${niche.name.toLowerCase()} business handles calls and bookings today. We'll plan an agent around it.`} />
    </main>;
}
