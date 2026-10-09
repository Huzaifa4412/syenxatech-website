"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const steps = [
    {
        name: "Listen", title: "Start with a real working day.",
        description: "Tell us where the questions arrive, what your team repeats and where customers get stuck. We look for a useful first change.",
        deliverable: "A shared understanding of the problem.",
        boardTitle: "The brief comes from your business.", boardLabel: "01 / Discovery notes",
        items: ["What customers ask most often", "How bookings and enquiries work today", "When a person needs to take over"],
        footer: "Your team’s experience shapes the scope.",
    },
    {
        name: "Map", title: "Make the next step clear.",
        description: "Agree the channels, content, integrations and handoff rules. We turn the conversation into a practical scope, a fixed quote and a delivery plan.",
        deliverable: "An agreed scope before the build begins.",
        boardTitle: "A small plan everyone can follow.", boardLabel: "02 / Agreed scope",
        items: ["Customer asks a question", "The system helps with the next step", "Your team handles the exceptions"],
        footer: "Channels, responsibilities and costs agreed together.",
    },
    {
        name: "Build", title: "Review something you can use.",
        description: "We build in short cycles. Try the conversation, explore the website and check the integrations on a working preview, then give us your feedback.",
        deliverable: "A working version for you to review.",
        boardTitle: "Put the experience through its paces.", boardLabel: "03 / Your review",
        items: ["Try the common customer questions", "Check the mobile experience", "Test the booking and team handoff"],
        footer: "Your feedback comes before the final handoff.",
    },
    {
        name: "Refine", title: "Launch with a clear handoff.",
        description: "Connect the agreed tools, review the launch checklist and show your team how it works. We agree the support and tuning needed as real conversations arrive.",
        deliverable: "A connected system and a practical support plan.",
        boardTitle: "Make the system part of the day.", boardLabel: "04 / Launch & handoff",
        items: ["Connect the agreed channels and tools", "Walk your team through the workflow", "Review what needs adjusting after launch"],
        footer: "Support scope is clear from the start.",
    },
];

export default function AboutProcess() {
    const id = useId();
    const tabRefs = useRef([]);
    const [active, setActive] = useState(0);
    const step = steps[active];

    function handleKey(event, index) {
        let next;
        if (event.key === "ArrowRight") next = (index + 1) % steps.length;
        if (event.key === "ArrowLeft") next = (index - 1 + steps.length) % steps.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = steps.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        setActive(next);
        tabRefs.current[next]?.focus();
    }

    return <div className="ap-process-explorer">
        <div className="ap-process-tabs" role="tablist" aria-label="How we work">
            {steps.map((item, index) => <button key={item.name} id={`${id}-tab-${index}`} ref={node => { tabRefs.current[index] = node; }} type="button" role="tab" aria-selected={active === index} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => handleKey(event, index)}><span>0{index + 1}</span>{item.name}<ArrowRight size={16} aria-hidden="true" /></button>)}
        </div>
        <div id={`${id}-panel`} className="ap-process-panel" role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
            <div className="ap-process-copy"><p className="sp-eyebrow">Step 0{active + 1} / {step.name}</p><h3>{step.title}</h3><p>{step.description}</p><div className="ap-process-deliverable"><span>You leave with</span><strong>{step.deliverable}</strong></div></div>
            <div className="ap-workboard"><div className="ap-workboard-top"><span>{step.boardLabel}</span><span aria-hidden="true">● ● ●</span></div><h4>{step.boardTitle}</h4><ul>{step.items.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}<Check size={15} aria-hidden="true" /></li>)}</ul><p>{step.footer}</p></div>
        </div>
    </div>;
}
