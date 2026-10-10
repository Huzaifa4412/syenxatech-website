import AboutPage from "@/components/interior/AboutPage";
import JsonLd from "@/components/JsonLd";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateWebPageSchema,
    siteConfig,
} from "@/lib/seo";

const title = `About Syenxa Tech | AI Automation Agency Since ${siteConfig.foundingYear}`;
const description =
    "Syenxa Tech is an AI automation agency building AI calling agents, chatbots, Next.js websites and marketing automation for small businesses worldwide.";

export const metadata = createMetadata({
    title,
    description,
    path: "/about",
    image: "/images/about-studio-v1.webp",
    imageAlt: "An orange telephone, laptop and design sketches in a sunlit studio still-life",
    keywords: [
        "AI Automation Agency",
        "Artificial Intelligence Automation Agency",
        "AI Calling Agents Developer",
        "Custom AI Solutions Company",
        "About Syenxa Tech",
        "AI Business Automation Team",
    ],
});

export default function AboutUs() {
    return (
        <>
            <JsonLd
                data={[
                    generateWebPageSchema({
                        name: title,
                        description,
                        path: "/about",
                        type: "AboutPage",
                    }),
                    generateBreadcrumbSchema([{ name: "About", path: "/about" }]),
                ]}
            />
            <AboutPage />
        </>
    );
}
