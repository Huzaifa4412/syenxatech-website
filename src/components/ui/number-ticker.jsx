"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export function NumberTicker({
    value,
    startValue = 0,
    direction = "up",
    delay = 0,
    className = "",
    decimalPlaces = 0,
    useGrouping = true,
    ...props
}) {
    const ref = useRef(null);
    const motionValue = useMotionValue(direction === "down" ? value : startValue);
    const springValue = useSpring(motionValue, {
        damping: 45,
        stiffness: 85,
    });
    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        let timer = null;

        if (isInView) {
            timer = setTimeout(() => {
                motionValue.set(direction === "down" ? startValue : value);
            }, delay * 1000);
        }

        return () => {
            if (timer !== null) {
                clearTimeout(timer);
            }
        };
    }, [motionValue, isInView, delay, value, direction, startValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US", {
                    minimumFractionDigits: decimalPlaces,
                    maximumFractionDigits: decimalPlaces,
                    useGrouping,
                }).format(Number(latest.toFixed(decimalPlaces)));
            }
        });
        return () => unsubscribe();
    }, [springValue, decimalPlaces, useGrouping]);

    return (
        <span
            ref={ref}
            className={cn("inline-block tabular-nums", className)}
            {...props}
        >
            {startValue}
        </span>
    );
}

export default NumberTicker;
