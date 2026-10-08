"use client";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import {
    animate,
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";

const WEEKS_PER_MONTH = 52 / 12;

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});
const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

const FIELDS = [
    {
        key: "calls",
        label: "Calls you receive per week",
        min: 10,
        max: 400,
        step: 5,
        format: (value) => whole.format(value),
    },
    {
        key: "missed",
        label: "Share that go unanswered",
        min: 5,
        max: 80,
        step: 1,
        format: (value) => `${value}%`,
    },
    {
        key: "booked",
        label: "Answered callers who become customers",
        min: 5,
        max: 80,
        step: 1,
        format: (value) => `${value}%`,
    },
    {
        key: "value",
        label: "Average value of a new customer",
        min: 50,
        max: 5000,
        step: 50,
        format: (value) => currency.format(value),
    },
];

const DEFAULTS = { calls: 80, missed: 25, booked: 30, value: 350 };

/* Tweens a number outside the React render cycle. */
function AnimatedNumber({ value, format, className }) {
    const reduce = useReducedMotion();
    const motionValue = useMotionValue(value);
    const text = useTransform(motionValue, (latest) => format(latest));

    useEffect(() => {
        if (reduce) {
            motionValue.set(value);
            return;
        }
        const controls = animate(motionValue, value, {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        });
        return () => controls.stop();
    }, [value, reduce, motionValue]);

    return <motion.span className={className}>{text}</motion.span>;
}

export default function MissedCallCalculator() {
    const baseId = useId();
    const [inputs, setInputs] = useState(DEFAULTS);

    const missedCalls = inputs.calls * WEEKS_PER_MONTH * (inputs.missed / 100);
    const lostCustomers = missedCalls * (inputs.booked / 100);
    const lostRevenue = lostCustomers * inputs.value;

    const summary = `About ${currency.format(lostRevenue)} per month, from ${whole.format(
        missedCalls
    )} missed calls and ${whole.format(lostCustomers)} lost customers.`;

    return (
        <div className="hp-calculator">
            <form
                className="hp-calc-form"
                onSubmit={(event) => event.preventDefault()}
            >
                {FIELDS.map((field) => {
                    const id = `${baseId}-${field.key}`;
                    const value = inputs[field.key];
                    const fill = ((value - field.min) / (field.max - field.min)) * 100;
                    return (
                        <div key={field.key}>
                            <div className="flex items-baseline justify-between gap-4">
                                <label
                                    htmlFor={id}
                                    className="text-[15px] font-medium text-zinc-800"
                                >
                                    {field.label}
                                </label>
                                <output
                                    htmlFor={id}
                                    className="font-display text-xl font-bold tracking-tight text-zinc-900 tabular-nums"
                                >
                                    {field.format(value)}
                                </output>
                            </div>
                            <input
                                id={id}
                                type="range"
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                value={value}
                                aria-valuetext={field.format(value)}
                                onChange={(event) =>
                                    setInputs((previous) => ({
                                        ...previous,
                                        [field.key]: Number(event.target.value),
                                    }))
                                }
                                className="home-range mt-2"
                                style={{ "--fill": `${fill}%` }}
                            />
                        </div>
                    );
                })}
            </form>

            <div className="hp-calc-result">
                <p className="relative text-[15px] font-medium text-zinc-800">
                    Estimated revenue missed each month
                </p>
                <p
                    aria-hidden
                    className="hp-calc-total"
                >
                    <AnimatedNumber value={lostRevenue} format={currency.format} />
                </p>
                <p className="sr-only" role="status" aria-live="polite">
                    {summary}
                </p>

                <dl className="relative mt-8 grid grid-cols-2 gap-4" aria-hidden>
                    <div>
                        <dd className="font-display text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">
                            <AnimatedNumber value={missedCalls} format={whole.format} />
                        </dd>
                        <dt className="mt-1 text-sm text-zinc-700">Missed calls a month</dt>
                    </div>
                    <div>
                        <dd className="font-display text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">
                            <AnimatedNumber value={lostCustomers} format={whole.format} />
                        </dd>
                        <dt className="mt-1 text-sm text-zinc-700">Potential customers lost</dt>
                    </div>
                </dl>

                <p className="relative mt-8 text-sm text-zinc-700 leading-relaxed">
                    An estimate based on your inputs, not a forecast. Actual results depend on your business and customer behaviour.
                </p>

                <Link
                    href="/ai-calling-agents"
                    className="hp-text-link hp-calc-link"
                >
                    How AI calling agents work
                    <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                    />
                </Link>
            </div>
        </div>
    );
}
