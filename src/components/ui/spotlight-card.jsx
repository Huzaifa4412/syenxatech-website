"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * SpotlightCard - React Bits & Aceternity inspired interactive card lighting.
 * Traces a soft, subtle radial sheen that follows the user's cursor.
 */
export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(255, 84, 31, 0.08)",
    spotlightSize = 320,
    ...props
}) {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn("relative overflow-hidden", className)}
            {...props}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
                }}
                aria-hidden="true"
            />
            {children}
        </div>
    );
}

export default SpotlightCard;
