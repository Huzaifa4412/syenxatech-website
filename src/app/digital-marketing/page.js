import Link from "next/link";
import SEOContentPage from "@/components/SEOContentPage";
import JsonLd from "@/components/JsonLd";
import { digitalMarketingFaqs } from "@/lib/faqs";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateFaqSchema,
    generateServiceSchema,
    generateWebPageSchema,
} from "@/lib/seo";

const title = "AI Marketing Automation Agency & SEO Services | Syenxa Tech";
const description =
    "AI marketing automation agency: technical SEO, keyword and content strategy, paid campaigns, and instant lead follow-up via chatbots and AI calling agents.";

export const metadata = createMetadata({
    title,
    description,
    path: "/digital-marketing",
    image: "/covers/digital-marketing.jpg",
    imageAlt: "Syenxa Tech digital marketing and SEO services",
    keywords: [
        "AI Marketing Automation Agency",
        "AI Digital Marketing Agency",
        "Marketing Automation Agency",
        "SEO Services Company",
        "Technical SEO Services",
        "Digital Marketing Agency for Small Business",
    ],
});

const headings = [
    { id: "seo-services", text: "SEO services" },
    { id: "marketing-automation", text: "AI marketing automation" },
    { id: "paid-acquisition", text: "Paid acquisition" },
    { id: "reporting", text: "Reporting that tracks leads" },
    { id: "process", text: "How an engagement works" },
];

export default function DigitalMarketing() {
    const schemas = [
        generateWebPageSchema({ name: title, description, path: "/digital-marketing" }),
        generateBreadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Digital Marketing & SEO", path: "/digital-marketing" },
        ]),
        generateServiceSchema({
            name: "AI Digital Marketing & SEO Services",
            description:
                "Technical SEO, content strategy, paid acquisition and AI marketing automation that connects campaigns to chatbots and calling agents.",
            serviceType: "Digital Marketing",
            url: "/digital-marketing",
            audience: "Small and mid-sized businesses",
        }),
        generateFaqSchema(digitalMarketingFaqs),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <SEOContentPage
                title="Digital Marketing & SEO Services"
                subtitle="An AI marketing automation agency that turns search traffic and paid clicks into booked appointments, not just sessions."
                category="Service"
                backHref="/services"
                backLabel="All services"
                headings={headings}
                coverImage={{ src: "/covers/digital-marketing.jpg", alt: "Syenxa Tech digital marketing and SEO services" }}
                keyTakeaways={[
                    "Technical SEO first: crawlability, Core Web Vitals and structured data before any content push.",
                    "Every campaign lands on a page connected to an AI chatbot or calling agent, so leads are followed up in seconds.",
                    "Reporting is tied to inquiries and bookings, with rankings and traffic as supporting metrics.",
                ]}
                faq={digitalMarketingFaqs}
                content={
                    <div className="space-y-12">
                        <section>
                            <h2 id="seo-services" className="text-3xl font-bold text-zinc-900 mb-4">
                                SEO services that target commercial intent
                            </h2>
                            <p className="text-zinc-700 leading-relaxed">
                                Syenxa Tech is an AI digital marketing agency that
                                helps service businesses rank for the searches that
                                turn into customers. We start every engagement with
                                a technical SEO audit: indexing and canonical
                                issues, Core Web Vitals, mobile rendering, internal
                                linking and JSON-LD structured data. Only when the
                                foundation is solid do we move to content.
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2 text-zinc-700">
                                <li>
                                    <strong>Technical SEO:</strong> crawl and index
                                    fixes, page speed, schema markup, sitemap and
                                    robots hygiene, migration support.
                                </li>
                                <li>
                                    <strong>Keyword research and content plans:</strong>{" "}
                                    topic clusters built around buying-intent
                                    queries such as “AI receptionist for dental
                                    practice” or “website design for gyms”.
                                </li>
                                <li>
                                    <strong>On-page optimization:</strong> titles,
                                    headings, copy, FAQs and internal links mapped to
                                    one primary keyword per page to avoid
                                    cannibalization.
                                </li>
                                <li>
                                    <strong>Local SEO:</strong> Google Business
                                    Profile, consistent name, address and phone
                                    data, and location pages for multi-site
                                    businesses.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 id="marketing-automation" className="text-3xl font-bold text-zinc-900 mb-4">
                                AI marketing automation
                            </h2>
                            <p className="text-zinc-700 leading-relaxed">
                                Traffic is only half the job. We connect your
                                website, ads and social channels to the{" "}
                                <Link href="/ai-chatbots" className="font-semibold text-[#ff541f] hover:underline">
                                    AI chatbots
                                </Link>{" "}
                                and{" "}
                                <Link href="/ai-calling-agents" className="font-semibold text-[#ff541f] hover:underline">
                                    AI calling agents
                                </Link>{" "}
                                we build, so every inquiry gets an instant reply,
                                a qualification conversation and a booked slot on
                                your calendar. Follow-up sequences run over
                                WhatsApp, SMS and email, and every touchpoint is
                                logged in your CRM.
                            </p>
                        </section>

                        <section>
                            <h2 id="paid-acquisition" className="text-3xl font-bold text-zinc-900 mb-4">
                                Paid acquisition with instant follow-up
                            </h2>
                            <p className="text-zinc-700 leading-relaxed">
                                We run Google Search, Meta and TikTok campaigns for
                                businesses that need leads this month, not next
                                quarter. Landing pages are built on the same
                                Next.js stack as our{" "}
                                <Link href="/website-development" className="font-semibold text-[#ff541f] hover:underline">
                                    website development
                                </Link>{" "}
                                work, so they load fast and convert. Because each
                                campaign hands leads to an AI agent, response time
                                drops from hours to seconds, which is the single
                                biggest lever on paid conversion rate.
                            </p>
                        </section>

                        <section>
                            <h2 id="reporting" className="text-3xl font-bold text-zinc-900 mb-4">
                                Reporting that tracks leads, not vanity metrics
                            </h2>
                            <p className="text-zinc-700 leading-relaxed">
                                Monthly reports show inquiries, booked
                                appointments and cost per lead by channel, with
                                rankings, impressions and traffic as supporting
                                context. You always know which pages and campaigns
                                are paying for themselves.
                            </p>
                        </section>

                        <section>
                            <h2 id="process" className="text-3xl font-bold text-zinc-900 mb-4">
                                How an engagement works
                            </h2>
                            <ol className="list-decimal pl-6 space-y-3 text-zinc-700">
                                <li>
                                    <strong>Audit and roadmap (week 1):</strong>{" "}
                                    technical audit, keyword map and a prioritized
                                    90-day plan with expected impact.
                                </li>
                                <li>
                                    <strong>Foundation fixes (weeks 2 to 4):</strong>{" "}
                                    speed, indexing, structured data, page templates
                                    and lead-capture automation.
                                </li>
                                <li>
                                    <strong>Content and campaigns (ongoing):</strong>{" "}
                                    new pages and posts each month, paid campaigns
                                    where they make sense, and continuous tuning
                                    based on lead data.
                                </li>
                            </ol>
                            <p className="mt-6 text-zinc-700">
                                Ready to see where your site stands?{" "}
                                <Link href="/contact" className="font-semibold text-[#ff541f] hover:underline">
                                    Request a free SEO audit
                                </Link>{" "}
                                and we will send back a prioritized list of fixes.
                            </p>
                        </section>
                    </div>
                }
                keywords={[
                    "SEO Services",
                    "Marketing Automation",
                    "Paid Acquisition",
                    "AI Lead Follow-up",
                ]}
            />
        </>
    );
}
