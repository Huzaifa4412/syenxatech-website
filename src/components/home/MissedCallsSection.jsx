import MissedCallCalculator from "./MissedCallCalculator";
import Reveal from "./Reveal";
import BlurText from "@/components/ui/blur-text";
import ShinyText from "@/components/ui/shiny-text";

export default function MissedCallsSection() {
    return (
        <section id="missed-calls" aria-labelledby="missed-calls-heading" className="hp-section hp-missed-calls">
            <div className="hp-container">
                <Reveal className="hp-section-heading" blur={6}>
                    <p className="hp-eyebrow">
                        <ShinyText speed={3.2}>Put a number on it</ShinyText>
                    </p>
                    <h2 id="missed-calls-heading">
                        <BlurText text="Missed calls add up." delay={60} duration={0.65} />
                    </h2>
                    <p>A ringing phone can be your next customer. Adjust the numbers to see what unanswered calls could cost.</p>
                </Reveal>
                <Reveal amount={0.15} blur={6}>
                    <MissedCallCalculator />
                </Reveal>
            </div>
        </section>
    );
}
