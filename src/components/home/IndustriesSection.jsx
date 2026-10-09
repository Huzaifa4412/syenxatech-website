import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCasesData } from "@/lib/use-cases-data";
import IndustryPanels from "./IndustryPanels";
import Reveal from "./Reveal";

import { industryPresentation as LABELS } from "@/lib/industry-presentation";

const industries = Object.values(useCasesData)
    .filter((useCase) => LABELS[useCase.slug])
    .map((useCase) => ({
        slug: useCase.slug, ...LABELS[useCase.slug],
        solutions: useCase.solutions.slice(0, 4).map((solution) => solution.title),
    }));

export default function IndustriesSection() {
    return (
        <section id="industries" aria-labelledby="industries-heading" className="hp-section hp-industries">
            <div className="hp-container">
                <Reveal className="hp-section-heading">
                    <h2 id="industries-heading">Your business has a rhythm.<br /><span>We work with it.</span></h2>
                    <p>Built around your services, hours and customers. Never a one-size-fits-all script.</p>
                </Reveal>
                <Reveal className="hp-industry-stage" amount={0.15}>
                    <IndustryPanels industries={industries} />
                </Reveal>
                <Link href="/use-cases" className="hp-text-link hp-industry-all">Explore all use cases <ArrowUpRight size={18} /></Link>
            </div>
        </section>
    );
}
