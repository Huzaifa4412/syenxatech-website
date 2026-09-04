import Faqs from "@/components/faqs";
import Contact from "@/components/form";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Story from "@/components/story";
import HeroDialog from "@/components/HeroDialog";
import JsonLd from "@/components/JsonLd";
import { homeFaqs } from "@/lib/faqs";
import {
    createMetadata,
    generateFaqSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "AI Automation Agency & AI Calling Solutions | Syenxa Tech";
const description =
    "Syenxa Tech is an AI automation agency building custom AI calling agents, voice AI for sales, AI chatbots and fast Next.js websites that grow your business.";

export const metadata = createMetadata({
    title,
    description,
    path: "/",
    keywords: [
        "AI Automation Agency",
        "AI Calling Agents",
        "AI Voice Agent for Sales",
        "Custom Website Development Company",
        "AI Chatbot Solutions",
        "AI Business Automation",
        "AI Call Center Voice Agent",
    ],
});

export default function Home() {
    return (
        <>
            <JsonLd
                data={[
                    generateWebPageSchema({ name: title, description, path: "/" }),
                    generateFaqSchema(homeFaqs),
                ]}
            />
            <Hero />
            <HeroDialog />
            <Services />
            <Story />
            <Contact />
            <Faqs />
        </>
    );
}
