export default function ServiceFaq({ faqs, title = "A few useful answers.", description }) {
    return (
        <section className="sx-section sx-faq">
            <div className="sp-container sx-split">
                <div className="sx-section-heading">
                    <p className="sp-eyebrow">Before we get started</p>
                    <h2>{title}</h2>
                    {description && <p>{description}</p>}
                </div>
                <div className="sx-faq-list">
                    {faqs.map((faq) => (
                        <details key={faq.question}>
                            <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                            <p>{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
