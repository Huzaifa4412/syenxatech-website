"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Globe, Instagram, MessageCircle, Send, Video, UserRound, CalendarCheck, MessagesSquare } from "lucide-react";

const scenarios = [
    { label: "Book a visit", icon: CalendarCheck, messages: [{ who: "customer", text: "Do you have a haircut appointment on Friday?" }, { who: "agent", text: "I can help with that. Would you prefer morning or afternoon?" }, { who: "customer", text: "Afternoon, please." }, { who: "agent", text: "There’s a 2:30 or 4:00 appointment on Friday. Which would you like?" }], outcome: "Booking intent captured", detail: "Service: haircut · Preferred day: Friday" },
    { label: "Answer a question", icon: MessagesSquare, messages: [{ who: "customer", text: "What should I bring to my first appointment?" }, { who: "agent", text: "Please bring photo ID and your insurance card, if you have one." }, { who: "customer", text: "Can I complete the form before I arrive?" }, { who: "agent", text: "Yes. I can point you to the intake form so you’re ready for your visit." }], outcome: "Question answered", detail: "Answers drawn from the business’s approved information" },
    { label: "Talk to a person", icon: UserRound, messages: [{ who: "customer", text: "I need to change a custom order. Can someone help?" }, { who: "agent", text: "Of course. What would you like to change? I’ll include it in a note for the team." }, { who: "customer", text: "The delivery address." }, { who: "agent", text: "I’ll route your request to a team member so they can check the order and help safely." }], outcome: "Human handoff requested", detail: "The team receives the conversation and its context" },
];

export function ChatbotPreview() {
    const [active, setActive] = useState(0);
    const id = useId();
    const refs = useRef([]);
    const scenario = scenarios[active];
    function keyboard(event) {
        let next;
        if (event.key === "ArrowRight") next = (active + 1) % scenarios.length;
        else if (event.key === "ArrowLeft") next = (active - 1 + scenarios.length) % scenarios.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = scenarios.length - 1;
        else return;
        event.preventDefault(); setActive(next); refs.current[next]?.focus();
    }
    return (
        <div className="sx-chat-demo">
            <div className="sx-chat-demo-header"><span className="sx-chat-avatar"><MessageCircle size={20} /></span><div><strong>Your business assistant</strong><span><i aria-hidden="true" />An example conversation</span></div><span className="sx-chat-demo-label">Try a scenario</span></div>
            <div className="sx-chat-scenario-tabs" role="tablist" aria-label="Chatbot conversation examples">{scenarios.map((item, i) => <button ref={el => { refs.current[i] = el; }} key={item.label} type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={active === i} aria-controls={`${id}-panel`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={keyboard}><item.icon size={14} />{item.label}</button>)}</div>
            <div id={`${id}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${id}-tab-${active}`}>
                <ol className="sx-chat-messages" aria-label="Illustrative conversation">{scenario.messages.map((message, i) => <li key={`${active}-${i}`} className={`sx-chat-message sx-chat-${message.who}`}><span>{message.who === "agent" ? "Assistant" : "Customer"}</span><p>{message.text}</p></li>)}</ol>
                <div className="sx-chat-outcome"><Check size={19} /><div><strong>{scenario.outcome}</strong><p>{scenario.detail}</p></div></div>
            </div>
            <p className="sx-chat-demo-caption">Interactive example. No message is sent or appointment booked.</p>
        </div>
    );
}

const channels = [
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, video: "/videos/whatsapp.webm", title: "Helpful answers in a familiar chat.", text: "Give customers a place to ask about services, availability or an order. Capture the details and bring your team into the conversation when it needs a person.", bullets: ["Answer product and service questions", "Capture booking and quote requests", "Connect order updates where integrated", "Hand conversations to your team"], use: "Useful for appointments, service enquiries and existing customers." },
    { id: "instagram", name: "Instagram", icon: Instagram, video: "/videos/instagram.webm", title: "Turn a DM into a real conversation.", text: "When someone asks about a post, a service or a price, help them take the next step. Keep the conversation useful and collect the context your team needs.", bullets: ["Respond to common DM questions", "Guide people to the right service or product", "Qualify enquiries with a few useful questions", "Route interested customers to your team"], use: "Useful for salons, stores and businesses discovered through social." },
    { id: "messenger", name: "Messenger", icon: Send, video: "/videos/messanger.webm", title: "Keep Facebook enquiries moving.", text: "Help people arriving from your Facebook page or campaigns. A clear conversation can answer the first question and make the next step easier.", bullets: ["Answer page and campaign enquiries", "Collect requirements before a team handoff", "Guide customers toward a booking or quote", "Connect follow-up to your workflow"], use: "Useful for local businesses and Facebook-led campaigns." },
    { id: "tiktok", name: "TikTok", icon: Video, video: "/videos/tiktok.webm", title: "Give interested viewers a next step.", text: "Plan a useful response to social enquiries, with the right qualification and handoff flow. We review account access and supported messaging features before implementation.", bullets: ["Organise frequent questions from social enquiries", "Connect campaign interest to an enquiry flow", "Collect useful context for sales follow-up", "Confirm supported account features during setup"], use: "Scope depends on platform permissions and the features available to your account." },
    { id: "website", name: "Website", icon: Globe, title: "A helpful front desk for your website.", text: "Answer questions while someone is exploring your site. Your assistant can guide them to the right page, capture an enquiry and offer a human handoff when needed.", bullets: ["Answer from your approved website information", "Recommend a useful service or next page", "Capture enquiries without a long form", "Connect to your booking or CRM workflow"], use: "Useful for visitors comparing services, prices and appointment options." },
];

export function ChatbotChannels() {
    const [active, setActive] = useState(0);
    const [failed, setFailed] = useState(false);
    const id = useId();
    const refs = useRef([]);
    const channel = channels[active];
    function select(index) { setActive(index); setFailed(false); }
    function keyboard(event) {
        let next;
        if (event.key === "ArrowRight") next = (active + 1) % channels.length;
        else if (event.key === "ArrowLeft") next = (active - 1 + channels.length) % channels.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = channels.length - 1;
        else return;
        event.preventDefault(); select(next); refs.current[next]?.focus();
    }
    return (
        <section className="sx-section sx-channels-section" id="channels" aria-labelledby="chat-channels-heading">
            <div className="sp-container">
                <div className="sx-heading-row"><div className="sx-section-heading"><p className="sp-eyebrow">Meet them where they are</p><h2 id="chat-channels-heading">Different channels.<br /><span>The same helpful business.</span></h2></div><p>Choose a channel to see the approach. Each setup uses your services, tone and handoff rules, with integrations agreed before we build.</p></div>
                <div role="tablist" aria-label="Chatbot channels" className="sx-channel-tabs">{channels.map((item, i) => <button key={item.id} ref={el => { refs.current[i] = el; }} type="button" role="tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={keyboard}><item.icon size={19} strokeWidth={1.6} />{item.name}</button>)}</div>
                <div role="tabpanel" id={`${id}-panel`} tabIndex={0} aria-labelledby={`${id}-tab-${active}`} className="sx-channel-panel">
                    <div className="sx-channel-copy"><p className="sp-eyebrow">{channel.name} AI chatbot</p><h3>{channel.title}</h3><p>{channel.text}</p><ul className="sx-checklist">{channel.bullets.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><p className="sx-small-note">{channel.use}</p><Link href="/contact" className="sp-link">Talk about your setup <ArrowRight size={17} /></Link></div>
                    <div className="sx-channel-media">
                        {channel.video ? <><div className="sx-channel-video-heading"><channel.icon size={17} /><span>{channel.name} demo</span><span>Press play</span></div><video key={channel.id} src={channel.video} poster={`/images/chatbot-demos/${channel.video.split('/').pop().replace('.webm', '')}-v1.webp`} controls playsInline preload="metadata" aria-label={`${channel.name} chatbot demonstration`} onError={() => setFailed(true)} />{failed && <p className="sx-video-error" role="status">The video couldn’t load. The channel details are available alongside it.</p>}<p className="sx-small-note">Example interface. Final flows and access depend on your setup.</p></> : <div className="sx-website-chat-stage"><Image src="/images/home-chat-service-v1.webp" alt="Orange and ivory conversation sculptures" width={1536} height={1024} sizes="(max-width: 767px) 90vw, 500px" /><div><Globe size={23} /><strong>Your site. A helpful conversation.</strong><p>Connect your approved answers, enquiry capture and team handoff in one website widget.</p></div></div>}
                    </div>
                </div>
            </div>
        </section>
    );
}
