"use client";

export default function Footer() {
    return (
        <footer className=" py-12 px-4 md:px-6 z-50">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <a
                            href="/"
                            className="mr-4 flex items-center gap-2 lg:mr-6"
                        >
                            <img
                                src="/logo.svg"
                                alt="Synexa Tech Logo"
                                className="size-10 text-black "
                            />

                            <span className=" font-bold lg:inline-block">
                                Synexa Tech
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
                            © {new Date().getFullYear()} Synexa Tech. All rights
                            reserved.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4">Socials</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="https://github.com/arihantcodes/spectrum-ui"
                                        className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white"
                                    ></a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Linkedin
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex mt-4 items-center justify-center   ">
                    <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none">
                        SYENXA TECH
                    </h1>
                </div>
            </div>
        </footer>
    );
}
