import SEOContentPage from "@/components/SEOContentPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "Top Benefits of AI Chatbots for Customer Support | Syenxa Tech",
    description:
        "Learn the key benefits of AI Chatbots for your business. Improve support, generate leads, and reduce costs with Syenxa Tech's chatbot solutions.",
    path: "/blog/top-benefits-of-ai-chatbots",
    type: "article",
    keywords: [
        "AI Chatbots for Businesses",
        "AI Customer Support",
        "Syenxa Tech Chatbots",
        "Lead Generation",
    ],
});

export default function Blog2() {
    return (
        <SEOContentPage
            title="Top Benefits of AI Chatbots for Customer Support"
            subtitle="Revolutionizing Customer Experience 24/7"
            content={
                <div className="space-y-8">
                    <p>
                        As consumer expectations for instant support grow,
                        businesses are increasingly adopting{" "}
                        <strong>AI Chatbots</strong> to meet demand. Syenxa
                        Tech's chatbot solutions provide more than just
                        automated answers—they provide a competitive edge.
                    </p>
                    <section>
                        <h2 className="text-2xl font-bold text-white">
                            High-Level Lead Generation
                        </h2>
                        <p>
                            Our chatbots are designed for{" "}
                            <strong>
                                customer support and lead generation
                            </strong>
                            . By asking the right questions at the right time,
                            they identify high-intent prospects and pass them
                            directly to your sales team.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white">
                            Reducing Support Tickets
                        </h2>
                        <p>
                            By handling up to 80% of routine inquiries, AI
                            Chatbots free up your human support staff to handle
                            complex issues, improving overall efficiency and
                            employee satisfaction within your team.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white">
                            Seamless Global Reach
                        </h2>
                        <p>
                            Your AI Chatbot provides consistent,
                            and brand-aligned support at any time of
                            day or night, regardless of where your customers are located.
                        </p>
                    </section>
                </div>
            }
            keywords={[
                "AI Chatbots",
                "Customer Support Automation",
                "Syenxa Tech Solutions",
            ]}
        />
    );
}
