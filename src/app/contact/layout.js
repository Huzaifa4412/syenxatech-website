import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "Contact Syenxa Tech | Book an AI Strategy Call",
    description:
        "Contact Syenxa Tech to discuss AI calling agents, AI chatbots, websites, automation, and digital marketing solutions for your business.",
    path: "/contact",
    keywords: [
        "contact Syenxa Tech",
        "book AI consultation",
        "AI automation agency contact",
    ],
});

export default function ContactLayout({ children }) {
    return children;
}
