import SEOContentPage from "@/components/SEOContentPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "Digital Marketing & SEO Services | Syenxa Tech | AI Solutions",
    description:
        "Grow your online presence with Syenxa Tech's SEO services and digital marketing solutions. We leverage AI marketing automation to drive targeted traffic.",
    path: "/digital-marketing",
    keywords: [
        "SEO Services",
        "Digital Marketing Agency",
        "Online Marketing Solutions",
        "AI Marketing Automation Services",
    ],
});

export default function DigitalMarketing() {
    return (
        <SEOContentPage
            title="Digital Marketing & SEO Services"
            subtitle="AI-Driven Marketing Strategy for Growth"
            content={
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white">
                            Drive Targeted Traffic with Strategic SEO
                        </h2>
                        <p>
                            Syenxa Tech is a digital marketing agency
                            dedicated to helping businesses dominate the search
                            results. Our SEO services focus on high-conversion
                            keywords and sustainable growth.
                        </p>
                    </section>
                    <section>
                        <h3 className="text-xl font-semibold text-(--primary-color)">
                            SEO Services
                        </h3>
                        <p>
                            Our comprehensive SEO strategy includes on-page
                            optimization, technical SEO, and authority building.
                            We target both brand-specific and service-focused
                            keywords to ensure your business is found by the
                            right audience at the right time.
                        </p>
                    </section>
                    <section>
                        <h3 className="text-xl font-semibold text-(--primary-color)">
                            AI Marketing Automation Services
                        </h3>
                        <p>
                            Leverage the power of AI to automate your marketing
                            workflows. From automated lead nurturing to
                            AI-driven content strategy, we help you save time
                            and increase ROI by working smarter.
                        </p>
                    </section>
                    <section>
                        <h3 className="text-xl font-semibold text-(--primary-color)">
                            Comprehensive Online Marketing Solutions
                        </h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Keyword Research:</strong> Identifying
                                high-conversion long-tail keywords for your
                                niche.
                            </li>
                            <li>
                                <strong>Content Optimization:</strong> Ensuring
                                every page is engaging and SEO-friendly.
                            </li>
                            <li>
                                <strong>Analytics & Reporting:</strong>{" "}
                                Data-driven decisions based on real performance
                                metrics.
                            </li>
                            <li>
                                <strong>Social Media Automation:</strong>{" "}
                                Streamlining your social presence with AI.
                            </li>
                        </ul>
                    </section>
                </div>
            }
            keywords={[
                "SEO",
                "Digital Marketing Agency",
                "AI Marketing Automation",
            ]}
        />
    );
}
