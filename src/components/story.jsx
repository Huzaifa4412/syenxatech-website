import Link from "next/link";
import Button from "./button";

const stats = [
    {
        value: "2014",
        title: "Year of establishment",
        text: "More than 10 years building software",
    },
    {
        value: "304",
        title: "Projects launched",
        text: "Websites, chatbots and voice agents shipped",
    },
    {
        value: "189",
        title: "Happy clients",
        text: "Clients from all over the world",
    },
    {
        value: "24/7",
        title: "Agent coverage",
        text: "Every call and message answered",
    },
];

const Story = () => {
    return (
        <section id="about" aria-labelledby="about-heading" className="session">
            <div className="main-text text-center max-w-4xl mx-auto text-[clamp(1rem,3vw,1.5rem)] mb-6 leading-none">
                <p className="date text-lg text-(--text-color) text-center">
                    AI Calling Agent &amp; Automation Experts
                </p>
                <h2 id="about-heading" className="text-3xl font-bold mb-4">
                    About <span className="text-orange-600">Syenxa Tech</span>
                </h2>
                <p className="mb-6">
                    We help businesses sell, support and scale with{" "}
                    <Link
                        href="/ai-calling-agents"
                        className="text-orange-600 font-bold hover:underline"
                    >
                        AI calling agents
                    </Link>
                    . At Syenxa Tech we build voice agents that actually
                    convert: not demos or experiments, but production AI that
                    handles calls, books appointments, qualifies leads and
                    supports customers automatically.
                </p>
                <p>
                    Based in the United States and serving{" "}
                    <span className="font-bold">
                        small and mid-sized businesses worldwide
                    </span>
                    , we replace manual calling, missed leads and expensive
                    call centers with{" "}
                    <Link
                        href="/use-cases"
                        className="font-bold hover:underline"
                    >
                        voice AI for sales and support automation
                    </Link>
                    , backed by{" "}
                    <Link href="/ai-chatbots" className="font-bold hover:underline">
                        AI chatbots
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/website-development"
                        className="font-bold hover:underline"
                    >
                        conversion-focused websites
                    </Link>
                    . If your business depends on phone calls, sales
                    conversations or customer support, you are in the right
                    place.
                </p>
            </div>

            <dl className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="flex flex-col justify-center items-center text-center rounded-3xl bg-white border border-zinc-900/10 px-4 py-8"
                    >
                        <dd className="date font-display text-4xl md:text-5xl font-bold tracking-tighter tabular-nums order-1">
                            {stat.value}
                        </dd>
                        <dt className="heading text-base font-semibold mt-2 order-2">{stat.title}</dt>
                        <dd className="txt text-xs text-zinc-500 mt-1 order-3">
                            {stat.text}
                        </dd>
                    </div>
                ))}
            </dl>

            <div className="mx-auto w-fit flex justify-center items-center gap-4 flex-col lg:flex-row mt-8">
                <Button variant="primary" text="Get Started" href="/contact" />
                <div className="text text-sm flex items-center gap-3">
                    Slots are available
                    <span className="size-2 bg-green-600 block rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default Story;
