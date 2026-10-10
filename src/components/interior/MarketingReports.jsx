"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { marketingReportExamples, marketingReportSource } from "@/lib/marketing-report-examples";

export default function MarketingReports() {
    const [active, setActive] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const prefix = useId();
    const tabs = useRef([]);
    const dialog = useRef(null);
    const canvas = useRef(null);
    const report = marketingReportExamples[active];

    function onKeyDown(event) {
        let next;
        if (event.key === "ArrowRight") next = (active + 1) % marketingReportExamples.length;
        else if (event.key === "ArrowLeft") next = (active + marketingReportExamples.length - 1) % marketingReportExamples.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = marketingReportExamples.length - 1;
        else return;
        event.preventDefault();
        setActive(next);
        tabs.current[next]?.focus();
    }

    return (
        <section className="sx-section mk-reports" id="seo-reports" aria-labelledby={`${prefix}-heading`}>
            <div className="sp-container">
                <div className="sx-heading-row">
                    <div className="sx-section-heading"><p className="sp-eyebrow">Inside the SEO toolkit</p><h2 id={`${prefix}-heading`}>Real reports.<br /><span>Clearer decisions.</span></h2></div>
                    <p>Take a closer look at how SEO is measured. These original SEMrush screenshots show the reports behind keyword research, visibility reviews and traffic analysis.</p>
                </div>
                <div className="mk-report-shell">
                    <div className="mk-report-toolbar"><strong>SEMrush <span>/ report walkthrough</span></strong><span className="mk-example-label">Official product examples</span></div>
                    <div className="mk-report-tabs" role="tablist" aria-label="Explore SEO reports">
                        {marketingReportExamples.map((item, i) => <button key={item.id} ref={element => { tabs.current[i] = element; }} type="button" role="tab" id={`${prefix}-tab-${i}`} aria-controls={`${prefix}-panel`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={onKeyDown}><span>{item.number}</span>{item.label}<ArrowUpRight size={15} aria-hidden="true" /></button>)}
                    </div>
                    <div role="tabpanel" id={`${prefix}-panel`} tabIndex={0} aria-labelledby={`${prefix}-tab-${active}`} className="mk-report-panel">
                        <div className="mk-report-intro"><h3>{report.title}</h3><p>{report.description}</p></div>
                        <figure className="mk-report-figure">
                            <button type="button" className="mk-report-image" aria-label={`Enlarge SEMrush ${report.label.toLowerCase()} example`} aria-haspopup="dialog" onClick={() => { setZoomed(false); dialog.current.showModal(); }}>
                                <Image key={report.src} src={report.src} alt={report.alt} width={report.width} height={report.height} sizes="(max-width: 767px) 92vw, 1150px" quality={90} />
                                <span><Maximize2 size={15} />Explore screenshot</span>
                            </button>
                            <figcaption>{report.context}. Examples are from SEMrush documentation; they are not Syenxa Tech or client results.</figcaption>
                        </figure>
                        <dl className="mk-report-insights">{report.insights.map((item, i) => <div key={item.label}><dt><span>0{i + 1}</span>{item.label}</dt><dd>{item.text}</dd></div>)}</dl>
                        <div className="mk-report-action"><ArrowRight size={20} aria-hidden="true" /><div><span>How this informs the work</span><p>{report.action}</p></div></div>
                    </div>
                    <div className="mk-report-source"><p>SEMrush traffic figures are estimates. Search Console and GA4 provide first-party search and website activity data.</p><a href={marketingReportSource} target="_blank" rel="noopener noreferrer">View the SEMrush source <ArrowUpRight size={15} /></a></div>
                </div>
            </div>
            <dialog ref={dialog} className="mk-report-dialog" aria-labelledby={`${prefix}-dialog-heading`} onClose={() => setZoomed(false)} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
                <div className="mk-dialog-toolbar"><h3 id={`${prefix}-dialog-heading`}>SEMrush · {report.label}</h3><button type="button" aria-pressed={zoomed} onClick={() => { setZoomed(value => !value); canvas.current?.scrollTo(0, 0); }}>{zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}{zoomed ? "Fit image" : "Zoom in"}</button><button type="button" autoFocus aria-label="Close SEMrush screenshot" onClick={() => dialog.current.close()}><X size={22} /></button></div>
                <div ref={canvas} tabIndex={0} className={`mk-dialog-canvas${zoomed ? " is-zoomed" : ""}`} aria-label="Report image; zoom in and scroll to read the detail"><Image src={report.src} alt={report.alt} width={report.width} height={report.height} sizes={`${report.width}px`} quality={95} style={{ "--mk-image-width": `${report.width}px` }} /></div>
                <p className="mk-dialog-caption">Official SEMrush product example · Historical data · Not a client result</p>
            </dialog>
        </section>
    );
}
