export const siteConfig = {
    name: "Syenxa Tech",
    url: "https://syenxatech.com",
    title: "AI Calling Agents & Digital Solutions | Syenxa Tech",
    description:
        "Syenxa Tech builds AI calling agents, chatbots, websites, apps, and automation solutions that help businesses capture leads, support customers, and scale operations.",
    ogImage: "/hero-bg.jpg",
    email: "info@syenxatech.com",
    phone: "+1-737-307-6969",
};

export const blogPosts = [
    {
        title: "How AI Calling Agents Are Transforming Sales Worldwide",
        slug: "how-ai-calling-agents-are-transforming-sales",
        description:
            "Discover how intelligent voice AI is revolutionizing the sales landscape and boosting revenue for businesses globally.",
    },
    {
        title: "Top Benefits of AI Chatbots for Customer Support",
        slug: "top-benefits-of-ai-chatbots",
        description:
            "Learn how AI-driven chat automation is helping companies provide 24/7 support while reducing operational costs.",
    },
    {
        title: "AI Automation Solutions That Reduce Costs for Businesses",
        slug: "ai-automation-solutions-reduce-costs",
        description:
            "Explore effective AI automation strategies that save businesses time, reduce manual work, and lower operating costs.",
    },
    {
        title: "Syenxa Tech: Leading AI Digital Solutions for Businesses Worldwide",
        slug: "syenxa-tech-leading-ai-solutions",
        description:
            "See how Syenxa Tech delivers AI-driven digital transformation through voice agents, chatbots, web platforms, and automation.",
    },
];

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
];

export function absoluteUrl(path = "/") {
    return new URL(path, siteConfig.url).toString();
}

export function createMetadata({
    title,
    description = siteConfig.description,
    path = "/",
    keywords = [],
    type = "website",
} = {}) {
    const resolvedTitle = title || siteConfig.title;
    const canonical = absoluteUrl(path);

    return {
        title: resolvedTitle,
        description,
        keywords,
        alternates: {
            canonical,
        },
        openGraph: {
            title: resolvedTitle,
            description,
            url: canonical,
            siteName: siteConfig.name,
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${siteConfig.name} AI and digital solutions`,
                },
            ],
            locale: "en_US",
            type,
        },
        twitter: {
            card: "summary_large_image",
            title: resolvedTitle,
            description,
            images: [siteConfig.ogImage],
        },
    };
}
