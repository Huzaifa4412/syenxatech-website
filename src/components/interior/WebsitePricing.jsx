"use client";

import { useId, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Minus, Plus, RotateCcw } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { siteConfig } from "@/lib/seo";
import { formatWebsitePrice, getWebsiteBrief, getWebsiteEstimate, websiteAddOns, websitePresets, websitePricing, websiteProjectTypes } from "@/lib/website-pricing";
import "./website-pricing.css";

const initialConfig = { projectType: "business", pages: 5, addOns: [], notes: "" };

export default function WebsitePricing() {
    const id = useId();
    const calculatorRef = useRef(null);
    const enquiryRef = useRef(null);
    const [config, setConfig] = useState(initialConfig);
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [copyStatus, setCopyStatus] = useState("");
    const estimate = getWebsiteEstimate(config);
    const brief = getWebsiteBrief(config);

    function updateConfig(values) {
        setConfig(previous => ({ ...previous, ...values }));
        setCopyStatus("");
    }

    function choosePreset(preset) {
        updateConfig({ projectType: preset.projectType, pages: preset.pages, addOns: [...preset.addOns] });
        calculatorRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        calculatorRef.current?.focus({ preventScroll: true });
    }

    function setPages(value) {
        updateConfig({ pages: Math.min(websitePricing.maxPages, Math.max(1, Number(value) || 1)) });
    }

    function toggleAddOn(value) {
        updateConfig({ addOns: config.addOns.includes(value) ? config.addOns.filter(item => item !== value) : [...config.addOns, value] });
    }

    async function copyBrief() {
        try {
            await navigator.clipboard.writeText(brief);
            setCopyStatus("Project brief copied. Paste it into an email or save it for later.");
        } catch {
            setCopyStatus("Copy is unavailable in this browser. Use the enquiry form to include your brief.");
        }
    }

    function openQuote() {
        setQuoteOpen(true);
        // The form stays mounted so edits to the calculator preserve contact details.
        requestAnimationFrame(() => {
            enquiryRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
            enquiryRef.current?.focus({ preventScroll: true });
        });
    }

    return <section id="pricing" className="sx-section wp-section" aria-labelledby={`${id}-heading`}>
        <div className="sp-container">
            <header className="wp-heading">
                <div><p className="sp-eyebrow">A little clarity before we talk</p><h2 id={`${id}-heading`}>Your next website.<br /><span>Your kind of budget.</span></h2></div>
                <div className="wp-heading-intro"><p>A custom website from $200. Choose a starting point, add what your business needs and see your estimate take shape.</p><a href="#website-calculator" className="sp-link">Go straight to the calculator<ArrowDown size={15} aria-hidden="true" /></a></div>
            </header>

            <div className="wp-presets" aria-label="Website package starting points">
                {websitePresets.map((preset, index) => <article key={preset.id} className={`wp-preset${index === 0 ? " wp-preset-featured" : ""}`}>
                    <div className="wp-preset-top"><span>0{index + 1} / {preset.name}</span>{index === 0 && <span className="wp-preset-tag">A clear starting point</span>}</div>
                    <h3>{preset.priceLabel}</h3><p>{preset.description}</p>
                    <ul>{preset.features.map(feature => <li key={feature}><Check size={14} aria-hidden="true" />{feature}</li>)}</ul>
                    <button type="button" onClick={() => choosePreset(preset)} className="wp-preset-button">{index === 2 ? "Build a custom brief" : `Explore ${preset.name.toLowerCase()}`}<ArrowDown size={16} aria-hidden="true" /></button>
                </article>)}
            </div>
            <p className="wp-preset-note">USD · One-time build estimates. Final scope and pricing are confirmed together before work starts.</p>

            <div id="website-calculator" ref={calculatorRef} tabIndex={-1} className="wp-calculator" aria-labelledby={`${id}-calculator-title`}>
                <div className="wp-builder">
                    <div className="wp-builder-heading"><div><p className="sp-eyebrow">Make room for your ideas</p><h3 id={`${id}-calculator-title`}>Build your website estimate.</h3></div><button type="button" className="wp-reset" onClick={() => { setConfig(initialConfig); setCopyStatus(""); }}><RotateCcw size={14} aria-hidden="true" />Reset</button></div>
                    <div className="wp-mobile-estimate"><div><small>{estimate.needsCustomQuote ? "Built around your scope" : "Your planning estimate"}</small><strong>{estimate.needsCustomQuote ? "Custom quote" : formatWebsitePrice(estimate.total)}</strong></div><a href="#website-estimate">View breakdown<ArrowDown size={14} aria-hidden="true" /></a></div>
                    <fieldset className="wp-fieldset"><legend><span>01</span>What are we building?</legend><div className="wp-project-types">{websiteProjectTypes.map(type => <label key={type.id} className={`wp-type${config.projectType === type.id ? " is-selected" : ""}`}><input type="radio" name={`${id}-project-type`} value={type.id} checked={config.projectType === type.id} onChange={() => updateConfig({ projectType: type.id })} /><span><strong>{type.label}</strong><small>{type.description}</small></span></label>)}</div></fieldset>

                    <fieldset className="wp-fieldset"><legend><span>02</span>How much space do you need?</legend><div className="wp-pages-heading"><div><label htmlFor={`${id}-pages`}>Number of pages</label><p>Up to 5 included in the base estimate. Then {formatWebsitePrice(websitePricing.extraPage)} per page.</p></div><div className="wp-stepper"><button type="button" aria-label="Remove one page" disabled={config.pages === 1} onClick={() => setPages(config.pages - 1)}><Minus size={16} aria-hidden="true" /></button><input id={`${id}-pages`} type="number" min="1" max={websitePricing.maxPages} value={config.pages} onChange={event => setPages(event.target.value)} /><button type="button" aria-label="Add one page" disabled={config.pages === websitePricing.maxPages} onClick={() => setPages(config.pages + 1)}><Plus size={16} aria-hidden="true" /></button></div></div><input className="wp-range" type="range" min="1" max={websitePricing.maxPages} value={config.pages} onChange={event => setPages(event.target.value)} aria-label="Page count slider" /><div className="wp-range-labels"><span>1 page</span><span>20 pages · Larger? Add a note below.</span></div></fieldset>

                    <fieldset className="wp-fieldset"><legend><span>03</span>Give it a little more ability.</legend><p className="wp-field-help">Choose what helps your customers. Leave the rest.</p><div className="wp-addons">{websiteAddOns.map(item => <label key={item.id} className={`wp-addon${config.addOns.includes(item.id) ? " is-selected" : ""}`}><input type="checkbox" checked={config.addOns.includes(item.id)} onChange={() => toggleAddOn(item.id)} /><span><strong>{item.label}</strong><small>{item.description}</small></span><span className="wp-addon-price">+{formatWebsitePrice(item.price)}</span></label>)}</div></fieldset>

                    <div className="wp-custom-note"><label htmlFor={`${id}-notes`}>Something more specific?</label><p>Tell us about extra languages, products, migrations or an integration you have in mind.</p><textarea id={`${id}-notes`} value={config.notes} onChange={event => updateConfig({ notes: event.target.value })} rows={3} maxLength={1500} placeholder="For example: a bilingual salon website with online bookings…" /><small>Notes travel with your brief. Bespoke work is priced after a scope review.</small></div>
                </div>

                <div className="wp-summary-rail"><aside id="website-estimate" className="wp-summary" aria-label="Your website estimate">
                    <div className="wp-summary-top"><span>Syenxa Tech / Your build</span><span className="wp-live"><span aria-hidden="true" />Live estimate</span></div>
                    <div className="wp-mini-browser" aria-hidden="true"><div className="wp-browser-bar"><span>● ● ●</span><span>your-business.com</span></div><div className="wp-browser-content"><div className="wp-browser-copy"><span>A place to make</span><strong>your business<br />feel at home.</strong><span className="wp-browser-cta">Let’s talk ↗</span></div><div className="wp-browser-art"><span /><span /><span /></div></div><div className="wp-browser-footer"><span>{estimate.pages} {estimate.pages === 1 ? "page" : "pages"}</span><span>{estimate.selectedAddOns.length} {estimate.selectedAddOns.length === 1 ? "extra" : "extras"}</span><span>Built for you</span></div></div>
                    <div className="wp-total" aria-live="polite" aria-atomic="true"><p>{estimate.needsCustomQuote ? "A project with its own plan" : "Your estimated investment"}</p><strong>{estimate.needsCustomQuote ? "Let’s scope it." : formatWebsitePrice(estimate.total)}</strong><span>{estimate.needsCustomQuote ? "Custom quote after a free discovery call" : "USD · One-time website build"}</span></div>
                    {estimate.needsCustomQuote ? <div className="wp-custom-summary"><p>Stores, portals and bespoke workflows need a closer look. We’ll review your brief and agree a fixed price before work begins.</p><ul><li>{websiteProjectTypes.find(type => type.id === config.projectType)?.label}</li><li>{estimate.pages} planned pages</li>{estimate.selectedAddOns.map(item => <li key={item.id}>{item.label}</li>)}</ul></div> : <dl className="wp-breakdown">{estimate.lines.map(line => <div key={line.label}><dt>{line.label}</dt><dd>{formatWebsitePrice(line.price)}</dd></div>)}<div className="wp-breakdown-total"><dt>Estimated total</dt><dd>{formatWebsitePrice(estimate.total)}</dd></div></dl>}
                    <div className="wp-included"><strong>Good foundations come as standard.</strong><p>Custom design, mobile layouts, technical SEO, an enquiry form and launch setup.</p></div>
                    <button type="button" className="sp-button wp-quote-button" onClick={openQuote} aria-expanded={quoteOpen} aria-controls={`${id}-enquiry`}>{estimate.needsCustomQuote ? "Discuss my custom project" : "Discuss this estimate"}<ArrowUpRight size={18} aria-hidden="true" /></button>
                    <button type="button" className="wp-copy" onClick={copyBrief}><Copy size={14} aria-hidden="true" />Copy my project brief</button><p className="wp-copy-status" role="status">{copyStatus}</p>
                    <p className="wp-terms">A planning estimate, not a final quote. Hosting, domain, payment processing and provider fees are separate. Complex integrations and ongoing care are quoted individually.</p>
                </aside></div>
            </div>
            <div className="wp-foundations"><span><Check size={15} aria-hidden="true" />You own the code & design</span><span><Check size={15} aria-hidden="true" />A fixed quote before we start</span><span><Check size={15} aria-hidden="true" />Domain & hosting setup included</span></div>

            <div id={`${id}-enquiry`} ref={enquiryRef} tabIndex={-1} className="wp-enquiry" hidden={!quoteOpen}>
                <div><p className="sp-eyebrow">From estimate to a real plan</p><h3>Tell us about the business behind it.</h3><p>Your current selections will be included with your enquiry. You can keep adjusting the calculator without losing your contact details.</p><pre className="wp-brief-preview">{brief}</pre><p className="wp-enquiry-note">The form opens WhatsApp with your message ready. You review it and press send there.</p></div>
                <ContactForm fallbackEmail={siteConfig.email} serviceOptions={["Website development"]} messageLabel="A little about your business" messagePlaceholder="What does your business do, and what should the new website help customers do?" inquiryContext={brief} />
            </div>
        </div>
    </section>;
}
