import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Check, MessageCircle, UserRound } from "lucide-react";
import PageHero from "@/components/interior/PageHero";
import PageClosing from "@/components/interior/PageClosing";
import ServiceFaq from "@/components/interior/ServiceFaq";
import { ChatbotPreview, ChatbotChannels } from "@/components/interior/ChatbotExperience";
import { aiChatbotFaqs } from "@/lib/faqs";
import "@/components/interior/service-pages.css";

export default function AIChatbotsClient() {
    return (
        <main className="site-page sx-chatbot-page">
            <PageHero eyebrow="Custom AI chatbots" title="Good answers." accent="Less waiting."
                description="Answer everyday questions, guide customers to a next step and bring your team into the conversation when they need a person. Built around your services and tone."
                visual={<ChatbotPreview />} caption="Choose a scenario to explore the conversation. Your final bot uses your own approved information."
                primary={{ href: "/contact", label: "Start your 7-day trial" }} secondary={{ href: "#channels", label: "Explore the channels" }}
                facts={[{ value: "3 working days", label: "Typical delivery" }, { value: "$150–$350", label: "One-time setup" }, { value: "7 days", label: "Free trial" }]} />
            <div className="sx-discipline-strip sp-container" aria-label="Chatbot capabilities">{["Your business knowledge", "Your brand voice", "Useful enquiry capture", "Human handoff"].map(text => <span key={text}><Check size={15} />{text}</span>)}</div>
            <section className="sx-section sx-chat-capabilities">
                <div className="sp-container sx-split">
                    <div className="sx-chat-photo"><Image src="/images/home-chat-service-v1.webp" alt="Orange and ivory conversation sculptures in a sunlit studio" fill sizes="(max-width: 900px) 90vw, 550px" /><div className="sx-chat-photo-label"><MessageCircle size={25} strokeWidth={1.6} /><div><strong>Made for your conversations.</strong><span>Your services, your tone and your next steps.</span></div></div></div>
                    <div className="sx-section-heading"><p className="sp-eyebrow">A helpful extension of your team</p><h2>Less repeating yourself.<br /><span>More time for people.</span></h2><p>Your team shouldn’t have to type the same opening answer all day. Give customers a useful place to start, while your people focus on the conversations that need them.</p><div className="sx-capability-list">{[
                        { icon: BookOpen, title: "Knows your business", text: "Answers from approved service details, policies and frequently asked questions. You review the information before launch." },
                        { icon: MessageCircle, title: "Asks useful questions", text: "Captures the enquiry and the details needed for a quote, booking or next step." },
                        { icon: UserRound, title: "Knows when to hand over", text: "Routes requests that need judgment or approval to your team, with the conversation context." },
                    ].map(item => <div key={item.title}><item.icon size={21} strokeWidth={1.6} /><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div>
                </div>
            </section>
            <ChatbotChannels />
            <section className="sx-section" id="pricing">
                <div className="sp-container sx-chat-price-layout">
                    <div className="sx-chat-price-card"><p className="sp-eyebrow">Your chatbot, made for your business</p><p className="sx-chat-price">$150–$350</p><p>USD · One-time setup, based on channels and integrations.</p><dl className="sx-chat-price-meta"><div><dt>Free live trial</dt><dd>7 days</dd></div><div><dt>Typical delivery</dt><dd>3 working days</dd></div></dl><ul className="sx-checklist"><li><Check size={16} />Your approved knowledge and conversation flow</li><li><Check size={16} />Channel setup and agreed integrations</li><li><Check size={16} />Enquiry capture and human handoff rules</li><li><Check size={16} />Review and refinements during the trial</li></ul><Link href="/contact" className="sp-button">Talk about your chatbot <ArrowUpRight size={18} /></Link><p className="sx-small-note">No monthly fee from Syenxa Tech. Applicable platform and provider fees are separate. Complex integrations can take longer.</p></div>
                    <div className="sx-section-heading"><p className="sp-eyebrow">Try it in your world</p><h2>Hear the answers.<br /><span>Then make it yours.</span></h2><p>The trial is a chance to check the questions, the tone and the handoff flow before final delivery.</p><ol className="sx-chat-trial-steps">{[
                        { title: "Share how your business works", text: "Tell us your services, common questions, channels and the moments that need a human." },
                        { title: "Review your working chatbot", text: "Test real questions, check the answers and review any booking or CRM integrations in scope." },
                        { title: "Refine it together", text: "Use the 7-day trial to share feedback and tune the conversation before final handoff." },
                    ].map((item, i) => <li key={item.title}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div>
                </div>
            </section>
            <ServiceFaq faqs={aiChatbotFaqs} title="A few questions before hello." description="Channels, cost, setup and the moments that need a person." />
            <PageClosing title="Give your customers a useful first answer." description="Tell us where the questions arrive. We’ll help you choose the right channels and plan a chatbot around your business." label="Start your 7-day trial" />
        </main>
    );
}
