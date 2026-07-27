import React from "react";
import AICallingAgentsClient from "@/components/ai-calling-agents-client";
import { aiCallingFaqs } from "@/lib/faqs";
import { createMetadata, generateFaqSchema, generateServiceSchema } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Voice Agents & Outbound AI Calling Solutions | Syenxa Tech",
    description:
        "Deploy custom AI voice agents for 24/7 outbound sales calls, inbound lead qualification, and instant appointment booking. Zero wait times, human-like voice AI.",
    path: "/ai-calling-agents",
    keywords: [
        "AI Voice Agent",
        "AI Calling Agent",
        "AI Outbound Calling Agent",
        "AI Call Center Voice Agent",
        "Voice AI for Sales",
        "AI Phone Agent",
        "Automated Sales Call Agent",
        "Appointment Booking AI Voice Agent"
    ],
});

export default function AICallingAgentsPage() {
    const faqSchema = generateFaqSchema(aiCallingFaqs);
    const serviceSchema = generateServiceSchema({
        name: "AI Calling Agents & Voice AI Solutions",
        description: "Autonomous AI voice agents for sales, lead qualification, and automated phone calls.",
        serviceType: "AI Voice Call Automation",
        url: "/ai-calling-agents",
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <AICallingAgentsClient />
        </>
    );
}
