export const siteConfig = {
    name: "Syenxa Tech",
    legalName: "Syenxa Tech",
    // The live site is served from the www host (the bare domain redirects to it),
    // so every canonical, sitemap entry and schema @id must use www as well.
    url: "https://www.syenxatech.com",
    title: "AI Calling Agents & Digital Solutions | Syenxa Tech",
    description:
        "Syenxa Tech builds AI calling agents, chatbots, websites, apps, and automation solutions that help businesses capture leads, support customers, and scale operations.",
    ogImage: "/og-image.jpg",
    logo: "/logo-mark.png",
    email: "syenxatech@gmail.com",
    phone: "+1 289 796-3492",
    phoneHref: "tel:+12897963492",
    foundingYear: "2014",
    socials: {
        linkedin: "https://www.linkedin.com/company/syenxatech",
        instagram: "https://www.instagram.com/syenxatech/",
        facebook: "https://www.facebook.com/people/SyenxaTech/61584113090992/",
    },
};

/** Single date bumped whenever site-wide copy changes; per-route dates override it. */
export const SITE_LAST_UPDATED = "2026-09-04";

/**
 * Legacy blog posts that live as static routes under /blog/<slug>.
 * Posts published in Sanity take precedence when a slug collides.
 */
export const blogPosts = [
    {
        title: "How Much Do AI Calling Agents Cost in 2026? US Pricing Guide",
        metaTitle: "AI Calling Agent Cost in 2026: US Pricing Guide | Syenxa Tech",
        slug: "ai-calling-agent-cost-2026",
        image: "/covers/ai-calling-agent-cost-2026.jpg",
        imageAlt: "Cover: how much AI calling agents cost in 2026, US pricing guide by Syenxa Tech",
        description:
            "AI calling agent pricing in 2026: per-minute rates, setup fees, monthly costs for US small businesses, and how voice AI compares with human alternatives.",
        excerpt:
            "What US businesses actually pay for AI calling agents in 2026, with per-minute rates, setup fees and a comparison against human alternatives.",
        keywords: ["AI Calling Agent Cost", "AI Voice Agent Pricing", "AI Answering Service Cost"],
        category: "AI Calling Agents",
        datePublished: "2026-09-04",
        dateModified: "2026-09-04",
        readingTime: 7,
    },
    {
        title: "How Much Does a Small Business Website Cost in the USA? (2026)",
        metaTitle: "Small Business Website Cost in the USA (2026) | Syenxa Tech",
        slug: "small-business-website-cost-usa-2026",
        image: "/covers/small-business-website-cost-usa-2026.jpg",
        imageAlt: "Cover: small business website cost in the USA for 2026 by Syenxa Tech",
        description:
            "2026 US website costs by build type: DIY, freelancer, agency and Syenxa Tech. What drives the price, ongoing costs, and how to budget without overpaying.",
        excerpt:
            "A 2026 breakdown of what US small businesses pay for a website, what drives the price, and how to budget for hosting and maintenance.",
        keywords: ["Website Development Cost", "Small Business Website Cost", "Web Design Pricing USA"],
        category: "Website Development",
        datePublished: "2026-09-04",
        dateModified: "2026-09-04",
        readingTime: 7,
    },
    {
        title: "How AI Calling Agents Are Transforming Sales Worldwide",
        metaTitle: "How AI Calling Agents Are Transforming Sales | Syenxa Tech",
        slug: "how-ai-calling-agents-are-transforming-sales",
        image: "/covers/how-ai-calling-agents-are-transforming-sales.jpg",
        imageAlt: "Cover: how AI calling agents are transforming sales, by Syenxa Tech",
        description:
            "How AI calling agents cut speed-to-lead to seconds, qualify prospects and book meetings 24/7, plus a step-by-step rollout plan for sales teams.",
        excerpt:
            "Discover how intelligent voice AI is revolutionizing the sales landscape and boosting revenue for businesses globally.",
        keywords: ["AI Calling Agents", "Voice AI for Sales", "Sales Automation"],
        category: "AI Calling Agents",
        datePublished: "2026-03-10",
        dateModified: "2026-09-04",
        readingTime: 6,
    },
    {
        title: "Top Benefits of AI Chatbots for Customer Support",
        metaTitle: "Benefits of AI Chatbots for Customer Support | Syenxa Tech",
        slug: "top-benefits-of-ai-chatbots",
        image: "/covers/top-benefits-of-ai-chatbots.jpg",
        imageAlt: "Cover: top benefits of AI chatbots for customer support, by Syenxa Tech",
        description:
            "Seven benefits of AI chatbots for customer support: 24/7 answers, fewer tickets, more qualified leads, and how to launch one on WhatsApp, Instagram and web.",
        excerpt:
            "Learn how AI-driven chat automation is helping companies provide 24/7 support while reducing operational costs.",
        keywords: ["AI Chatbots", "Customer Support Automation", "WhatsApp Chatbot"],
        category: "AI Chatbots",
        datePublished: "2026-03-24",
        dateModified: "2026-09-04",
        readingTime: 6,
    },
    {
        title: "AI Automation Solutions That Reduce Costs for Businesses",
        metaTitle: "AI Automation Solutions That Cut Business Costs | Syenxa Tech",
        slug: "ai-automation-solutions-reduce-costs",
        image: "/covers/ai-automation-solutions-reduce-costs.jpg",
        imageAlt: "Cover: AI automation solutions that reduce business costs, by Syenxa Tech",
        description:
            "A practical guide to AI automation solutions that cut operating costs: where savings come from, which workflows to automate first and how to measure ROI.",
        excerpt:
            "Explore effective AI automation strategies that save businesses time, reduce manual work, and lower operating costs.",
        keywords: ["AI Automation", "Business Efficiency", "Workflow Automation"],
        category: "AI Automation",
        datePublished: "2026-04-07",
        dateModified: "2026-09-04",
        readingTime: 6,
    },
    {
        title: "Syenxa Tech: Leading AI Digital Solutions for Businesses Worldwide",
        metaTitle: "Syenxa Tech: AI Digital Solutions for Businesses | Overview",
        slug: "syenxa-tech-leading-ai-solutions",
        image: "/covers/syenxa-tech-leading-ai-solutions.jpg",
        imageAlt: "Cover: Syenxa Tech AI digital solutions for businesses",
        description:
            "How Syenxa Tech delivers AI calling agents, chatbots, Next.js websites and automation for clients worldwide, and what working with us looks like.",
        excerpt:
            "See how Syenxa Tech delivers AI-driven digital transformation through voice agents, chatbots, web platforms, and automation.",
        keywords: ["Digital Transformation", "AI Solutions", "Syenxa Tech"],
        category: "Company",
        datePublished: "2026-04-21",
        dateModified: "2026-09-04",
        readingTime: 5,
    },
];

export function getLegacyPost(slug) {
    return blogPosts.find((post) => post.slug === slug) || null;
}

export const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/ai-calling-agents", priority: 0.9, changeFrequency: "weekly" },
    { path: "/ai-chatbots", priority: 0.9, changeFrequency: "weekly" },
    { path: "/website-development", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital-marketing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/use-cases", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
];

export function absoluteUrl(path = "/") {
    return new URL(path, siteConfig.url).toString();
}

/** Canonical URLs: no trailing slash except for the homepage. */
export function canonicalUrl(path = "/") {
    const url = absoluteUrl(path);
    return path === "/" ? url : url.replace(/\/+$/, "");
}

export function createMetadata({
    title,
    description = siteConfig.description,
    path = "/",
    keywords = [],
    type = "website",
    image,
    imageAlt,
    publishedTime,
    modifiedTime,
    noIndex = false,
} = {}) {
    const resolvedTitle = title || siteConfig.title;
    const canonical = canonicalUrl(path);
    const ogImage = image || siteConfig.ogImage;
    const ogImageAlt =
        imageAlt || `${siteConfig.name}: AI calling agents, chatbots and websites`;

    const openGraph = {
        title: resolvedTitle,
        description,
        url: canonical,
        siteName: siteConfig.name,
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: ogImageAlt,
            },
        ],
        locale: "en_US",
        type,
    };

    if (type === "article") {
        if (publishedTime) openGraph.publishedTime = publishedTime;
        if (modifiedTime) openGraph.modifiedTime = modifiedTime;
        openGraph.authors = [siteConfig.name];
    }

    return {
        title: resolvedTitle,
        description,
        keywords,
        alternates: {
            canonical,
        },
        openGraph,
        twitter: {
            card: "summary_large_image",
            title: resolvedTitle,
            description,
            images: [ogImage],
        },
        ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    };
}

/* ------------------------------------------------------------------ */
/* Structured data helpers                                              */
/* ------------------------------------------------------------------ */

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORGANIZATION_ID,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: {
            "@type": "ImageObject",
            url: absoluteUrl(siteConfig.logo),
            width: 512,
            height: 512,
        },
        image: absoluteUrl(siteConfig.ogImage),
        description: siteConfig.description,
        foundingDate: siteConfig.foundingYear,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: siteConfig.phone,
                email: siteConfig.email,
                contactType: "sales",
                areaServed: "Worldwide",
                availableLanguage: ["en"],
            },
        ],
        sameAs: Object.values(siteConfig.socials),
        address: {
            "@type": "PostalAddress",
            addressRegion: "TX",
            addressCountry: "US",
        },
        areaServed: [
            { "@type": "Country", name: "United States" },
            "Worldwide",
        ],
        knowsAbout: [
            "AI calling agents",
            "AI voice agents",
            "AI chatbots",
            "AI automation",
            "Next.js website development",
            "digital marketing",
        ],
    };
}

export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "en",
    };
}

export function generateFaqSchema(faqs = []) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

/**
 * BreadcrumbList for a page. `items` is an ordered list of { name, path }
 * excluding the homepage, which is always prepended.
 */
export function generateBreadcrumbSchema(items = []) {
    const trail = [{ name: "Home", path: "/" }, ...items];
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: canonicalUrl(item.path),
        })),
    };
}

export function generateServiceSchema({
    name,
    description,
    serviceType,
    url,
    audience,
    offers,
    areaServed = [{ "@type": "Country", name: "United States" }, "Worldwide"],
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${canonicalUrl(url)}#service`,
        name,
        description,
        serviceType,
        url: canonicalUrl(url),
        image: absoluteUrl(siteConfig.ogImage),
        areaServed,
        provider: { "@id": ORGANIZATION_ID },
        brand: { "@id": ORGANIZATION_ID },
    };
    if (audience) {
        schema.audience = { "@type": "BusinessAudience", name: audience };
    }
    if (offers) {
        schema.offers = { "@type": "Offer", ...offers };
    }
    return schema;
}

export function generateWebPageSchema({ name, description, path, type = "WebPage" }) {
    return {
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${canonicalUrl(path)}#webpage`,
        url: canonicalUrl(path),
        name,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        inLanguage: "en",
    };
}

export function generateArticleSchema({
    title,
    description,
    path,
    image,
    datePublished,
    dateModified,
    keywords = [],
    section,
    author,
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${canonicalUrl(path)}#article`,
        headline: title,
        description,
        image: image || absoluteUrl(siteConfig.ogImage),
        datePublished,
        dateModified: dateModified || datePublished,
        keywords: keywords.join(", "),
        articleSection: section,
        inLanguage: "en",
        mainEntityOfPage: canonicalUrl(path),
        author: author || { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
    };
}

/** Metadata + schema for one of the hard-coded legacy blog posts. */
export function legacyPostMetadata(slug) {
    const post = getLegacyPost(slug);
    if (!post) return {};
    return createMetadata({
        title: post.metaTitle || `${post.title} | ${siteConfig.name}`,
        description: post.description,
        path: `/blog/${post.slug}`,
        type: "article",
        keywords: post.keywords,
        image: post.image,
        imageAlt: post.imageAlt,
        publishedTime: post.datePublished,
        modifiedTime: post.dateModified,
    });
}

export function legacyPostSchemas(slug) {
    const post = getLegacyPost(slug);
    if (!post) return [];
    const path = `/blog/${post.slug}`;
    return [
        generateArticleSchema({
            title: post.title,
            description: post.description,
            path,
            image: post.image ? absoluteUrl(post.image) : undefined,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            keywords: post.keywords,
            section: post.category,
        }),
        generateBreadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
        ]),
    ];
}
