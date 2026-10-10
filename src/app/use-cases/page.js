import React from "react";
import UseCasesClient from "@/components/use-cases-client";
import JsonLd from "@/components/JsonLd";
import { useCasesData } from "@/lib/use-cases-data";
import {
    canonicalUrl,
    createMetadata,
    generateBreadcrumbSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "Website, AI & Digital Marketing Use Cases | Syenxa Tech";
const description =
    "Explore 34 practical use cases for websites, AI calling agents, chatbots, digital marketing, workflow automation and web apps across your industry.";

export const metadata = createMetadata({
    title,
    description,
    path: "/use-cases",
    keywords: [
        "AI Voice Agent Use Cases",
        "AI Receptionist for Dental Clinics",
        "Real Estate AI Voice Agent",
        "Gym Membership AI Automation",
        "Salon Appointment AI Chatbot",
        "AI Calling Agent Industry Applications",
        "Website Development Use Cases",
        "Digital Marketing Use Cases",
        "Workflow Automation Use Cases",
        "Client Portals and Web Apps",
    ],
});

export default function UseCasesPage() {
    const schemas = [
        generateWebPageSchema({
            name: title,
            description,
            path: "/use-cases",
            type: "CollectionPage",
        }),
        generateBreadcrumbSchema([{ name: "Use Cases", path: "/use-cases" }]),
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Websites, AI, marketing and automation use cases",
            itemListElement: Object.values(useCasesData).map((data, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${data.title} ${data.accent}`,
                url: canonicalUrl(`/use-cases/${data.slug}`),
            })),
        },
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <UseCasesClient />
        </>
    );
}
