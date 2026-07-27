import SEOContentPage from "@/components/SEOContentPage";
import { createMetadata, generateServiceSchema } from "@/lib/seo";

export const metadata = createMetadata({
    title: "AI Marketing Automation Agency & SEO Services | Syenxa Tech",
    description:
        "Accelerate business growth with Syenxa Tech's AI marketing automation agency, SEO services, performance marketing, and conversion optimization.",
    path: "/digital-marketing",
    keywords: [
        "AI Marketing Automation Agency",
        "AI Digital Marketing Agency",
        "Marketing Automation Agency",
        "SEO Services Company",
        "AI Business Growth Agency",
        "Digital Marketing Agency"
    ],
});

export default function DigitalMarketing() {
    const serviceSchema = generateServiceSchema({
        name: "AI Digital Marketing & SEO Services",
        description: "AI marketing automation, technical SEO, and conversion optimization services.",
        serviceType: "Digital Marketing Agency",
        url: "/digital-marketing",
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <SEOContentPage
                title="Digital Marketing & SEO Services"
                subtitle="AI-Driven Marketing Strategy for Growth"
                content={
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Drive Targeted Traffic with Strategic SEO & AI Marketing
                            </h2>
                            <p className="text-white/70 leading-relaxed">
                                Syenxa Tech is an AI digital marketing agency dedicated to helping businesses dominate search engine results. Our SEO and AI marketing automation services focus on high-conversion keywords, technical optimizations, and scalable customer acquisition.
                            </p>
                        </section>
                        <section>
                            <h3 className="text-xl font-semibold text-[#ff541f] mb-3">
                                Comprehensive Technical SEO Services
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Our technical SEO strategy includes on-page optimization, site architecture, Core Web Vitals speed optimization, JSON-LD schema markup, and authority building to ensure your business ranks for commercial search terms.
                            </p>
                        </section>
                        <section>
                            <h3 className="text-xl font-semibold text-[#ff541f] mb-3">
                                AI Marketing Automation Services
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                We implement automated lead capture, email workflows, and omnichannel marketing bots across social channels, maximizing customer retention while scaling sales operations effortlessly.
                            </p>
                        </section>
                    </div>
                }
            />
        </>
    );
}
