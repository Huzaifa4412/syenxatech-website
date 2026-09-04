import Link from "next/link";
import SEOContentPage from "@/components/SEOContentPage";
import JsonLd from "@/components/JsonLd";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateWebPageSchema,
    siteConfig,
} from "@/lib/seo";

const title = "Terms of Service | Syenxa Tech";
const description =
    "Terms governing use of the Syenxa Tech website and the engagement terms for our AI calling agent, chatbot, website development and marketing services.";

export const metadata = createMetadata({
    title,
    description,
    path: "/terms-of-service",
});

const EFFECTIVE_DATE = "September 4, 2026";

const headings = [
    { id: "use-of-site", text: "Use of this website" },
    { id: "services", text: "Services and quotes" },
    { id: "payments", text: "Payments, trials and delivery" },
    { id: "client-responsibilities", text: "Client responsibilities" },
    { id: "ip", text: "Intellectual property" },
    { id: "liability", text: "Limitation of liability" },
    { id: "changes", text: "Changes and contact" },
];

export default function TermsOfServicePage() {
    return (
        <>
            <JsonLd
                data={[
                    generateWebPageSchema({ name: title, description, path: "/terms-of-service" }),
                    generateBreadcrumbSchema([{ name: "Terms of Service", path: "/terms-of-service" }]),
                ]}
            />
            <SEOContentPage
                title="Terms of Service"
                subtitle={`Effective ${EFFECTIVE_DATE}. By using this website or engaging Syenxa Tech for services you agree to these terms.`}
                category="Legal"
                backHref="/"
                backLabel="Home"
                headings={headings}
                content={
                    <div className="space-y-8">
                        <section>
                            <h2 id="use-of-site">Use of this website</h2>
                            <p>
                                The content on this website is provided for general
                                information about Syenxa Tech and its services. You
                                may browse and share links to our pages. You may
                                not copy, scrape or republish substantial portions
                                of the content, or use the site in any way that
                                disrupts its operation.
                            </p>
                        </section>

                        <section>
                            <h2 id="services">Services and quotes</h2>
                            <p>
                                Prices and delivery times shown on this website
                                (for example, chatbot setup fees, website starting
                                prices and typical delivery windows) are indicative.
                                The binding scope, price and timeline for any
                                project are set out in the written quote or
                                proposal we send after a discovery call. Work
                                begins when the quote is accepted in writing.
                            </p>
                        </section>

                        <section>
                            <h2 id="payments">Payments, trials and delivery</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Setup fees are payable as stated in the quote,
                                    typically in part before work starts and the
                                    balance on delivery.
                                </li>
                                <li>
                                    Usage-based charges for AI calling agents (for
                                    example per call minute) are billed as agreed in
                                    the proposal.
                                </li>
                                <li>
                                    Free chatbot trials run for the stated period on
                                    your channels; at the end of the trial you may
                                    proceed with the setup fee or discontinue with no
                                    charge.
                                </li>
                                <li>
                                    Third-party costs such as hosting, domains,
                                    telephony numbers, messaging platform fees and
                                    advertising spend are paid by the client to the
                                    provider unless the quote says otherwise.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 id="client-responsibilities">Client responsibilities</h2>
                            <p>
                                You are responsible for the accuracy of the
                                content, scripts and data you provide, for having
                                the right to use them, and for complying with laws
                                that apply to your communications, including call
                                recording, consent and marketing regulations in
                                your jurisdiction. AI agents and chatbots we build
                                act on the instructions and information you
                                approve.
                            </p>
                        </section>

                        <section>
                            <h2 id="ip">Intellectual property</h2>
                            <p>
                                On full payment, you own the custom deliverables
                                created for you, such as website code, designs and
                                conversation scripts. Syenxa Tech retains ownership
                                of its pre-existing tools, templates and know-how,
                                and grants you a license to use them as part of the
                                deliverables. Third-party software and platforms
                                remain subject to their own licenses.
                            </p>
                        </section>

                        <section>
                            <h2 id="liability">Limitation of liability</h2>
                            <p>
                                Services are provided with reasonable skill and
                                care. AI systems can produce unexpected outputs;
                                we design for human handoff and review, but we
                                cannot guarantee specific business results. To the
                                extent permitted by law, our total liability for any
                                claim relating to a project is limited to the fees
                                paid for that project, and we are not liable for
                                indirect or consequential losses.
                            </p>
                        </section>

                        <section>
                            <h2 id="changes">Changes and contact</h2>
                            <p>
                                We may update these terms from time to time; the
                                effective date above reflects the current version.
                                Questions can be sent to{" "}
                                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
                                or via our <Link href="/contact">contact page</Link>.
                                Our <Link href="/privacy-policy">privacy policy</Link>{" "}
                                explains how we handle personal information.
                            </p>
                        </section>
                    </div>
                }
            />
        </>
    );
}
