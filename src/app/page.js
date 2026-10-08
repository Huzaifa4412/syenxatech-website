import Faqs from "@/components/faqs";
import HomeContact from "@/components/home/HomeContact";
import JsonLd from "@/components/JsonLd";
import AboutStatement from "@/components/home/AboutStatement";
import CoverageComparison from "@/components/home/CoverageComparison";
import DemoSection from "@/components/home/DemoSection";
import FactStrip from "@/components/home/FactStrip";
import HomeHero from "@/components/home/HomeHero";
import IndustriesSection from "@/components/home/IndustriesSection";
import MissedCallsSection from "@/components/home/MissedCallsSection";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import ServicesBento from "@/components/home/ServicesBento";
import WorkRail from "@/components/home/WorkRail";
import { homeFaqs } from "@/lib/faqs";
import "@/components/home/home-page.css";
import {
    createMetadata,
    generateFaqSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "AI Calling Agents & AI Automation Agency | Syenxa Tech";
const description =
    "Syenxa Tech is an AI automation agency building custom AI calling agents, voice AI for sales, AI chatbots and fast Next.js websites that grow your business.";

export const metadata = createMetadata({
    title,
    description,
    path: "/",
    keywords: [
        "AI Automation Agency",
        "AI Calling Agents",
        "AI Voice Agent for Sales",
        "Custom Website Development Company",
        "AI Chatbot Solutions",
        "AI Business Automation",
        "AI Call Center Voice Agent",
    ],
});

export default function Home() {
    return (
        <>
            <JsonLd
                data={[
                    generateWebPageSchema({ name: title, description, path: "/" }),
                    generateFaqSchema(homeFaqs),
                ]}
            />
            <main className="home-page">
                <HomeHero />
                <FactStrip />
                <ServicesBento />
                <DemoSection />
                <IndustriesSection />
                <MissedCallsSection />
                <CoverageComparison />
                <WorkRail />
                <ProcessTimeline />
                <AboutStatement />
                <Faqs title="Good questions. Clear answers." intro="Pricing, timelines and how it all works. Everything you need before your first conversation with us." />
                <HomeContact />
            </main>
        </>
    );
}
