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

const title = "AI Voice Agent & Chatbot Use Cases by Industry | Syenxa Tech";
const description =
    "See how Syenxa Tech AI calling agents and chatbots handle bookings, lead qualification and support for healthcare clinics, real estate agencies, gyms and salons.";

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
            name: "AI automation use cases by industry",
            itemListElement: Object.values(useCasesData).map((data, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: data.seo.industry,
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
