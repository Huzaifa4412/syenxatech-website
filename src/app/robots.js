export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/private/", "/api/"],
            },
        ],
        sitemap: "https://syenxatech.com/sitemap.xml",
        host: "https://syenxatech.com",
    };
}
