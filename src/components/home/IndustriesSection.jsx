import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCasesData } from "@/lib/use-cases-data";
import IndustryPanels from "./IndustryPanels";
import Reveal from "./Reveal";

const LABELS = {
    doctor: { name: "Clinics", headline: "A calmer front desk.", linkLabel: "AI receptionist for clinics", summary: "Help patients book, get answers and reach your team, including after hours." },
    "real-estate": { name: "Real estate", headline: "More viewings. Fewer missed leads.", linkLabel: "AI voice agent for real estate", summary: "Answer property enquiries, qualify buyers and arrange viewings while your agents are out showing homes." },
    gym: { name: "Gyms", headline: "Focus on the floor.", linkLabel: "AI automation for gyms", summary: "Handle membership questions, trial bookings and class enquiries while your trainers focus on their members." },
    "beauty-salon": { name: "Salons", headline: "Keep the chair booked.", linkLabel: "AI booking assistant for salons", summary: "Make bookings, answer service questions and follow up without interrupting the appointment in front of you." },
};

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
