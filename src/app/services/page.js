import React from "react";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceList from "@/components/services/ServiceList";
import ProcessSection from "@/components/services/ProcessSection";
import Contact from "@/components/form";
import Faqs from "@/components/faqs";
import Footer from "@/components/footer";

export const metadata = {
    title: "Premium AI & Digital Services | Syenxa Tech",
    description:
        "Explore Syenxa Tech's professional services: AI Calling Agents, Intelligent Chatbots, High-Performance Web Development, and Mobile Apps. Scale your business today.",
    keywords: [
        "AI Calling Agents",
        "AI Chatbots",
        "Web Development",
        "Mobile App Development",
        "Syenxa Tech Services",
        "Digital Transformation",
    ],
};

export default function ServicesPage() {
    return (
        <main className="bg-black">
            <ServicesHero />
            <ServiceList />
            <ProcessSection />
            <Contact />
            <div className="py-12">
                <Faqs />
            </div>
        </main>
    );
}
