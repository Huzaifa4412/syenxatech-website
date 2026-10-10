"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function UseCaseJourney({ data }) {
    const [active, setActive] = useState(0);
    const prefix = useId();
    const refs = useRef([]);
    function onKeyDown(event) {
        let next;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (active + 1) % data.solutions.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (active - 1 + data.solutions.length) % data.solutions.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = data.solutions.length - 1;
        else return;
        event.preventDefault(); setActive(next); refs.current[next]?.focus();
    }
    return <div className="uc-journey-stage"><div className="uc-journey-tabs" role="tablist" aria-label="Explore the example journey">{data.solutions.map((item, i) => <button type="button" role="tab" key={item.title} id={`${prefix}-tab-${i}`} aria-controls={`${prefix}-panel-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} ref={node => { refs.current[i] = node; }} onClick={() => setActive(i)} onKeyDown={onKeyDown}><span>{String(i + 1).padStart(2, "0")}</span>{item.title}<ArrowRight size={16} /></button>)}</div><div className="uc-journey-panels">{data.solutions.map((item, i) => <div role="tabpanel" id={`${prefix}-panel-${i}`} aria-labelledby={`${prefix}-tab-${i}`} hidden={active !== i} tabIndex={0} key={item.title}><p className="uc-eyebrow">Step {i + 1} of {data.solutions.length} · illustrative journey</p><h3>{item.title}</h3><p>{item.description}</p><div className="uc-journey-example"><small>{i === 0 ? "The starting point" : i === 1 ? "The next stage" : "The useful outcome"}</small><p>{i === 0 ? `“${data.example.inquiry}”` : i === 1 ? data.solutions[2].description : data.example.outcome}</p></div><span className="uc-journey-note"><Check size={15} />Built around your information and business rules</span></div>)}</div></div>;
}
