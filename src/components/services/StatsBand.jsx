"use client";
import React from "react";
import { motion, useReducedMotion } from "motion/react";

const stats = [
    { value: "10+", label: "Years building software" },
    { value: "304", label: "Projects delivered" },
    { value: "189", label: "Clients worldwide" },
    { value: "24/7", label: "Agent coverage" },
];

const StatsBand = () => {
    const reduce = useReducedMotion();

    return (
        <section className="w-full bg-[#faf9f7] py-16 md:py-20">
            <motion.dl
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-10"
            >
                {stats.map((stat, idx) => (
                    <div
                        key={stat.label}
                        className={`flex flex-col gap-1.5 px-2 lg:px-10 ${
                            idx > 0 ? "lg:border-l lg:border-zinc-900/10" : ""
                        }`}
                    >
                        <dd className="order-1 text-4xl md:text-5xl font-bold text-zinc-900 tracking-tighter tabular-nums">
                            {stat.value}
                        </dd>
                        <dt className="order-2 text-sm text-zinc-500">
                            {stat.label}
                        </dt>
                    </div>
                ))}
            </motion.dl>
        </section>
    );
};

export default StatsBand;
