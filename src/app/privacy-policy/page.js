import Link from "next/link";
import SEOContentPage from "@/components/SEOContentPage";
import JsonLd from "@/components/JsonLd";
import {
    createMetadata,
    generateBreadcrumbSchema,
    generateWebPageSchema,
    siteConfig,
} from "@/lib/seo";

const title = "Privacy Policy | Syenxa Tech";
const description =
    "How Syenxa Tech collects, uses and protects personal information submitted through our website, contact forms, chat widget and booking tools.";

export const metadata = createMetadata({
    title,
    description,
    path: "/privacy-policy",
});

const EFFECTIVE_DATE = "September 4, 2026";

const headings = [
    { id: "information-we-collect", text: "Information we collect" },
    { id: "how-we-use", text: "How we use information" },
    { id: "cookies", text: "Cookies and analytics" },
    { id: "third-parties", text: "Third-party services" },
    { id: "retention", text: "Data retention and security" },
    { id: "your-rights", text: "Your rights" },
    { id: "contact", text: "Contact" },
];

export default function PrivacyPolicyPage() {
    return (
        <>
            <JsonLd
                data={[
                    generateWebPageSchema({ name: title, description, path: "/privacy-policy" }),
                    generateBreadcrumbSchema([{ name: "Privacy Policy", path: "/privacy-policy" }]),
                ]}
            />
            <SEOContentPage
                title="Privacy Policy"
                subtitle={`Effective ${EFFECTIVE_DATE}. This policy explains what information Syenxa Tech collects through this website and how it is used.`}
                category="Legal"
                backHref="/"
                backLabel="Home"
                headings={headings}
                content={
                    <div className="space-y-8">
                        <section>
                            <h2 id="information-we-collect">Information we collect</h2>
                            <p>
                                When you contact us through a form on this site,
                                we collect the details you provide, typically your
                                name, email address, phone number, the service you
                                are interested in and your message. Our contact
                                forms open a pre-filled WhatsApp message to our
                                business number, so the information you send is
                                also processed by WhatsApp under its own privacy
                                terms.
                            </p>
                            <p>
                                If you book a consultation through the embedded
                                Cal.com scheduler, Cal.com collects the details
                                needed to create the booking. If you use the chat
                                widget, the messages you type are processed by our
                                automation platform so we can respond.
                            </p>
                        </section>

                        <section>
                            <h2 id="how-we-use">How we use information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To respond to your inquiry and provide quotes or demos.</li>
                                <li>To schedule and deliver consultations and services you request.</li>
                                <li>To improve the website and understand which pages are useful.</li>
                                <li>To measure the performance of our marketing campaigns.</li>
                            </ul>
                            <p>
                                We do not sell personal information. We share it
                                only with the service providers listed below, as
                                needed to run this website and respond to you.
                            </p>
                        </section>

                        <section>
                            <h2 id="cookies">Cookies and analytics</h2>
                            <p>
                                This site uses Vercel Analytics to collect
                                aggregated, privacy-focused usage statistics such
                                as page views and referrers. It may also use the
                                Meta (Facebook) Pixel to measure the effectiveness
                                of our advertising on Facebook and Instagram. The
                                Pixel sets cookies and may share browsing events
                                with Meta. You can control cookies in your browser
                                settings and opt out of Meta advertising
                                personalization in your Meta account settings.
                            </p>
                        </section>

                        <section>
                            <h2 id="third-parties">Third-party services</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Vercel:</strong> website hosting and analytics.</li>
                                <li><strong>WhatsApp (Meta):</strong> delivery of contact form messages.</li>
                                <li><strong>Meta Pixel:</strong> advertising measurement.</li>
                                <li><strong>Cal.com:</strong> consultation scheduling.</li>
                                <li><strong>YouTube (privacy-enhanced embed):</strong> demo video playback.</li>
                                <li><strong>Google Fonts (served from our domain):</strong> typography.</li>
                            </ul>
                            <p>
                                Each provider processes data under its own privacy
                                policy. Links to their policies are available on
                                request.
                            </p>
                        </section>

                        <section>
                            <h2 id="retention">Data retention and security</h2>
                            <p>
                                We keep inquiry details for as long as needed to
                                respond and, if you become a client, for the
                                duration of our relationship and any period
                                required by law. We use reasonable technical and
                                organizational measures to protect information,
                                including HTTPS across the site.
                            </p>
                        </section>

                        <section>
                            <h2 id="your-rights">Your rights</h2>
                            <p>
                                Depending on where you live, you may have the right
                                to access, correct or delete the personal
                                information we hold about you, or to object to
                                certain processing. To exercise these rights, email
                                us at the address below and we will respond within
                                30 days.
                            </p>
                        </section>

                        <section>
                            <h2 id="contact">Contact</h2>
                            <p>
                                Questions about this policy can be sent to{" "}
                                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
                                or through our <Link href="/contact">contact page</Link>.
                                We may update this policy from time to time; the
                                effective date above reflects the latest version.
                            </p>
                        </section>
                    </div>
                }
            />
        </>
    );
}
