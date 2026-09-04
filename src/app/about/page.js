import Link from "next/link";
import SEOContentPage from "@/components/SEOContentPage";
import JsonLd from "@/components/JsonLd";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateWebPageSchema,
    siteConfig,
} from "@/lib/seo";

const title = "About Syenxa Tech | AI Automation Agency Since 2014";
const description =
    "Syenxa Tech is an AI automation agency building AI calling agents, chatbots, Next.js websites and marketing automation for small businesses worldwide.";

export const metadata = createMetadata({
    title,
    description,
    path: "/about",
    image: "/covers/about.jpg",
    imageAlt: "About Syenxa Tech, AI automation agency founded in 2014",
    keywords: [
        "AI Automation Agency",
        "Artificial Intelligence Automation Agency",
        "AI Calling Agents Developer",
        "Custom AI Solutions Company",
        "About Syenxa Tech",
        "AI Business Automation Team",
    ],
});

const headings = [
    { id: "what-we-do", text: "What we do" },
    { id: "who-we-are", text: "Who we are" },
    { id: "why-choose-us", text: "Why businesses choose us" },
    { id: "how-we-work", text: "How we work" },
    { id: "mission", text: "Our mission" },
];

export default function AboutUs() {
    return (
        <>
            <JsonLd
                data={[
                    generateWebPageSchema({
                        name: title,
                        description,
                        path: "/about",
                        type: "AboutPage",
                    }),
                    generateBreadcrumbSchema([{ name: "About", path: "/about" }]),
                ]}
            />
            <SEOContentPage
                title="About Syenxa Tech"
                subtitle="An AI automation agency that builds calling agents, chatbots and websites that actually get used."
                category="Company"
                backHref="/"
                backLabel="Home"
                headings={headings}
                coverImage={{ src: "/covers/about.jpg", alt: "About Syenxa Tech, AI automation agency founded in 2014" }}
                keyTakeaways={[
                    `Founded in ${siteConfig.foundingYear}, Syenxa Tech has shipped 300+ projects for clients worldwide.`,
                    "We specialize in AI calling agents (voice AI), omnichannel AI chatbots, Next.js websites and marketing automation.",
                    "Every engagement starts with a free consultation and ends with a working system connected to your calendar and CRM.",
                ]}
                content={
                    <div className="space-y-12">
                        <section>
                            <h2 id="what-we-do" className="text-3xl font-bold text-zinc-900 mb-6">
                                What we do
                            </h2>
                            <p className="text-lg">
                                Every business deserves smarter, faster ways to
                                connect with customers. Syenxa Tech builds{" "}
                                <Link href="/ai-calling-agents" className="font-semibold text-[#ff541f] hover:underline">
                                    AI calling agents
                                </Link>{" "}
                                that answer and make phone calls around the clock,{" "}
                                <Link href="/ai-chatbots" className="font-semibold text-[#ff541f] hover:underline">
                                    AI chatbots
                                </Link>{" "}
                                that handle WhatsApp, Instagram, Messenger and
                                website conversations, and{" "}
                                <Link href="/website-development" className="font-semibold text-[#ff541f] hover:underline">
                                    high-performance websites
                                </Link>{" "}
                                that turn visitors into inquiries. Our{" "}
                                <Link href="/digital-marketing" className="font-semibold text-[#ff541f] hover:underline">
                                    digital marketing and SEO
                                </Link>{" "}
                                work keeps those systems fed with qualified traffic.
                            </p>
                        </section>

                        <section>
                            <h2 id="who-we-are" className="text-3xl font-bold text-zinc-900 mb-6">
                                Who we are
                            </h2>
                            <p>
                                We are a United States based AI and digital
                                solutions company that has been building software
                                since {siteConfig.foundingYear}. Our team combines
                                engineers who work daily with speech recognition,
                                large language models and telephony, with
                                designers and marketers who understand what a
                                small business actually needs: more booked
                                appointments, fewer missed calls and less admin.
                            </p>
                            <p className="mt-4">
                                We serve clinics, real estate agencies, gyms,
                                salons, home-service companies and e-commerce
                                brands across North America, Europe and the Middle
                                East. See how those deployments look in practice on
                                our{" "}
                                <Link href="/use-cases" className="font-semibold text-[#ff541f] hover:underline">
                                    industry use cases
                                </Link>{" "}
                                page.
                            </p>
                        </section>

                        <section>
                            <h2 id="why-choose-us" className="text-3xl font-bold text-zinc-900 mb-8">
                                Why businesses choose our AI calling agents
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-zinc-900/10">
                                    <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                        Boost sales effortlessly
                                    </h3>
                                    <p className="text-zinc-700">
                                        Our AI calling agents qualify leads,
                                        schedule appointments and follow up with
                                        prospects automatically, so your sales
                                        team spends its time closing deals.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-zinc-900/10">
                                    <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                        Enhance customer support 24/7
                                    </h3>
                                    <p className="text-zinc-700">
                                        Never miss a call again. Our voice agents
                                        handle inquiries, give accurate answers
                                        from your own knowledge base and hand off
                                        to a human whenever it matters.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-zinc-900/10">
                                    <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                        Cut costs and increase efficiency
                                    </h3>
                                    <p className="text-zinc-700">
                                        One AI calling agent handles hundreds of
                                        simultaneous calls. Replace call center
                                        overhead with a fixed setup fee and
                                        predictable usage pricing.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-zinc-900/10">
                                    <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                        Customizable for your business
                                    </h3>
                                    <p className="text-zinc-700">
                                        Every agent is built around your scripts,
                                        your calendar and your CRM. Voice, tone,
                                        languages and escalation rules all match
                                        your brand.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 id="how-we-work" className="text-3xl font-bold text-zinc-900 mb-6">
                                How we work
                            </h2>
                            <ol className="list-decimal pl-6 space-y-3">
                                <li>
                                    <strong>Discovery call.</strong> A free
                                    consultation where we map your current workflow
                                    and pick the automation with the fastest payback.
                                    You leave with a fixed quote and a delivery date.
                                </li>
                                <li>
                                    <strong>Build and review.</strong> We build in
                                    short cycles and you review working versions.
                                    Chatbots ship in about 3 working days, standard
                                    websites in 5 to 7.
                                </li>
                                <li>
                                    <strong>Launch and support.</strong> We deploy,
                                    connect your channels and CRM, and stay on for
                                    tuning once real customers hit the system.
                                    Support is included, not an upsell.
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h2 id="mission" className="text-3xl font-bold text-zinc-900 mb-6">
                                Our mission
                            </h2>
                            <p>
                                Our mission is to give small and mid-sized
                                businesses the same always-on sales and support
                                capacity that large enterprises have, without the
                                headcount. We measure success in booked
                                appointments, answered calls and hours handed back
                                to your team.
                            </p>
                        </section>

                        <section className="not-prose bg-(--primary-color)/10 p-10 rounded-3xl border border-(--primary-color)/20 text-center">
                            <h2 className="text-3xl font-bold text-zinc-900 mb-6">
                                Ready to transform your business?
                            </h2>
                            <p className="text-lg mb-8">
                                Imagine a sales and support team that works 24/7,
                                never gets tired and books more meetings. That is
                                what our AI calling agents do.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-4 rounded-full bg-[#ff541f] text-white font-bold hover:bg-zinc-900 transition-colors"
                            >
                                Book a free consultation
                            </Link>
                        </section>
                    </div>
                }
                keywords={[
                    "AI Calling Agents",
                    "AI Voice Agents for Sales",
                    "AI Customer Support Agents",
                    "AI Appointment Booking",
                    "AI Automation Agency",
                ]}
            />
        </>
    );
}
