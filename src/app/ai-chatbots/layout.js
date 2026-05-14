import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Chatbots for WhatsApp, Web & Social | Syenxa Tech",
    description:
        "Launch AI chatbots for website, WhatsApp, Instagram, Messenger, and TikTok to capture leads and deliver 24/7 customer support.",
    path: "/ai-chatbots",
    keywords: [
        "AI chatbots",
        "WhatsApp chatbot",
        "website chatbot",
        "social media chatbot",
        "customer support automation",
    ],
});

export default function AIChatbotsLayout({ children }) {
    return children;
}
