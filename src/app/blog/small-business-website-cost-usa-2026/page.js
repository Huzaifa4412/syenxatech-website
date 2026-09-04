import Link from "next/link";
import SEOContentPage from "@/components/SEOContentPage";
import JsonLd from "@/components/JsonLd";
import { formatPostDate } from "@/lib/reading-time";
import { WebsiteCostChart } from "@/components/illustrations/Charts";
import { generateFaqSchema, getLegacyPost, legacyPostMetadata, legacyPostSchemas } from "@/lib/seo";

const SLUG = "small-business-website-cost-usa-2026";

export const metadata = legacyPostMetadata(SLUG);

const headings = [
    { id: "short-answer", text: "The short answer" },
    { id: "by-build-type", text: "Cost by build type" },
    { id: "what-drives-price", text: "What drives the price" },
    { id: "ongoing-costs", text: "Ongoing costs to budget for" },
    { id: "cheap-vs-expensive", text: "Why quotes vary so much" },
    { id: "how-to-budget", text: "How to budget without overpaying" },
    { id: "syenxa-pricing", text: "How Syenxa Tech prices websites" },
];

const faq = [
    {
        question: "How much does a 5-page business website cost in the USA?",
        answer: "In 2026 a professional 5 to 8 page small business website typically costs $2,000 to $8,000 from a freelancer and $8,000 to $15,000 or more from a boutique agency. DIY builders run $200 to $600 per year in subscriptions. Syenxa Tech standard business websites start at $200 with delivery in 5 to 7 working days.",
    },
    {
        question: "What are the ongoing costs of a website?",
        answer: "Expect $1,000 to $6,000 per year for hosting, domain, maintenance and support on a typical small business site. Modern Next.js sites hosted on an edge network usually sit at the low end because there are no plugins to update and hosting is often free or a few dollars a month at small-business traffic levels.",
    },
    {
        question: "Is a cheap website worth it?",
        answer: "Only if it is fast, mobile-friendly, indexable and built to convert. A low price is fine when it comes from an efficient process rather than cut corners. Check load speed, look for structured data and proper metadata, and make sure you own the code and domain.",
    },
];

function Table({ rows, head }) {
    return (
        <div className="not-prose overflow-x-auto rounded-2xl border border-zinc-900/10 bg-white my-6">
            <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                    <tr className="border-b border-zinc-900/10 text-xs font-mono uppercase tracking-widest text-zinc-500">
                        {head.map((h) => (
                            <th key={h} scope="col" className="p-4">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row[0]} className="border-b border-zinc-900/5 last:border-0">
                            {row.map((cell, i) => (
                                <td key={i} className={`p-4 ${i === 0 ? "font-medium text-zinc-800" : "text-zinc-600"}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const Src = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow">{children}</a>
);

export default function WebsiteCostPost() {
    const post = getLegacyPost(SLUG);

    return (
        <>
            <JsonLd data={[...legacyPostSchemas(SLUG), generateFaqSchema(faq)]} />
            <SEOContentPage
                title={post.title}
                subtitle="2026 price ranges by build type, the factors that move a quote, the ongoing costs people forget, and how to budget sensibly."
                category={post.category}
                date={formatPostDate(post.datePublished)}
                dateTime={post.datePublished}
                readingTime={post.readingTime}
                headings={headings}
                keywords={post.keywords}
                coverImage={{ src: post.image, alt: post.imageAlt }}
                faq={faq}
                keyTakeaways={[
                    "A professional small business website in the US costs $2,000 to $8,000 in 2026 from a freelancer and $8,000 to $15,000+ from a boutique agency.",
                    "61% of small business buyers spent under $10,000 on their last website, according to the Clutch 2026 survey.",
                    "Ongoing hosting, maintenance and support add $1,000 to $6,000 per year; a modern Next.js build keeps that near the bottom of the range.",
                ]}
                content={
                    <div className="space-y-8">
                        <section>
                            <h2 id="short-answer">The short answer</h2>
                            <p>
                                A small business website in the USA costs between
                                $2,000 and $8,000 in 2026 for a professional,
                                custom-designed site from a freelancer, and $8,000
                                to $15,000 or more from a boutique agency, with
                                advanced builds reaching $35,000 (
                                <Src href="https://elementor.com/blog/how-much-does-a-small-business-website-cost/">Elementor</Src>
                                ). The Clutch 2026 survey found 61% of small
                                business buyers spent under $10,000 on their most
                                recent site (
                                <Src href="https://www.digitalapplied.com/blog/website-development-cost-2026-complete-pricing-data">Digital Applied</Src>
                                ). DIY builders cost a few hundred dollars a year
                                but leave the work, and the results, to you.
                            </p>
                        </section>

                        <section>
                            <h2 id="by-build-type">Cost by build type</h2>
                            <figure className="not-prose my-8 p-6 md:p-8 rounded-2xl bg-white border border-zinc-900/10">
                                <figcaption className="mb-4 font-display font-bold text-zinc-900">Small business website cost by build type (US, 2026)</figcaption>
                                <WebsiteCostChart />
                                <p className="mt-3 text-xs text-zinc-500">Sources: Elementor 2026 cost guide; Clutch 2026 survey via Digital Applied.</p>
                            </figure>
                            <Table
                                head={["Build type", "Typical 2026 US cost", "Timeline", "Trade-off"]}
                                rows={[
                                    ["DIY builder (Wix, Squarespace)", "$200 to $600 per year", "Days of your own time", "Templates, slower pages, limited SEO control"],
                                    ["Freelancer", "$2,000 to $8,000", "3 to 6 weeks", "Quality varies; support after launch is uneven"],
                                    ["Boutique agency", "$8,000 to $15,000+", "6 to 12 weeks", "Strategy included; highest cost and longest wait"],
                                    ["Syenxa Tech (Next.js)", "From $200; larger builds quoted", "5 to 7 working days", "Fixed process and proven foundation keep the price low"],
                                ]}
                            />
                        </section>

                        <section>
                            <h2 id="what-drives-price">What drives the price</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Number of pages and templates.</strong> A 6-page brochure site and a 40-page site with service and location pages are very different jobs.</li>
                                <li><strong>Custom design vs template.</strong> Original layouts, illustration and photography add design hours.</li>
                                <li><strong>Functionality.</strong> Booking, e-commerce, customer portals, calculators and multi-language support each add scope.</li>
                                <li><strong>Content.</strong> Writing and structuring copy around the keywords your customers search takes time, and it is where most cheap sites fall down.</li>
                                <li><strong>Technical SEO.</strong> Metadata, schema, sitemaps, image optimization and Core Web Vitals work are either included or sold as an add-on. Ask.</li>
                                <li><strong>Integrations.</strong> CRM, email marketing, chat widgets and AI agents connected at build time save money later.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 id="ongoing-costs">Ongoing costs to budget for</h2>
                            <Table
                                head={["Item", "Typical annual cost (US)", "Notes"]}
                                rows={[
                                    ["Domain", "$10 to $20", "Paid to the registrar"],
                                    ["Hosting", "$0 to $600", "Edge hosting for Next.js is often free at small-business traffic; managed WordPress costs more"],
                                    ["Maintenance and updates", "$600 to $1,800", "Plugin-based CMSs need regular patching; modern stacks need far less"],
                                    ["Content and SEO", "$0 to $3,000+", "Optional, but the main lever for growth after launch"],
                                ]}
                            />
                            <p>
                                Industry guides put total ongoing costs at $1,000
                                to $6,000 per year for a typical small business
                                site (<Src href="https://elementor.com/blog/how-much-does-a-small-business-website-cost/">Elementor</Src>).
                                Sites without a plugin ecosystem sit at the low end.
                            </p>
                        </section>

                        <section>
                            <h2 id="cheap-vs-expensive">Why quotes vary so much</h2>
                            <p>
                                Two vendors can quote $500 and $12,000 for what
                                sounds like the same website. The difference is
                                usually process and reuse. An agency starting from
                                a blank page bills for discovery workshops,
                                wireframes, revisions and project management. A
                                team working from a proven, fast foundation with a
                                fixed five-step process spends its time on your
                                content, design and conversions rather than on
                                rebuilding the basics. Low price is a warning sign
                                only when it comes with slow pages, templates you
                                do not own, or no SEO fundamentals.
                            </p>
                        </section>

                        <section>
                            <h2 id="how-to-budget">How to budget without overpaying</h2>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>List the pages and features you need for the next 12 months, not the next 5 years.</li>
                                <li>Ask every vendor whether technical SEO, mobile optimization and analytics are included.</li>
                                <li>Request two live reference sites and test their speed on your phone.</li>
                                <li>Confirm you will own the domain, code and design files.</li>
                                <li>Budget separately for content and SEO after launch; that is where traffic comes from.</li>
                                <li>Decide whether lead follow-up should be automated. A website connected to an{" "}
                                    <Link href="/ai-chatbots">AI chatbot</Link> or{" "}
                                    <Link href="/ai-calling-agents">AI calling agent</Link>{" "}
                                    converts more of the traffic you pay for.</li>
                            </ol>
                        </section>

                        <section>
                            <h2 id="syenxa-pricing">How Syenxa Tech prices websites</h2>
                            <p>
                                Standard business websites start at $200 USD and
                                go live in 5 to 7 working days, with custom
                                design, mobile-first Next.js code, technical SEO
                                and analytics included. E-commerce stores, web
                                applications and multi-language sites are quoted
                                after a free discovery call. Hosting and domain
                                fees are paid to the provider, and we set them up
                                at no charge. See our{" "}
                                <Link href="/website-development">website development services</Link>{" "}
                                and portfolio, or{" "}
                                <Link href="/contact">request a fixed quote</Link>.
                            </p>
                        </section>
                    </div>
                }
            />
        </>
    );
}
