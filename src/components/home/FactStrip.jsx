const facts = [
    { value: "24/7", label: "Calls and chats covered", detail: "Including nights and weekends" },
    { value: "3 days", label: "Typical chatbot delivery", detail: "Once requirements are agreed" },
    { value: "$200", prefix: "from", label: "Standard business websites", detail: "Delivered in 5 to 7 working days" },
    { value: "7 days", label: "Free chatbot trial", detail: "Try it on your own channels" },
];

export default function FactStrip() {
    return (
        <section className="hp-facts" aria-label="What you get with Syenxa Tech">
            <dl className="hp-container hp-facts-grid">
                {facts.map((fact) => (
                    <div key={fact.value}>
                        <dt>{fact.label}</dt>
                        <dd className="hp-fact-value">{fact.prefix && <span>{fact.prefix} </span>}{fact.value}</dd>
                        <dd className="hp-fact-detail">{fact.detail}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
