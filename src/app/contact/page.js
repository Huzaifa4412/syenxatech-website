import React from "react";
import ContactClient from "@/components/contact-client";
import JsonLd from "@/components/JsonLd";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "Contact Syenxa Tech | Book an AI Strategy Call";
const description =
    "Contact Syenxa Tech to hire AI developers, deploy custom AI calling agents and chatbots, build a Next.js website, or book a free AI automation consultation.";

export const metadata = createMetadata({
    title,
    description,
    path: "/contact",
    keywords: [
        "Contact Syenxa Tech",
        "Hire AI Developers",
        "AI Automation Agency Contact",
        "Book AI Consultation",
        "AI Calling Agent Development Agency",
        "Hire Next.js Developers",
    ],
});

export default function ContactPage() {
    return (
        <>
            <JsonLd
                data={[
                    generateWebPageSchema({
                        name: title,
                        description,
                        path: "/contact",
                        type: "ContactPage",
                    }),
                    generateBreadcrumbSchema([{ name: "Contact", path: "/contact" }]),
                ]}
            />
            <ContactClient />
        </>
    );
}
