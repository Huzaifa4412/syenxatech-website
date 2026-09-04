import React from "react";
import AICallingAgentsClient from "@/components/ai-calling-agents-client";
import JsonLd from "@/components/JsonLd";
import { aiCallingFaqs } from "@/lib/faqs";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateFaqSchema,
    generateServiceSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "AI Calling Agents for US Businesses | Voice AI | Syenxa Tech";
const description =
    "Custom AI calling agents for US businesses: 24/7 inbound and outbound calls, lead qualification, appointment booking, CRM sync and TCPA-compliant setup.";

export const metadata = createMetadata({
    title,
    description,
    path: "/ai-calling-agents",
    image: "/covers/ai-calling-agents.jpg",
    imageAlt: "AI calling agents for US businesses by Syenxa Tech",
    keywords: [
        "AI Calling Agent",
        "AI Voice Agent",
        "AI Outbound Calling Agent",
        "AI Call Center Voice Agent",
        "Voice AI for Sales",
        "AI Phone Agent",
        "AI Appointment Setter",
        "AI Receptionist",
        "AI Calling Agents USA",
        "AI Answering Service for Small Business",
    ],
});

export default function AICallingAgentsPage() {
    const schemas = [
        generateWebPageSchema({ name: title, description, path: "/ai-calling-agents" }),
        generateBreadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "AI Calling Agents", path: "/ai-calling-agents" },
        ]),
        generateServiceSchema({
            name: "AI Calling Agents & Voice AI Solutions",
            description:
                "Custom AI voice agents for US businesses: inbound and outbound sales calls, lead qualification, appointment booking and customer support, integrated with your CRM and calendar and configured for TCPA compliance.",
            serviceType: "AI Voice Call Automation",
            url: "/ai-calling-agents",
            audience: "Small and mid-sized businesses",
            offers: {
                priceCurrency: "USD",
                description: "Custom setup fee plus usage-based pricing. Free consultation and live demo.",
            },
        }),
        generateFaqSchema(aiCallingFaqs),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <AICallingAgentsClient />
        </>
    );
}
