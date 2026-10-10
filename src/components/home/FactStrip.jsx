import NumberTicker from "@/components/ui/number-ticker";
import BlurFade from "@/components/ui/blur-fade";

const facts = [
    {
        numericValue: 24,
        suffix: "/7",
        label: "Calls and chats covered",
        detail: "Including nights and weekends",
    },
    {
        numericValue: 3,
        suffix: " days",
        label: "Typical chatbot delivery",
        detail: "Once requirements are agreed",
    },
    {
        prefix: "from",
        currency: "$",
        numericValue: 200,
        suffix: "",
        label: "Standard business websites",
        detail: "Delivered in 5 to 7 working days",
    },
    {
        numericValue: 7,
        suffix: " days",
        label: "Free chatbot trial",
        detail: "Try it on your own channels",
    },
];

export default function FactStrip() {
    return (
        <section className="hp-facts" aria-label="What you get with Syenxa Tech">
            <dl className="hp-container hp-facts-grid">
                {facts.map((fact, index) => (
                    <BlurFade
                        key={fact.label}
                        as="div"
                        delay={index * 0.08}
                        duration={0.5}
                        offset={14}
                    >
                        <dt>{fact.label}</dt>
                        <dd className="hp-fact-value">
                            {fact.prefix && (
                                <span className="hp-fact-prefix">{fact.prefix}</span>
                            )}
                            {fact.currency && (
                                <span className="hp-fact-number">{fact.currency}</span>
                            )}
                            <NumberTicker
                                value={fact.numericValue}
                                delay={0.15 + index * 0.06}
                                className="hp-fact-number"
                            />
                            {fact.suffix && (
                                <span className="hp-fact-unit">{fact.suffix}</span>
                            )}
                        </dd>
                        <dd className="hp-fact-detail">{fact.detail}</dd>
                    </BlurFade>
                ))}
            </dl>
        </section>
    );
}
