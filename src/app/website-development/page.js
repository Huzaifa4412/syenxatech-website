import React from "react";
import WebsiteDevelopmentClient from "@/components/website-development-client";
import { webDevFaqs } from "@/lib/faqs";
import { createMetadata, generateFaqSchema, generateServiceSchema } from "@/lib/seo";

export const metadata = createMetadata({
    title: "Custom Website Development Services & Agency | Syenxa Tech",
    description:
        "Syenxa Tech is a custom website development company building high-performance Next.js websites, web apps, and e-commerce platforms engineered for speed and SEO.",
    path: "/website-development",
    keywords: [
        "Custom Website Development",
        "Custom Web Development Services",
        "Website Development Company",
        "Next.js Web Development Agency",
        "E-commerce Website Development",
        "Responsive Web Design Agency",
        "Custom Web Application Development"
    ],
});

export default function WebsiteDevelopmentPage() {
    const faqSchema = generateFaqSchema(webDevFaqs);
    const serviceSchema = generateServiceSchema({
        name: "Custom Website Development Services",
        description: "Custom Next.js web application development, responsive design, and e-commerce platforms.",
        serviceType: "Website Development Agency",
        url: "/website-development",
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
            <WebsiteDevelopmentClient />
        </>
    );
}
