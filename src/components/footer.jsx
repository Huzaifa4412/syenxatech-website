import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/seo";

const serviceLinks = [
    { name: "AI Calling Agents", href: "/ai-calling-agents" },
    { name: "AI Chatbots", href: "/ai-chatbots" },
    { name: "Website Development", href: "/website-development" },
    { name: "Digital Marketing & SEO", href: "/digital-marketing" },
    { name: "All Services", href: "/services" },
];

const useCaseLinks = [
    { name: "Healthcare & Dental Clinics", href: "/use-cases/doctor" },
    { name: "Real Estate Agencies", href: "/use-cases/real-estate" },
    { name: "Gyms & Fitness Studios", href: "/use-cases/gym" },
    { name: "Beauty Salons & Spas", href: "/use-cases/beauty-salon" },
    { name: "All Use Cases", href: "/use-cases" },
];

const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
];

const socialLinks = [
    { name: "LinkedIn", href: siteConfig.socials.linkedin },
    { name: "Instagram", href: siteConfig.socials.instagram },
    { name: "Facebook", href: siteConfig.socials.facebook },
];

function FooterColumn({ title, links, external = false }) {
    return (
        <nav aria-label={title}>
            <h3 className="font-semibold text-zinc-900 mb-4">{title}</h3>
            <ul className="space-y-2.5">
                {links.map((link) =>
                    external ? (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-zinc-600 hover:text-[#ff541f] transition-colors"
                            >
                                {link.name}
                            </a>
                        </li>
                    ) : (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm text-zinc-600 hover:text-[#ff541f] transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </nav>
    );
}

export default function Footer() {
    return (
        <footer className="border-t border-zinc-900/5 bg-[#faf9f7] py-14 px-4 md:px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                            <Image
                                src="/logo-mark.png"
                                alt="Syenxa Tech logo"
                                width={40}
                                height={40}
                                className="size-10"
                            />
                            <span className="font-bold text-zinc-900 tracking-tight">
                                Syenxa Tech
                            </span>
                        </Link>

                        <p className="mt-5 text-sm text-zinc-600 leading-relaxed max-w-[38ch]">
                            AI automation agency building AI calling agents,
                            chatbots and high-performance websites that answer
                            every lead and book meetings 24/7.
                        </p>

                        <address className="not-italic mt-6 space-y-2 text-sm text-zinc-600">
                            <p>
                                Email:{" "}
                                <a
                                    href={`mailto:${siteConfig.email}`}
                                    className="hover:text-[#ff541f] transition-colors"
                                >
                                    {siteConfig.email}
                                </a>
                            </p>
                            <p>
                                Phone:{" "}
                                <a
                                    href={siteConfig.phoneHref}
                                    className="hover:text-[#ff541f] transition-colors"
                                >
                                    {siteConfig.phone}
                                </a>
                            </p>
                        </address>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <FooterColumn title="Services" links={serviceLinks} />
                        <FooterColumn title="Use Cases" links={useCaseLinks} />
                        <FooterColumn title="Company" links={companyLinks} />
                        <FooterColumn title="Follow" links={socialLinks} external />
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-zinc-900/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>
                        © {new Date().getFullYear()} {siteConfig.name}. All rights
                        reserved.
                    </p>
                    <p>Serving businesses worldwide since {siteConfig.foundingYear}.</p>
                </div>

                <p
                    aria-hidden="true"
                    className="mt-6 text-center text-3xl md:text-5xl lg:text-[10rem] leading-none font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 select-none"
                >
                    SYENXA TECH
                </p>
            </div>
        </footer>
    );
}
