import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, ArrowRight } from "lucide-react";
import { useCasesData, useCaseServices } from "@/lib/use-cases-data";
import PageClosing from "@/components/interior/PageClosing";
import UseCaseVisual from "@/components/use-case-visual";
import UseCaseJourney from "@/components/use-case-journey";
import UseCaseTile from "@/components/use-case-tile";
import "@/components/use-cases.css";

export default async function DetailPage({ params }) {
    const { slug } = await params;
    const data = useCasesData[slug];
    if (!Object.hasOwn(useCasesData, slug)) notFound();
    const service = useCaseServices.find(item => item.id === data.service);
    const related = Object.values(useCasesData).filter(item => item.slug !== slug).sort((a, b) => ((b.industry === data.industry ? 2 : 0) + (b.service === data.service ? 1 : 0)) - ((a.industry === data.industry ? 2 : 0) + (a.service === data.service ? 1 : 0))).slice(0, 3);

    return <main className="site-page uc-page uc-detail">
        <section className="uc-detail-hero"><div className="sp-container"><Link href="/use-cases" className="uc-back"><ArrowLeft size={15} />All use cases</Link><div className="uc-detail-hero-grid"><div><p className="uc-eyebrow">{service.name} <span>/</span> {data.industry}</p><h1>{data.title}<br /><span>{data.accent}</span></h1><p className="uc-detail-intro">{data.summary}</p><div className="sp-actions"><Link href="/contact" className="sp-button">Discuss this use case <ArrowUpRight size={17} /></Link><a href="#journey" className="sp-link">See how it works <ArrowDown size={15} /></a></div><div className="uc-detail-labels"><span>Built for {data.industry.toLowerCase()}</span><span>Tailored to your tools</span></div></div><UseCaseVisual data={data} /></div></div></section>
        <nav className="uc-detail-nav" aria-label="On this page"><div className="sp-container"><a href="#opportunity">The opportunity</a><a href="#journey">The journey</a><a href="#scope">What we build</a><a href="#success">Measuring success</a><a href="#related">More ideas <ArrowRight size={14} /></a></div></nav>
        <section id="opportunity" className="uc-section uc-opportunity"><div className="sp-container uc-opportunity-grid"><div className="uc-context-photo"><Image src={data.image} alt={data.imageAlt} fill sizes="(max-width:767px) 100vw, 45vw" /><span>{data.industry} / {service.promise}</span></div><div><p className="uc-eyebrow">The everyday opportunity</p><h2>Less friction.<br /><span>A better working day.</span></h2><p>{data.problem}</p><div className="uc-opportunity-outcome"><span>What a better flow looks like</span><p>{data.example.outcome}</p></div></div></div></section>
        <section id="journey" className="uc-section uc-journey"><div className="sp-container"><header className="uc-heading"><div><p className="uc-eyebrow">See it in practice</p><h2>A useful journey.<br /><span>From start to next step.</span></h2></div><p>Explore each stage of a possible implementation. The actual screens, answers and connections are shaped around your business.</p></header><UseCaseJourney data={data} /></div></section>
        <section id="scope" className="uc-section uc-scope"><div className="sp-container uc-scope-grid"><div><p className="uc-eyebrow">What we build around it</p><h2>The right foundations.<br /><span>The useful details.</span></h2><p>{service.setup}</p><Link href={service.href} className="sp-link">Explore {service.name.toLowerCase()} <ArrowUpRight size={17} /></Link></div><div className="uc-deliverables"><h3>Your starting scope</h3><ul>{service.deliverables.map(item => <li key={item}><Check size={17} /><span>{item}</span></li>)}</ul><div className="uc-specific-scope"><span>For this use case</span><p>{data.solutions.map(item => item.title).join(" · ")}</p></div><p className="uc-scope-note">We confirm the systems, permissions and exact deliverables before quoting.</p></div></div></section>
        <section id="success" className="uc-section uc-success"><div className="sp-container"><header className="uc-heading"><div><p className="uc-eyebrow">Measure what matters</p><h2>Useful progress.<br /><span>Visible to your team.</span></h2></div><p>Agree a starting baseline and track the measures that tell you whether the new experience is helping.</p></header><div className="uc-metric-grid">{data.metrics.map(item => <div key={item}><span className="uc-metric-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span><h3>{item}</h3><span>Track against your starting baseline <ArrowUpRight size={14} /></span></div>)}</div><div className="uc-detail-answer"><h3>{service.faq}</h3><p>{service.answer}</p></div></div></section>
        <section id="related" className="uc-section uc-related"><div className="sp-container"><header className="uc-heading"><div><p className="uc-eyebrow">Keep exploring</p><h2>Another way<br /><span>to move forward.</span></h2></div><Link href="/use-cases" className="sp-link">Browse all {Object.keys(useCasesData).length} use cases <ArrowUpRight size={17} /></Link></header><div className="uc-card-grid">{related.map(item => <UseCaseTile data={item} key={item.slug} />)}</div></div></section>
        <PageClosing title="Let's shape it around your business." description={`Tell us how you handle ${data.solutions[0].title.toLowerCase()} today. We'll map the workflow, agree the scope and give you a clear next step.`} label="Talk about this use case" />
    </main>;
}
