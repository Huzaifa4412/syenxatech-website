import React from "react";
import AIChatbotsClient from "@/components/ai-chatbots-client";
import { aiChatbotFaqs } from "@/lib/faqs";
import { createMetadata, generateFaqSchema, generateServiceSchema } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Chatbot Development & Support Solutions | Syenxa Tech",
    description:
        "Syenxa Tech builds custom AI chatbots for automated 24/7 customer support, lead qualification, and social sales across WhatsApp, Instagram, and web.",
    path: "/ai-chatbots",
    keywords: [
        "AI Chatbot Development",
        "AI Customer Support Chatbot",
        "Custom AI Chatbot Solutions",
        "WhatsApp AI Chatbot",
        "Instagram DM Automation Chatbot",
        "AI Sales Chatbot",
        "Omnichannel AI Chatbot"
    ],
});

export default function AIChatbotsPage() {
    const faqSchema = generateFaqSchema(aiChatbotFaqs);
    const serviceSchema = generateServiceSchema({
        name: "AI Chatbot Development & Automation",
        description: "Custom AI chatbots for 24/7 customer service, lead qualification, and social channel integration.",
        serviceType: "AI Chatbot Solutions",
        url: "/ai-chatbots",
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
            <AIChatbotsClient />
        </>
    );
}
