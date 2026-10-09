// Planning estimates, not fixed offers. Keep rates together for easy review.
export const websitePricing = {
    base: 200,
    includedPages: 5,
    extraPage: 35,
    maxPages: 20,
};

export const websiteAddOns = [
    { id: "cms", label: "Blog & content editor", description: "Publish articles and update agreed content yourself.", price: 95 },
    { id: "booking", label: "Appointment booking", description: "Connect an existing calendar or booking provider.", price: 95 },
    { id: "chatbot", label: "Website AI chatbot", description: "A starting setup for questions and enquiry capture.", price: 150 },
    { id: "crm", label: "Lead-to-CRM connection", description: "Send form enquiries to an agreed CRM workflow.", price: 125 },
];

export const websiteProjectTypes = [
    { id: "business", label: "Business website", description: "Services, portfolio & enquiries" },
    { id: "store", label: "Online store", description: "Products, payments & orders" },
    { id: "app", label: "Web app or portal", description: "Accounts & custom workflows" },
    { id: "custom", label: "Something different", description: "Let’s shape it together" },
];

export const websitePresets = [
    { id: "business", name: "Business", priceLabel: "From $200", description: "A focused home for your services, with a clear way to get in touch.", features: ["Up to 5 pages in this estimate", "Custom responsive design", "Contact & enquiry form"], pages: 5, addOns: [], projectType: "business" },
    { id: "content", name: "Grow", priceLabel: "From $400", description: "More room for your services. Fresh articles. A website that grows with you.", features: ["8 pages in this estimate", "Blog & content editor", "Everything in the business build"], pages: 8, addOns: ["cms"], projectType: "business" },
    { id: "custom", name: "Your idea", priceLabel: "Custom quote", description: "A store, a portal or an idea that needs its own plan. Build your brief below.", features: ["Tailored scope & integrations", "Talk through your requirements", "Fixed quote before work begins"], pages: 5, addOns: [], projectType: "custom" },
];

export function getWebsiteEstimate({ pages, addOns, projectType }) {
    const safePages = Math.min(websitePricing.maxPages, Math.max(1, Number(pages) || 1));
    const extraPages = Math.max(0, safePages - websitePricing.includedPages);
    const selectedAddOns = websiteAddOns.filter(item => addOns.includes(item.id));
    const lines = [
        { label: "Website design & build", price: websitePricing.base },
        ...(extraPages ? [{ label: `${extraPages} additional ${extraPages === 1 ? "page" : "pages"}`, price: extraPages * websitePricing.extraPage }] : []),
        ...selectedAddOns.map(item => ({ label: item.label, price: item.price })),
    ];
    return {
        pages: safePages,
        selectedAddOns,
        lines,
        needsCustomQuote: projectType !== "business",
        total: lines.reduce((sum, item) => sum + item.price, 0),
    };
}

export function formatWebsitePrice(amount) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export function getWebsiteBrief(config) {
    const estimate = getWebsiteEstimate(config);
    const projectType = websiteProjectTypes.find(item => item.id === config.projectType);
    return [
        "Website project brief — Syenxa Tech",
        `Project: ${projectType?.label || "Custom website"}`,
        `Pages: ${estimate.pages}`,
        `Features: ${estimate.selectedAddOns.map(item => item.label).join(", ") || "Standard business build"}`,
        ...(config.notes.trim() ? [`Custom requirements: ${config.notes.trim()}`] : []),
        estimate.needsCustomQuote ? "Price: custom quote after scope review" : `Planning estimate: ${formatWebsitePrice(estimate.total)} USD, one-time build`,
        ...(!estimate.needsCustomQuote ? estimate.lines.map(item => `${item.label}: ${formatWebsitePrice(item.price)}`) : []),
        "Indicative estimate only. Final scope and price confirmed before work begins. Hosting, domain and provider fees are separate.",
    ].join("\n");
}
