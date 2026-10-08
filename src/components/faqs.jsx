import React from "react";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { homeFaqs } from "@/lib/faqs";

/**
 * Site-wide FAQ accordion. Content lives in lib/faqs.js so the page can emit
 * matching FAQPage structured data from the same source.
 */
const Faqs = ({ faqs = homeFaqs, title = "Frequently asked questions", intro }) => {
    return (
        <section
            id="faqs"
            aria-labelledby="faqs-heading"
            className="relative bg-[#faf9f7] scroll-mt-24 pb-24 lg:pb-32"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-32">
                        <h2
                            id="faqs-heading"
                            className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tighter leading-[1.05] text-balance"
                        >
                            {title}
                        </h2>
                        <p className="mt-6 max-w-[42ch] text-base lg:text-lg text-zinc-600 leading-relaxed">
                            {intro ||
                                "Straight answers on pricing, delivery times, platforms and how our AI calling agents, chatbots and websites work."}
                        </p>
                        <Link
                            href="/contact"
                            className="mt-8 inline-flex text-[15px] font-semibold text-zinc-900 underline underline-offset-8 decoration-[#ff541f] decoration-2 hover:text-[#c63d0f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff541f]"
                        >
                            Ask us something else
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full border-t border-zinc-900/10"
                        defaultValue="item-1"
                    >
                        {faqs.map((item, idx) => (
                            <AccordionItem
                                value={`item-${idx + 1}`}
                                key={idx}
                                className="border-zinc-900/10 last:border-b"
                            >
                                <AccordionTrigger className="py-6 text-lg md:text-xl font-semibold font-display tracking-tight text-zinc-900 hover:no-underline hover:text-[#c63d0f] focus-visible:ring-[#ff541f]/50 [&>svg]:size-5 [&>svg]:text-zinc-500 [&>svg]:translate-y-1">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="pb-6 pr-8 text-base text-zinc-600 leading-relaxed">
                                    <p className="max-w-[64ch]">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default Faqs;
