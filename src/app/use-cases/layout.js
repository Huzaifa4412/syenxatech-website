import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Automation Use Cases by Industry | Syenxa Tech",
    description:
        "Explore AI calling agent and chatbot use cases for healthcare, real estate, gyms, salons, and service businesses.",
    path: "/use-cases",
    keywords: [
        "AI automation use cases",
        "AI agents by industry",
        "AI calling agent examples",
        "business automation use cases",
    ],
});

export default function UseCasesLayout({ children }) {
    return children;
}
