import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCasesData } from "@/lib/use-cases-data";
import { industryPresentation } from "@/lib/industry-presentation";
import PageHero from "@/components/interior/PageHero";
import PageClosing from "@/components/interior/PageClosing";
import Reveal from "@/components/home/Reveal";

export default function UseCasesClient() {
    return <main className="site-page">
        <PageHero eyebrow="Built for your industry" title="Different businesses." accent="The right fit for yours." description="Your services, your opening hours and your customers. Explore how calling agents and chatbots can fit into the way your business works." />
        <section><div className="sp-container"><div className="sp-industry-grid">
            {Object.values(useCasesData).map(data => { const niche = industryPresentation[data.slug]; return <Reveal as="article" key={data.slug} amount={0.1}>
                <Link href={`/use-cases/${data.slug}`} className="sp-industry-card">
                    <div className="sp-industry-card-image"><Image src={niche.image} alt={niche.imageAlt} fill sizes="(max-width:767px) 100vw, 600px" /></div>
                    <div className="sp-industry-card-copy"><p className="sp-eyebrow">{niche.name}</p><h2>{niche.headline}<ArrowUpRight size={22} aria-hidden="true" /></h2><p>{niche.summary}</p><p className="sp-caption">{niche.linkLabel}</p></div>
                </Link>
            </Reveal>; })}
        </div></div></section>
        <PageClosing title="Your industry isn't here?" description="Tell us how your business works. We'll help you choose an agent, chatbot or website that fits." label="Talk to our team" />
    </main>;
}
