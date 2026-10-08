import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/seo";
import ContactForm from "./contact-form";

const methods = [
    {
        icon: Mail,
        label: "Email",
        value: siteConfig.email,
        href: `mailto:${siteConfig.email}`,
    },
    {
        icon: Phone,
        label: "Phone",
        value: siteConfig.phone,
        href: siteConfig.phoneHref,
    },
    { icon: MapPin, label: "Location", value: "Texas, United States" },
];

/**
 * Site-wide contact section (home, services and long-form pages). The shell
 * is server-rendered; only the form itself is a client component.
 */
const Contact = () => {
    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="relative bg-[#faf9f7] scroll-mt-24 py-24 lg:py-32"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
                <div className="lg:col-span-5">
                    <h2
                        id="contact-heading"
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tighter leading-[1.05] text-balance"
                    >
                        Tell us what you want automated.
                    </h2>
                    <p className="mt-6 max-w-[46ch] text-lg text-zinc-600 leading-relaxed">
                        Send a few lines about your business and we will come
                        back with a plan and a fixed quote. Or{" "}
                        <Link
                            href="/contact"
                            className="font-semibold text-zinc-900 underline underline-offset-4 decoration-[#ff541f] decoration-2 hover:text-[#c63d0f]"
                        >
                            book a free demo
                        </Link>{" "}
                        on our calendar.
                    </p>

                    <dl className="mt-10 border-t border-zinc-900/10">
                        {methods.map((method) => (
                            <div
                                key={method.label}
                                className="flex items-center gap-4 border-b border-zinc-900/10 py-5"
                            >
                                <method.icon
                                    aria-hidden
                                    className="size-5 shrink-0 text-[#c63d0f]"
                                    strokeWidth={1.75}
                                />
                                <dt className="w-20 shrink-0 text-sm text-zinc-600">
                                    {method.label}
                                </dt>
                                <dd className="min-w-0 text-base font-medium text-zinc-900 break-words">
                                    {method.href ? (
                                        <a
                                            href={method.href}
                                            className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff541f]"
                                        >
                                            {method.value}
                                        </a>
                                    ) : (
                                        method.value
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                    <div className="rounded-3xl bg-white ring-1 ring-zinc-900/[0.07] shadow-[0_40px_80px_-48px_rgba(67,35,20,0.45)] p-6 sm:p-10">
                        <ContactForm fallbackEmail={siteConfig.email} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
