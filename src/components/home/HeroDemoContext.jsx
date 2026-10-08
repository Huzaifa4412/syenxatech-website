"use client";
import { createContext, useContext, useRef } from "react";
import { Volume2 } from "lucide-react";

const HeroDemoContext = createContext(null);

/* Lets the hero's "Hear a sample call" button start the call card's audio. */
export function HeroDemoProvider({ children }) {
    const playRef = useRef(null);
    return (
        <HeroDemoContext.Provider value={playRef}>{children}</HeroDemoContext.Provider>
    );
}

export function useHeroDemo() {
    return useContext(HeroDemoContext);
}

export function HearCallButton({ className = "" }) {
    const playRef = useHeroDemo();
    return (
        <button
            type="button"
            onClick={() => playRef?.current?.()}
            className={`group inline-flex items-center gap-2.5 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c63d0f] ${className}`}
        >
            <span className="flex size-9 items-center justify-center rounded-full border border-current">
                <Volume2 className="size-[18px]" strokeWidth={2} />
            </span>
            Hear a sample call
        </button>
    );
}
