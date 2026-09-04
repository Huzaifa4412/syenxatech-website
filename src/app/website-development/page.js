import React from "react";
import WebsiteDevelopmentClient from "@/components/website-development-client";
import JsonLd from "@/components/JsonLd";
import { webDevFaqs } from "@/lib/faqs";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateFaqSchema,
    generateServiceSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "Website Development Services in the USA | Syenxa Tech";
const description =
    "Custom Next.js websites for US businesses built to rank on Google and get cited by ChatGPT and AI Overviews. SEO, AEO and GEO included. From $200, live in 5 to 7 days.";

export const metadata = createMetadata({
    title,
    description,
    path: "/website-development",
    image: "/covers/website-development.jpg",
    imageAlt: "Website development services in the USA by Syenxa Tech",
    keywords: [
        "Custom Website Development",
        "Custom Web Development Services",
        "Website Development Company",
        "Next.js Web Development Agency",
        "E-commerce Website Development",
        "Responsive Web Design Agency",
        "Custom Web Application Development",
        "Website Development Services USA",
        "Small Business Website Design USA",
        "AEO Answer Engine Optimization",
        "GEO Generative Engine Optimization",
        "SEO Website Design",
    ],
});

export default function WebsiteDevelopmentPage() {
    const schemas = [
        generateWebPageSchema({ name: title, description, path: "/website-development" }),
        generateBreadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Website Development", path: "/website-development" },
        ]),
        generateServiceSchema({
            name: "Custom Website Development Services",
            description:
                "Custom Next.js websites, web applications, e-commerce storefronts and responsive redesigns built for Core Web Vitals and technical SEO.",
            serviceType: "Website Development",
            url: "/website-development",
            audience: "Small and mid-sized businesses",
            offers: {
                priceCurrency: "USD",
                price: "200",
                description: "Business websites from $200 USD, delivered in 5 to 7 working days.",
            },
        }),
        generateServiceSchema({
            name: "SEO, AEO & GEO for Websites",
            description:
                "Search engine optimization, answer engine optimization and generative engine optimization built into every Syenxa Tech website so it ranks on Google and is cited by AI assistants.",
            serviceType: "Search Engine Optimization",
            url: "/website-development#seo-aeo-geo",
            audience: "Small and mid-sized businesses in the United States",
        }),
        generateFaqSchema(webDevFaqs),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <WebsiteDevelopmentClient />
        </>
    );
}
