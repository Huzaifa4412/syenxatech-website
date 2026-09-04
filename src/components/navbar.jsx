"use client";
import { useState, useEffect } from "react";
import Button from "./button";
import { AnimatePresence, motion } from "motion/react";
import {
    ChevronDown,
    Menu,
    X,
    Cpu,
    MessageSquare,
    Globe,
    Megaphone,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const services = [
        {
            name: "AI Calling Agents",
            href: "/ai-calling-agents",
            icon: Cpu,
            description: "Automated voice agents for sales & support.",
        },
        {
            name: "AI Chatbots",
            href: "/ai-chatbots",
            icon: MessageSquare,
            description: "24/7 intelligent chat automation.",
        },
        {
            name: "Website Development",
            href: "/website-development",
            icon: Globe,
            description: "High-performance responsive websites.",
        },
        {
            name: "Digital Marketing & SEO",
            href: "/digital-marketing",
            icon: Megaphone,
            description: "SEO, paid ads & AI marketing automation.",
        },
    ];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Use Cases", href: "/use-cases" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`
                    w-full max-w-6xl flex items-center justify-between px-6 py-3 rounded-full pointer-events-auto transition-all duration-500
                    ${
                        scrolled
                            ? "bg-white/70 backdrop-blur-2xl border border-zinc-900/10 shadow-[0_8px_32px_rgba(24,24,27,0.08)]"
                            : "bg-transparent border border-transparent"
                    }
                `}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="shrink-0 flex items-center hover:opacity-80 transition-opacity"
                >
                    <Image
                        src="/logo-mark.png"
                        alt="Syenxa Tech logo"
                        width={36}
                        height={36}
                        priority
                        className="h-8 sm:h-9 w-auto"
                    />
                    <span className="hidden sm:block ml-3 font-bold text-zinc-900 tracking-tighter text-lg">
                        SYENXATECH
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    <ul className="flex items-center gap-8">
                        {navLinks.slice(0, 1).map((link, i) => (
                            <li key={i}>
                                <Link
                                    href={link.href}
                                    className="text-zinc-600 hover:text-zinc-900 transition-colors text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {/* Mega Menu Dropdown */}
                        <li
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <Link href="/services">
                                <button className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors text-sm font-medium cursor-pointer py-2 group">
                                    Services
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            servicesOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                            </Link>

                            <AnimatePresence>
                                {servicesOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 15,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 15,
                                            scale: 0.95,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white/95 backdrop-blur-3xl border border-zinc-900/10 rounded-3xl overflow-hidden shadow-2xl p-6"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            {services.map((service, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={service.href}
                                                    className="flex flex-col gap-2 p-4 rounded-2xl hover:bg-zinc-900/5 group transition-all"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-lg bg-[#ff541f]/10 text-[#ff541f] group-hover:bg-[#ff541f] group-hover:text-white transition-colors">
                                                            <service.icon className="w-5 h-5" />
                                                        </div>
                                                        <span className="font-semibold text-zinc-900 group-hover:translate-x-1 transition-transform">
                                                            {service.name}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                                        {service.description}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-zinc-900/10 flex justify-between items-center text-xs text-zinc-400">
                                            <span>
                                                All services include 24/7
                                                support worldwide.
                                            </span>
                                            <Link
                                                href="/services"
                                                className="text-[#ff541f] font-medium flex items-center gap-1 group"
                                            >
                                                View All{" "}
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        {navLinks.slice(1).map((link, i) => (
                            <li key={i}>
                                <Link
                                    href={link.href}
                                    className="text-zinc-600 hover:text-zinc-900 transition-colors text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Button
                        text="Get Started"
                        href="/contact"
                        variant="primary"
                        className="text-xs px-6 py-2.5"
                    />
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="md:hidden text-zinc-900 p-2 hover:bg-zinc-900/10 rounded-full transition-colors"
                >
                    {open ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[-1] pointer-events-auto top-0 left-0 h-screen w-screen"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="absolute top-0 right-0 h-screen w-[300px] bg-white border-l border-zinc-900/10 p-8 shadow-2xl pointer-events-auto overflow-y-auto"
                        >
                            <div className="flex flex-col h-full relative">
                                <div className="flex justify-between items-center mb-12">
                                    <Link
                                        href="/"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Image
                                            src="/logo-mark.png"
                                            alt="Syenxa Tech logo"
                                            width={40}
                                            height={40}
                                            className="h-10 w-auto"
                                        />
                                    </Link>
                                    <button
                                        onClick={() => setOpen(false)}
                                        aria-label="Close menu"
                                        className="p-2 bg-zinc-900/5 rounded-full text-zinc-900 hover:bg-zinc-900/15 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <ul className="flex flex-col gap-6">
                                    {navLinks.map((link, i) => (
                                        <li key={i}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setOpen(false)}
                                                className="text-2xl font-bold text-zinc-900 tracking-tighter"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="mt-4 pt-4 border-t border-zinc-900/10">
                                        <span className="text-xs text-zinc-400 uppercase tracking-widest block mb-4">
                                            Our Services
                                        </span>
                                        <div className="grid gap-4">
                                            {services.map((s, i) => (
                                                <Link
                                                    key={i}
                                                    href={s.href}
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                    className="text-zinc-600 hover:text-[#ff541f] transition-colors font-medium"
                                                >
                                                    {s.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </li>
                                </ul>

                                <div className="mt-auto">
                                    <Button
                                        text="Get Started"
                                        href="/contact"
                                        variant="primary"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
