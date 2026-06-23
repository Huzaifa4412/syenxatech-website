import Button from "./button";

const Story = () => {
    return (
        <>
            <div className="session">
                <div className="main-text text-center max-w-4xl mx-auto text-[clamp(1rem,3vw,1.5rem)] mb-6 leading-none">
                    <div className="date text-lg text-(--text-color) text-center">
                        {new Date().getFullYear()}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                        About{" "}
                        <span className="text-orange-600">Syenxa Tech</span>
                    </h2>
                    <h3 className="text-xl font-semibold mb-6">
                        AI Calling Agent & Automation Experts
                    </h3>
                    <p className="mb-6">
                        We Help Businesses Sell, Support & Scale With AI Calling
                        Agents. At{" "}
                        <span className="text-orange-600 font-bold">
                            Syenxa Tech
                        </span>
                        , we specialize in building AI Calling Agents that
                        actually convert — not demos, not experiments, but real
                        AI voice agents that handle calls, book appointments,
                        qualify leads, and support customers automatically.
                    </p>
                    <p>
                        Based in the{" "}
                        <span className="font-bold">United States</span>, we
                        provide{" "}
                        <span className="font-bold">
                            AI solutions for small businesses worldwide
                        </span>
                        , helping companies replace manual calling, missed
                        leads, and expensive call centers with smart{" "}
                        <span className="font-bold">
                            voice AI agents for sales and support automation
                        </span>
                        . If your business depends on phone calls, sales
                        conversations, or customer support — you're in the right
                        place.
                    </p>
                </div>
            </div>
            <div className="mb-8 md:mb-0 mx-auto w-fit">
                <a href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
                    <img
                        src="/logo.svg"
                        alt="Syenxa Tech Logo"
                        className="size-10 text-black "
                    />

                    <span className=" font-bold lg:inline-block">
                        Syenxa Tech
                    </span>
                </a>

                <div className="contact-info mt-6 space-y-2">
                    <p className="text-sm dark:text-gray-400">
                        Email:{" "}
                        <a
                            href="mailto:syenxatech@gmail.com"
                            className="hover:text-(--primary-color) transition-colors"
                        >
                            syenxatech@gmail.com
                        </a>
                    </p>
                    <p className="text-sm dark:text-gray-400">
                        Phone:{" "}
                        <a
                            href="tel:+12897963492"
                            className="hover:text-(--primary-color) transition-colors"
                        >
                            +1 289 796-3492
                        </a>
                    </p>
                </div>

                <p className="text-sm dark:text-gray-400 mt-5">
                    © {new Date().getFullYear()} Syenxa Tech. All rights
                    reserved.
                </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2">
                <Card
                    year={2014}
                    title={"Year of establishment"}
                    text={"More than 10 years in the field"}
                />
                <Card
                    year={304}
                    title={"Projects are launched"}
                    text={"A lot of projects are done"}
                />
                <Card
                    year={189}
                    title={"Happy clients"}
                    text={"Clients from all over the world"}
                />
                <Card
                    year={20}
                    title={"5-Star Reviews"}
                    text={"More than 100 reviews are done"}
                />
            </div>
            <div className="mx-auto w-fit flex justify-center items-center gap-4 flex-col lg:flex-row">
                <Button variant={"primary"} text={"Get Started "} />
                <div className="text text-sm flex items-center gap-3">
                    Slots are available
                    <span className="size-2 bg-green-600 block rounded-full"></span>
                </div>
            </div>
        </>
    );
};

export default Story;

const Card = ({ year, title, text }) => {
    return (
        <div>
            <div className="session flex flex-col justify-center items-center">
                <div className="date text-5xl font-semibold">{year}</div>
                <div className="heading text-lg">{title}</div>
                <div className="txt text-xs text-(--text-color) ">{text}</div>
                <div className="images flex items-center">
                    <div className="sub-images flex -space-x-4">
                        <img src="/hero-r-1.png" alt="" />
                        <img src="/hero-r-2.png" alt="" />
                        <img src="/hero-r-3.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};
