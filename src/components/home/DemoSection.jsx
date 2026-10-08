import DemoVideo from "./DemoVideo";
import Reveal from "./Reveal";

export default function DemoSection() {
    return (
        <section id="demo" aria-labelledby="demo-video-heading" className="hp-section hp-demo-section">
            <div className="hp-container">
                <Reveal className="hp-section-heading hp-centered">
                    <h2 id="demo-video-heading">Less explaining.<br /><span>More showing.</span></h2>
                    <p>Watch a Syenxa calling agent answer, qualify and book, from hello to goodbye.</p>
                </Reveal>
                <Reveal className="hp-demo-stage" delay={0.1} amount={0.15}>
                    <DemoVideo />
                </Reveal>
            </div>
        </section>
    );
}
