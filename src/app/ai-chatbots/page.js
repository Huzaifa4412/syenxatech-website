import React from "react";
import AIChatbotsClient from "@/components/ai-chatbots-client";
import JsonLd from "@/components/JsonLd";
import { aiChatbotFaqs } from "@/lib/faqs";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateFaqSchema,
    generateServiceSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "AI Chatbots for WhatsApp, Instagram & Websites | Syenxa Tech";
const description =
    "Custom AI chatbots for 24/7 customer support and lead capture on WhatsApp, Instagram DMs, Messenger, TikTok and your website. One-time setup, 7-day free trial.";

export const metadata = createMetadata({
    title,
    description,
    path: "/ai-chatbots",
    keywords: [
        "AI Chatbot Development",
        "AI Customer Support Chatbot",
        "Custom AI Chatbot Solutions",
        "WhatsApp AI Chatbot",
        "Instagram DM Automation Chatbot",
        "AI Sales Chatbot",
        "Omnichannel AI Chatbot",
    ],
});

export default function AIChatbotsPage() {
    const schemas = [
        generateWebPageSchema({ name: title, description, path: "/ai-chatbots" }),
        generateBreadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "AI Chatbots", path: "/ai-chatbots" },
        ]),
        generateServiceSchema({
            name: "AI Chatbot Development & Automation",
            description:
                "Custom AI chatbots for 24/7 customer service, lead qualification and sales across WhatsApp, Instagram, Messenger, TikTok and websites.",
            serviceType: "AI Chatbot Solutions",
            url: "/ai-chatbots",
            audience: "Small and mid-sized businesses",
            offers: {
                priceCurrency: "USD",
                price: "150",
                description: "One-time setup from $150 to $350 USD, no monthly fee, 7-day free trial.",
            },
        }),
        generateFaqSchema(aiChatbotFaqs),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <AIChatbotsClient />
        </>
    );
}
