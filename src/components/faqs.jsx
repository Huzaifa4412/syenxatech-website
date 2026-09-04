import React from "react";
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
const Faqs = ({ faqs = homeFaqs, title = "Frequently Asked Questions", intro }) => {
    return (
        <section id="faqs" aria-labelledby="faqs-heading" className="session relative">
            <div>
                <h2
                    id="faqs-heading"
                    className="heading text-[clamp(2.5rem,2.8vw,5rem)] font-bold text-center"
                >
                    {title}
                </h2>
                <p className="text text-[clamp(0.9rem,2vw,1rem)] text-center text-(--text-color) max-w-[800px] mx-auto">
                    {intro ||
                        "Straight answers on pricing, delivery times, platforms and how our AI calling agents, chatbots and websites work. Still unsure? Our team is a message away."}
                </p>
                <div className="max-w-220 mt-20 mx-auto">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="item-1"
                    >
                        {faqs.map((item, idx) => (
                            <AccordionItem value={`item-${idx + 1}`} key={idx}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>{item.answer}</p>
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
