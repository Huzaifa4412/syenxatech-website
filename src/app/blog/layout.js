import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Automation & Digital Growth Blog | Syenxa Tech",
    description:
        "Read Syenxa Tech insights on AI calling agents, AI chatbots, automation, digital marketing, and business growth strategies.",
    path: "/blog",
    keywords: [
        "AI automation blog",
        "AI calling agents insights",
        "AI chatbots for support",
        "digital growth strategies",
    ],
});

export default function BlogLayout({ children }) {
    return children;
}
