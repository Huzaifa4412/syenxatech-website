import SEOContentPage from "@/components/SEOContentPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "About Us | Syenxa Tech – AI Calling Agents & Digital Solutions",
    description:
        "Learn how Syenxa Tech is revolutionizing sales and customer support with AI Calling Agents. We empower businesses worldwide with intelligent, 24/7 digital solutions.",
    path: "/about",
    keywords: [
        "AI Calling Agents",
        "AI Voice Agents for Sales",
        "AI Customer Support Agents",
        "AI Appointment Booking Agents",
        "AI Automation Solutions",
        "Syenxa Tech AI solutions",
    ],
});

export default function AboutUs() {
    return (
        <SEOContentPage
            title="About Syenxa Tech"
            subtitle="AI Calling Agents & Digital Solutions"
            content={
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Revolutionizing Sales & Customer Support with AI
                            Calling Agents
                        </h2>
                        <p className="text-lg">
                            At Syenxa Tech, we believe every business deserves
                            smarter, faster, and more efficient ways to connect
                            with customers. That’s why we specialize in AI
                            Calling Agents—your 24/7 sales and support team that
                            never sleeps, never misses a call, and helps your
                            business grow effortlessly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Who We Are
                        </h2>
                        <p>
                            We are a leading AI and digital solutions company
                            based in the USA, dedicated to helping businesses
                            worldwide automate sales, customer support, and
                            appointment booking. Our focus is on creating
                            intelligent, reliable, and easy-to-use AI Calling
                            Agents that drive results. With Syenxa Tech,
                            businesses don't just adopt AI—they experience
                            measurable growth and increased customer engagement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Why Choose Our AI Calling Agents?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                    Boost Sales Effortlessly
                                </h3>
                                <p className="text-white/70">
                                    Our AI Calling Agents are designed to
                                    qualify leads, schedule appointments, and
                                    follow up with potential customers
                                    automatically, freeing your sales team to
                                    focus on closing deals.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                    Enhance Customer Support 24/7
                                </h3>
                                <p className="text-white/70">
                                    Never miss a call again. Our AI voice agents
                                    handle customer inquiries, provide accurate
                                    information, and ensure your clients feel
                                    valued—anytime, anywhere.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                    Cut Costs & Increase Efficiency
                                </h3>
                                <p className="text-white/70">
                                    Why pay for a full sales team when an AI
                                    Calling Agent can handle multiple calls
                                    simultaneously? Reduce operational costs
                                    while increasing productivity.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                    Customizable for Your Business
                                </h3>
                                <p className="text-white/70">
                                    Every business is unique, and so is every AI
                                    Calling Agent we create. Tailor voice
                                    scripts, scheduling, and sales workflows to
                                    match your brand’s voice and style.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Our Mission
                        </h2>
                        <p>
                            At Syenxa Tech, our mission is to empower businesses
                            worldwide with AI-driven solutions that make sales
                            and support smarter, faster, and more effective.
                            We're here to help you unlock growth, improve
                            customer experience, and stay ahead of the
                            competition.
                        </p>
                    </section>

                    <section className="bg-(--primary-color)/10 p-10 rounded-3xl border border-(--primary-color)/20 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl mb-8">
                            Imagine having a reliable sales and support team
                            that works 24/7, never gets tired, and helps close
                            more deals. That's what our AI Calling Agents do for
                            you.
                        </p>
                        <p className="text-lg">
                            Join hundreds of businesses worldwide that have
                            boosted sales and streamlined customer support with
                            Syenxa Tech. Contact us today and let's build your
                            AI-powered growth strategy.
                        </p>
                    </section>
                </div>
            }
            keywords={[
                "AI Calling Agents",
                "AI Voice Agents for Sales",
                "AI Customer Support Agents",
                "AI Appointment Booking Agents",
                "AI Automation Solutions",
                "Syenxa Tech AI solutions",
            ]}
        />
    );
}
