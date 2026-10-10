import DigitalMarketingPage from "@/components/interior/DigitalMarketingPage";
import JsonLd from "@/components/JsonLd";
import { marketingPageFaqs } from "@/lib/marketing-page-content";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateFaqSchema,
    generateServiceSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "AI Marketing Automation Agency & SEO Services | Syenxa Tech";
const description =
    "AI marketing automation agency: technical SEO, keyword and content strategy, paid campaigns, and instant lead follow-up via chatbots and AI calling agents.";

export const metadata = createMetadata({
    title,
    description,
    path: "/digital-marketing",
    image: "/covers/digital-marketing.jpg",
    imageAlt: "Syenxa Tech digital marketing and SEO services",
    keywords: [
        "AI Marketing Automation Agency",
        "AI Digital Marketing Agency",
        "Marketing Automation Agency",
        "SEO Services Company",
        "Technical SEO Services",
        "Digital Marketing Agency for Small Business",
    ],
});

export default function DigitalMarketing() {
    const schemas = [
        generateWebPageSchema({ name: title, description, path: "/digital-marketing" }),
        generateBreadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Digital Marketing & SEO", path: "/digital-marketing" },
        ]),
        generateServiceSchema({
            name: "AI Digital Marketing & SEO Services",
            description:
                "Technical SEO, content strategy, paid acquisition and AI marketing automation that connects campaigns to chatbots and calling agents.",
            serviceType: "Digital Marketing",
            url: "/digital-marketing",
            audience: "Small and mid-sized businesses",
        }),
        generateFaqSchema(marketingPageFaqs),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <DigitalMarketingPage />
        </>
    );
}
