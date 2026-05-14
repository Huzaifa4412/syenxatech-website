import { notFound } from "next/navigation";
import { useCasesData } from "@/lib/use-cases-data";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
    return Object.keys(useCasesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = useCasesData[slug];

    if (!data) {
        notFound();
    }

    return createMetadata({
        title: `${data.caseStudy.title} AI Automation Use Case | Syenxa Tech`,
        description: data.hero.subtitle,
        path: `/use-cases/${slug}`,
        keywords: [
            `${data.caseStudy.title} AI automation`,
            "AI calling agent use case",
            "AI chatbot use case",
            "business automation case study",
        ],
    });
}

export default function UseCaseDetailLayout({ children }) {
    return children;
}
