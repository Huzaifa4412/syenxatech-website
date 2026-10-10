"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

export function BlurFade({
    children,
    className = "",
    variant,
    duration = 0.5,
    delay = 0,
    offset = 8,
    direction = "up",
    inView = true,
    inViewMargin = "0px",
    blur = "8px",
    as = "div",
    ...props
}) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
    const isInView = !inView || inViewResult;

    const defaultVariants = {
        hidden: {
            [direction === "left" || direction === "right" ? "x" : "y"]:
                direction === "right" || direction === "down" ? -offset : offset,
            opacity: 0,
            filter: `blur(${blur})`,
        },
        visible: {
            [direction === "left" || direction === "right" ? "x" : "y"]: 0,
            opacity: 1,
            filter: "blur(0px)",
        },
    };

    const combinedVariants = variant ?? defaultVariants;
    const MotionComponent = motion[as] || motion.div;

    return (
        <AnimatePresence>
            <MotionComponent
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="hidden"
                variants={combinedVariants}
                transition={{
                    delay: 0.04 + delay,
                    duration,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className={className}
                {...props}
            >
                {children}
            </MotionComponent>
        </AnimatePresence>
    );
}

export default BlurFade;
