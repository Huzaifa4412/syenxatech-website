import React from "react";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceList from "@/components/services/ServiceList";
import ProcessSection from "@/components/services/ProcessSection";
import StatsBand from "@/components/services/StatsBand";
import Contact from "@/components/form";
import Faqs from "@/components/faqs";
import JsonLd from "@/components/JsonLd";
import { homeFaqs } from "@/lib/faqs";
import {
    canonicalUrl,
    createMetadata,
    generateBreadcrumbSchema,
    generateFaqSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "AI Automation Services & Digital Solutions | Syenxa Tech";
const description =
    "Explore Syenxa Tech's AI automation services: custom AI voice agents, intelligent chatbots, Next.js web application development, and digital marketing with SEO.";

export const metadata = createMetadata({
    title,
    description,
    path: "/services",
    keywords: [
        "AI Automation Services",
        "Artificial Intelligence Automation Agency",
        "AI Integration Services",
        "AI Business Automation",
        "AI Voice Calling Agents",
        "Custom Web Development Agency",
    ],
});

const serviceItems = [
    { name: "AI Calling Agents", path: "/ai-calling-agents" },
    { name: "AI Chatbots", path: "/ai-chatbots" },
    { name: "Website Development", path: "/website-development" },
    { name: "Digital Marketing & SEO", path: "/digital-marketing" },
];

export default function ServicesPage() {
    const schemas = [
        generateWebPageSchema({
            name: title,
            description,
            path: "/services",
            type: "CollectionPage",
        }),
        generateBreadcrumbSchema([{ name: "Services", path: "/services" }]),
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Syenxa Tech services",
            itemListElement: serviceItems.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                url: canonicalUrl(item.path),
            })),
        },
        generateFaqSchema(homeFaqs),
    ];

    return (
        <main className="bg-[#faf9f7]">
            <JsonLd data={schemas} />
            <ServicesHero />
            <ServiceList />
            <ProcessSection />
            <StatsBand />
            <Contact />
            <div className="py-12">
                <Faqs />
            </div>
        </main>
    );
}
