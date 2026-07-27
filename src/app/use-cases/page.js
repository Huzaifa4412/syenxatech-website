import React from "react";
import UseCasesClient from "@/components/use-cases-client";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Voice Agent & Chatbot Industry Use Cases | Syenxa Tech",
    description:
        "See how Syenxa Tech AI calling agents and automated chatbots deliver real ROI for real estate, healthcare, fitness centers, and high-end salons.",
    path: "/use-cases",
    keywords: [
        "AI Voice Agent Use Cases",
        "Real Estate AI Voice Agent",
        "Healthcare AI Scheduling Bot",
        "Gym Membership AI Automation",
        "Salon Appointment AI Chatbot",
        "AI Calling Agent Industry Applications"
    ],
});

export default function UseCasesPage() {
    return <UseCasesClient />;
}
