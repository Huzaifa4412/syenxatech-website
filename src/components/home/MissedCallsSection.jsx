import MissedCallCalculator from "./MissedCallCalculator";
import Reveal from "./Reveal";

export default function MissedCallsSection() {
    return (
        <section id="missed-calls" aria-labelledby="missed-calls-heading" className="hp-section hp-missed-calls">
            <div className="hp-container">
                <Reveal className="hp-section-heading">
                    <p className="hp-eyebrow">Put a number on it</p>
                    <h2 id="missed-calls-heading">Missed calls add up.</h2>
                    <p>A ringing phone can be your next customer. Adjust the numbers to see what unanswered calls could cost.</p>
                </Reveal>
                <Reveal className="hp-calculator-stage" amount={0.15}>
                    <MissedCallCalculator />
                </Reveal>
            </div>
        </section>
    );
}
