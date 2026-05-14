import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Calling Agents for Sales & Support | Syenxa Tech",
    description:
        "Deploy AI calling agents that answer calls, qualify leads, book appointments, and support customers around the clock for your business.",
    path: "/ai-calling-agents",
    keywords: [
        "AI calling agents",
        "AI voice agents",
        "AI sales agents",
        "automated appointment booking",
        "AI customer support",
    ],
});

export default function AICallingAgentsLayout({ children }) {
    return children;
}
