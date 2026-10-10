import Link from "next/link";
import SEOContentPage from "@/components/SEOContentPage";
import JsonLd from "@/components/JsonLd";
import { formatPostDate } from "@/lib/reading-time";
import { getLegacyPost, legacyPostMetadata, legacyPostSchemas, siteConfig } from "@/lib/seo";

const SLUG = "syenxa-tech-leading-ai-solutions";

export const metadata = legacyPostMetadata(SLUG);

const headings = [
    { id: "who-we-serve", text: "Who we serve" },
    { id: "services", text: "What we build" },
    { id: "how-we-work", text: "How a project runs" },
    { id: "why-trust", text: "Why businesses trust Syenxa Tech" },
];

export default function Blog4() {
    const post = getLegacyPost(SLUG);

    return (
        <>
            <JsonLd data={legacyPostSchemas(SLUG)} />
            <SEOContentPage
                title={post.title}
                subtitle="What Syenxa Tech builds, who we build it for, and what working with us actually looks like."
                category={post.category}
                date={formatPostDate(post.datePublished)}
                dateTime={post.datePublished}
                readingTime={post.readingTime}
                headings={headings}
                keywords={post.keywords}
                coverImage={{ src: post.image, alt: post.imageAlt }}
                keyTakeaways={[
                    `Syenxa Tech is a US-based AI automation agency serving small and mid-sized businesses worldwide since ${siteConfig.foundingYear}.`,
                    "Core services: AI calling agents, AI chatbots, Next.js website development and digital marketing with SEO.",
                    "Projects run in short cycles with fixed quotes: chatbots in about 3 days, standard websites in 5 to 7.",
                ]}
                content={
                    <div className="space-y-8">
                        <p>
                            As AI becomes part of how customers expect to be
                            served, <strong>Syenxa Tech</strong> helps businesses
                            put it to work in the places that matter most: the
                            phone, the inbox and the website. This overview
                            explains who we serve, what we build and how a
                            typical engagement runs.
                        </p>

                        <section>
                            <h2 id="who-we-serve">Who we serve</h2>
                            <p>
                                We are a United States based company delivering to
                                clients across North America, Europe and the
                                Middle East. Most of our clients are service
                                businesses with a high volume of calls and
                                messages: dental and medical clinics, real estate
                                agencies, gyms, salons, home-service companies and
                                e-commerce brands. You can see how deployments
                                differ by industry on our{" "}
                                <Link href="/use-cases">use cases</Link> page.
                            </p>
                        </section>

                        <section>
                            <h2 id="services">What we build</h2>
                            <ul className="list-disc pl-6 space-y-3">
                                <li>
                                    <strong>
                                        <Link href="/ai-calling-agents">AI calling agents:</Link>
                                    </strong>{" "}
                                    voice AI that answers inbound calls, runs
                                    outbound follow-ups, qualifies leads and books
                                    appointments into your calendar and CRM.
                                </li>
                                <li>
                                    <strong>
                                        <Link href="/ai-chatbots">AI chatbots:</Link>
                                    </strong>{" "}
                                    one bot for WhatsApp, Instagram, Messenger,
                                    TikTok and website chat, with lead capture and
                                    human handoff built in.
                                </li>
                                <li>
                                    <strong>
                                        <Link href="/website-development">Website development:</Link>
                                    </strong>{" "}
                                    fast, SEO-ready Next.js websites, web apps and
                                    e-commerce stores designed to convert.
                                </li>
                                <li>
                                    <strong>
                                        <Link href="/digital-marketing">Digital marketing and SEO:</Link>
                                    </strong>{" "}
                                    technical SEO, content, paid campaigns and
                                    marketing automation connected to the agents
                                    above.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 id="how-we-work">How a project runs</h2>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>
                                    A free discovery call to map your workflow and
                                    pick the automation with the fastest payback.
                                    You receive a fixed quote and delivery date.
                                </li>
                                <li>
                                    Build and review in short cycles. Chatbots ship
                                    in about three working days; standard websites
                                    in five to seven.
                                </li>
                                <li>
                                    Launch, connect channels and CRM, then tune
                                    with real customer conversations. Support is
                                    included.
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h2 id="why-trust">Why businesses trust Syenxa Tech</h2>
                            <p>
                                Since {siteConfig.foundingYear} we have delivered more than 300
                                projects. We publish our pricing signals, offer a
                                free chatbot trial, and measure success in booked
                                appointments and hours returned to your team
                                rather than in demos. If your business depends on
                                phone calls and messages,{" "}
                                <Link href="/contact">talk to us</Link> and we
                                will show you what an AI agent trained on your
                                scripts sounds like.
                            </p>
                        </section>
                    </div>
                }
            />
        </>
    );
}
