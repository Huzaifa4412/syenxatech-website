import React from "react";
import ContactClient from "@/components/contact-client";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "Hire AI Developers & Contact Syenxa Tech | AI Agency",
    description:
        "Get in touch with Syenxa Tech to hire AI developers, deploy custom AI voice agents, build Next.js web applications, or consult on AI business automation.",
    path: "/contact",
    keywords: [
        "Hire AI Developers",
        "AI Automation Agency Contact",
        "Custom AI Developer Consultation",
        "AI Calling Agent Development Agency",
        "Syenxa Tech Contact",
        "Hire Next.js Developers"
    ],
});

export default function ContactPage() {
    return <ContactClient />;
}
