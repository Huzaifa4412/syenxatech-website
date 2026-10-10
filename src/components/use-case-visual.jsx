import Image from "next/image";
import { ArrowRight, Check, Globe2, MessageCircle, Phone, Search, Workflow } from "lucide-react";

const icons = { voice: Phone, website: Globe2, chatbot: MessageCircle, marketing: Search, automation: Workflow, apps: Globe2 };

export default function UseCaseVisual({ data, compact = false }) {
    const Icon = icons[data.service];
    if (compact) return <div className={`uc-mini uc-mini-${data.service}`} aria-hidden="true"><Icon size={17} /><span>{data.solutions[0].title}</span><ArrowRight size={15} /><span>{data.solutions[2].title}</span></div>;
    return <div className={`uc-preview uc-preview-${data.service}`}>
        <div className="uc-preview-top"><span><Icon size={16} />{data.industry}</span><span>Example experience</span></div>
        {data.service === "website" ? <>
            <div className="uc-browser-bar"><i /><i /><i /><span>{data.industry.toLowerCase()} / explore</span></div>
            <div className="uc-website-demo"><div><p>{data.industry}</p><strong>{data.title}<br /><em>{data.accent}</em></strong><span className="uc-demo-action">Explore the next step <ArrowRight size={13} /></span></div><div className="uc-website-photo"><Image src={data.image} alt={data.imageAlt} fill sizes="(max-width:767px) 40vw, 240px" /></div></div>
            <div className="uc-preview-bottom">{["Discover", "Compare", "Enquire"].map(text => <span key={text}><Check size={12} />{text}</span>)}</div>
        </> : data.service === "voice" || data.service === "chatbot" ? <>
            {data.service === "voice" && <div className="uc-wave" aria-hidden="true">{Array.from({length: 28}, (_, i) => <i key={i} style={{height: `${12 + ((i * 19) % 43)}px`}} />)}</div>}
            <div className="uc-message uc-message-customer"><small>Customer</small><p>{data.example.inquiry}</p></div>
            <div className="uc-message uc-message-team"><small>{data.service === "voice" ? "Calling assistant" : "Chat assistant"}</small><p>{data.example.response}</p></div>
            <div className="uc-preview-outcome"><Check size={17} /><div><strong>Ready for your team</strong><p>{data.example.outcome}</p></div></div>
        </> : data.service === "marketing" ? <>
            <div className="uc-campaign-photo"><Image src={data.image} alt={data.imageAlt} fill sizes="(max-width:767px) 90vw, 540px" /><div><span>From discovery to action</span><strong>{data.title}</strong></div></div>
            <div className="uc-marketing-path"><span>Relevant audience</span><ArrowRight size={14} /><span>Useful destination</span><ArrowRight size={14} /><span>Clear action</span></div>
        </> : <div className="uc-system-flow"><div className="uc-system-input"><span>Incoming request</span><p>{data.example.inquiry}</p></div>{data.solutions.map((item, i) => <div className="uc-system-step" key={item.title}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item.title}</strong><Check size={16} /></div>)}<div className="uc-system-output"><span>Next action ready</span><p>{data.example.outcome}</p></div></div>}
        <p className="uc-preview-note">Illustrative flow · configured around your business</p>
    </div>;
}
