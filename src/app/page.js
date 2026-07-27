import Faqs from "@/components/faqs";
import Contact from "@/components/form";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Story from "@/components/story";
import HeroDialog from "../components/HeroDialog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Automation Agency & AI Calling Solutions | Syenxa Tech",
  description:
    "Syenxa Tech is an AI automation agency building custom AI calling agents, voice AI for sales, AI chatbots, and high-performance Next.js websites for business growth.",
  path: "/",
  keywords: [
    "AI Automation Agency",
    "AI Calling Agents",
    "AI Voice Agent for Sales",
    "Custom Website Development Company",
    "AI Chatbot Solutions",
    "AI Business Automation",
    "AI Call Center Voice Agent"
  ],
});

export default function Home() {
  return (
    <>
      <Hero />
      <HeroDialog />
      <Services />
      <Story />
      <Contact />
      <Faqs />
    </>
  );
}

