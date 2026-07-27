import React from "react";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceList from "@/components/services/ServiceList";
import ProcessSection from "@/components/services/ProcessSection";
import Contact from "@/components/form";
import Faqs from "@/components/faqs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Automation Services & Digital Solutions | Syenxa Tech",
    description:
        "Explore Syenxa Tech's AI automation services: custom AI voice agents, intelligent chatbots, Next.js web application development, and mobile apps.",
    path: "/services",
    keywords: [
        "AI Automation Services",
        "Artificial Intelligence Automation Agency",
        "AI Integration Services",
        "AI Business Automation",
        "AI Voice Calling Agents",
        "Custom Web Development Agency"
    ],
});

export default function ServicesPage() {
    return (
        <main className="bg-black">
            <ServicesHero />
            <ServiceList />
            <ProcessSection />
            <Contact />
            <div className="py-12">
                <Faqs />
            </div>
        </main>
    );
}
