import DemoVideo from "./DemoVideo";
import Reveal from "./Reveal";
import BlurText from "@/components/ui/blur-text";

export default function DemoSection() {
    return (
        <section id="demo" aria-labelledby="demo-video-heading" className="hp-section hp-demo-section">
            <div className="hp-container">
                <Reveal className="hp-section-heading hp-centered" blur={6}>
                    <h2 id="demo-video-heading">
                        <span style={{ color: "var(--hp-ink)" }}>
                            <BlurText text="Less explaining." delay={60} duration={0.6} />
                        </span>
                        <br />
                        <span>
                            <BlurText text="More showing." delay={60} duration={0.65} />
                        </span>
                    </h2>
                    <p>Watch a Syenxa calling agent answer, qualify and book, from hello to goodbye.</p>
                </Reveal>
                <Reveal className="hp-demo-stage" delay={0.1} amount={0.15} blur={6}>
                    <DemoVideo />
                </Reveal>
            </div>
        </section>
    );
}
