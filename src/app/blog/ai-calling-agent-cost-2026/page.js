import Link from "next/link";
import SEOContentPage from "@/components/SEOContentPage";
import JsonLd from "@/components/JsonLd";
import { formatPostDate } from "@/lib/reading-time";
import { CostBarChart } from "@/components/illustrations/Charts";
import { generateFaqSchema, getLegacyPost, legacyPostMetadata, legacyPostSchemas } from "@/lib/seo";

const SLUG = "ai-calling-agent-cost-2026";

export const metadata = legacyPostMetadata(SLUG);

const headings = [
    { id: "short-answer", text: "The short answer" },
    { id: "pricing-models", text: "The three pricing models" },
    { id: "what-drives-cost", text: "What drives the cost" },
    { id: "monthly-examples", text: "Monthly cost examples for US businesses" },
    { id: "vs-alternatives", text: "AI agent vs receptionist vs answering service" },
    { id: "hidden-costs", text: "Hidden costs to ask about" },
    { id: "roi", text: "How to judge whether it pays off" },
    { id: "syenxa-pricing", text: "How Syenxa Tech prices AI calling agents" },
];

const faq = [
    {
        question: "What is the average cost of an AI calling agent per minute?",
        answer: "In 2026, infrastructure platforms where you assemble your own stack start around $0.05 to $0.15 per minute before speech and language model fees. Managed platforms with integrations and support typically charge $0.25 to $0.50 per minute, and fully managed business-grade services range up to $1.00 or more.",
    },
    {
        question: "Is there a setup fee for AI calling agents?",
        answer: "Usually, yes, when an agency builds a custom agent for you. The setup fee covers script and prompt design, voice selection, calendar and CRM integration, compliance configuration and testing. Self-serve platforms often skip the setup fee but charge a monthly subscription instead.",
    },
    {
        question: "Is an AI calling agent cheaper than a human receptionist?",
        answer: "For most US small businesses, significantly. A full-time receptionist costs $3,000 or more per month including benefits and covers one call at a time during business hours. An AI agent handling 200 calls a month typically costs $60 to $300 and answers every call, at any hour, in parallel.",
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

export default function AICallingAgentCostPost() {
    const post = getLegacyPost(SLUG);

    return (
        <>
            <JsonLd data={[...legacyPostSchemas(SLUG), generateFaqSchema(faq)]} />
            <SEOContentPage
                title={post.title}
                subtitle="Per-minute rates, setup fees, realistic monthly bills for US small businesses, and how voice AI stacks up against the human alternatives."
                category={post.category}
                date={formatPostDate(post.datePublished)}
                dateTime={post.datePublished}
                readingTime={post.readingTime}
                headings={headings}
                keywords={post.keywords}
                coverImage={{ src: post.image, alt: post.imageAlt }}
                faq={faq}
                keyTakeaways={[
                    "Managed AI calling agents in the US typically cost $0.25 to $0.50 per minute in 2026; a business handling 200 calls a month pays roughly $60 to $150 in usage.",
                    "Custom builds add a one-time setup fee that covers scripts, integrations and compliance; self-serve tools trade that for a monthly subscription.",
                    "Compared with a $3,000+ per month receptionist or a $300 to $900 answering service, AI is usually the lowest cost per answered call.",
                ]}
                content={
                    <div className="space-y-8">
                        <section>
                            <h2 id="short-answer">The short answer</h2>
                            <p>
                                An AI calling agent costs a US small business
                                between roughly $60 and $300 per month in usage
                                for about 200 calls, plus a one-time setup fee if
                                an agency builds it for you. Per-minute rates in
                                2026 range from $0.05 on bare infrastructure to
                                $1.00 or more for fully managed, business-grade
                                service, with most managed platforms landing at
                                $0.25 to $0.50 per minute (
                                <Src href="https://aircall.io/blog/best-practices/ai-voice-agent-cost/">Aircall</Src>,{" "}
                                <Src href="https://krispcall.com/call-contact-center/ai-phone-agent-pricing/">KrispCall</Src>
                                ).
                            </p>
                        </section>

                        <section>
                            <h2 id="pricing-models">The three pricing models</h2>
                            <Table
                                head={["Model", "Typical 2026 price", "Best for"]}
                                rows={[
                                    ["Per-minute usage", "$0.05 to $1.00 per minute", "Variable call volume; pay for what you use"],
                                    ["Per-call flat rate", "$0.50 to $1.50 per call", "Short, predictable calls such as confirmations"],
                                    ["Monthly subscription", "$79 to $300+ per month", "Steady volume; simpler budgeting"],
                                ]}
                            />
                            <p>
                                Custom-built agents from an agency usually combine
                                a one-time setup fee with per-minute usage. The
                                setup fee is what buys you a script trained on your
                                real calls, integrations with your calendar and
                                CRM, and compliance configuration for US calling
                                rules.
                            </p>
                        </section>

                        <section>
                            <h2 id="what-drives-cost">What drives the cost</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Call volume and length.</strong> Minutes are the unit. A 4-minute qualification call costs more than a 45-second appointment confirmation.</li>
                                <li><strong>Voice and model quality.</strong> Lower-latency, more natural voices and stronger language models cost more per minute but convert better.</li>
                                <li><strong>Integrations.</strong> Booking into Google Calendar or a CRM such as HubSpot, Salesforce or GoHighLevel adds setup work, not usage cost.</li>
                                <li><strong>Telephony.</strong> Phone numbers and carrier minutes are sometimes billed separately; ask whether they are included.</li>
                                <li><strong>Languages.</strong> English and Spanish are standard; additional languages may add cost.</li>
                                <li><strong>Managed vs self-serve.</strong> Self-serve platforms are cheaper per minute but you build, test and maintain the agent yourself.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 id="monthly-examples">Monthly cost examples for US businesses</h2>
                            <Table
                                head={["Business", "Calls / month", "Avg. length", "Est. usage at $0.35/min"]}
                                rows={[
                                    ["Dental clinic, inbound booking", "300", "2.5 min", "about $260"],
                                    ["Real estate team, lead qualification", "150", "4 min", "about $210"],
                                    ["Gym, class booking and renewals", "200", "1.5 min", "about $105"],
                                    ["Home services, quote requests", "120", "3 min", "about $125"],
                                ]}
                            />
                            <p>
                                These are usage estimates at a mid-range managed
                                rate; your quote depends on the actual rate,
                                volume and any telephony charges. The point is the
                                scale: most small businesses pay less for a month
                                of AI coverage than for a single day of a
                                receptionist's time.
                            </p>
                        </section>

                        <section>
                            <h2 id="vs-alternatives">AI agent vs receptionist vs answering service</h2>
                            <figure className="not-prose my-8 p-6 md:p-8 rounded-2xl bg-white border border-zinc-900/10">
                                <figcaption className="mb-4 font-display font-bold text-zinc-900">Monthly cost of phone coverage for about 200 calls (US, 2026)</figcaption>
                                <CostBarChart />
                                <p className="mt-3 text-xs text-zinc-500">Ranges from the pricing sources linked in this article.</p>
                            </figure>
                            <Table
                                head={["Option", "Typical monthly cost (US)", "Hours covered", "Simultaneous calls"]}
                                rows={[
                                    ["AI calling agent", "$60 to $300 usage", "24/7", "Unlimited"],
                                    ["In-house receptionist", "$3,000+ with benefits", "Business hours", "One"],
                                    ["Live answering service", "$300 to $900", "24/7 on higher plans", "Limited by staff"],
                                ]}
                            />
                            <p>
                                The comparison matters because of what missed
                                calls cost. Roughly 62% of calls to small
                                businesses go unanswered and up to 85% of those
                                callers never call back (
                                <Src href="https://oncrew.ai/resources/missed-call-statistics">missed call statistics</Src>
                                ). McKinsey has documented AI agents cutting cost
                                per call by around half in production deployments
                                (<Src href="https://www.cxtoday.com/contact-center/why-voice-ai-adoption-is-accelerating-in-2026/">CX Today</Src>).
                            </p>
                        </section>

                        <section>
                            <h2 id="hidden-costs">Hidden costs to ask about</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Separate charges for speech recognition, language model and text-to-speech on "bring your own keys" plans.</li>
                                <li>Phone number rental and carrier minutes.</li>
                                <li>Minimum monthly commitments or prepaid minute bundles that expire.</li>
                                <li>Fees for CRM connectors or calendar integrations.</li>
                                <li>Charges for call recording storage and transcripts.</li>
                                <li>Change requests after launch if prompt tuning is not included.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 id="roi">How to judge whether it pays off</h2>
                            <p>
                                Count last month's missed calls and multiply by
                                your average booking value and close rate. Add the
                                staff hours spent on routine booking and FAQ calls.
                                If that number is larger than the quoted monthly
                                cost, the agent pays for itself, and it usually is
                                by a wide margin. Contacting a lead within five
                                minutes makes a business 21 times more likely to
                                qualify it than waiting 30 minutes (
                                <Src href="https://www.chilipiper.com/article/speed-to-lead-statistics">MIT / InsideSales study</Src>
                                ), which is the other half of the return.
                            </p>
                        </section>

                        <section>
                            <h2 id="syenxa-pricing">How Syenxa Tech prices AI calling agents</h2>
                            <p>
                                We charge a fixed, quoted setup fee that covers
                                script design, voice selection, calendar and CRM
                                integration, TCPA and call-recording compliance
                                configuration and a test period. Usage is billed
                                per minute at a rate set by your volume and
                                languages. Unlimited concurrent calls, transcripts,
                                human handoff and ongoing tuning are included.
                                Every engagement starts with a free consultation
                                and a live demo on your own scripts. See the full
                                breakdown on our{" "}
                                <Link href="/ai-calling-agents">AI calling agents page</Link>{" "}
                                or <Link href="/contact">request a quote</Link>.
                            </p>
                        </section>
                    </div>
                }
            />
        </>
    );
}
