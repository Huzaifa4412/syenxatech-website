import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
    title: "Website Development Services | Syenxa Tech",
    description:
        "Build fast, responsive, SEO-friendly websites and conversion-focused digital experiences with Syenxa Tech.",
    path: "/website-development",
    keywords: [
        "website development services",
        "SEO-friendly web development",
        "responsive website design",
        "custom website development",
    ],
});

export default function WebsiteDevelopmentLayout({ children }) {
    return children;
}
