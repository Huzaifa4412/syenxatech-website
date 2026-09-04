import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { useCasesData } from "@/lib/use-cases-data";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateServiceSchema,
    generateWebPageSchema,
} from "@/lib/seo";

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
        title: data.seo.title,
        description: data.seo.description,
        path: `/use-cases/${slug}`,
        keywords: data.seo.keywords,
    });
}

export default async function UseCaseDetailLayout({ children, params }) {
    const { slug } = await params;
    const data = useCasesData[slug];

    if (!data) {
        notFound();
    }

    const path = `/use-cases/${slug}`;
    const schemas = [
        generateWebPageSchema({
            name: data.seo.title,
            description: data.seo.description,
            path,
        }),
        generateBreadcrumbSchema([
            { name: "Use Cases", path: "/use-cases" },
            { name: data.seo.industry, path },
        ]),
        generateServiceSchema({
            name: `AI Calling Agents & Chatbots for ${data.seo.industry}`,
            description: data.seo.description,
            serviceType: "AI Voice Agent and Chatbot Automation",
            url: path,
            audience: data.seo.industry,
        }),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            {children}
        </>
    );
}
