"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    CalendarCheck, Check, Headphones, LoaderCircle, MessageSquareText,
    Pause, Phone, Play, RotateCcw, UserRoundCheck, Volume2, VolumeX,
} from "lucide-react";
import scenarios from "@/lib/call-demo-scenarios.json";
import recordings from "@/lib/call-demo-audio.json";
import { useHeroDemo } from "./HeroDemoContext";

const WAVE = [0.25, 0.4, 0.65, 0.85, 0.5, 1, 0.7, 0.45, 0.9, 0.6, 0.8, 0.35, 0.55, 0.3, 0.7, 0.45, 0.85, 0.55, 0.3, 0.65, 0.45, 0.25];
const ICONS = { calendar: CalendarCheck, message: MessageSquareText, user: UserRoundCheck };
const timeLabel = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const CONTROLS = {
    idle: { icon: Play, label: "Hear this call" },
    loading: { icon: LoaderCircle, label: "Loading audio" },
    playing: { icon: Pause, label: "Pause call" },
    paused: { icon: Play, label: "Resume call" },
    done: { icon: RotateCcw, label: "Play again" },
    error: { icon: RotateCcw, label: "Retry audio" },
};

/** Fictional calls with local neural-voice recordings, never device speech. */
export default function CallDemo() {
    const playRef = useHeroDemo();
    const rootRef = useRef(null);
    const audioRef = useRef(null);
    const tabRefs = useRef([]);
    const [active, setActive] = useState(0);
    const [mode, setMode] = useState("idle");
    const [elapsed, setElapsed] = useState(0);
    const [muted, setMuted] = useState(false);

    const scenario = scenarios[active];
    const recording = recordings[scenario.id];
    const following = ["loading", "playing", "paused"].includes(mode);
    const speaking = mode === "playing";
    // Audio's real clock drives the transcript, including after pause or seek.
    const current = following
        ? Math.max(0, recording.cues.findLastIndex((cue) => elapsed >= cue.start))
        : -1;
    const control = CONTROLS[mode];
    const ControlIcon = control.icon;

    const start = useCallback(async (restart = false) => {
        const audio = audioRef.current;
        if (!audio) return;
        if (restart || audio.ended) {
            audio.currentTime = 0;
            setElapsed(0);
        }
        if (audio.error) audio.load();
        setMode("loading");
        try {
            await audio.play();
        } catch (error) {
            // A switch, pause or unmount can intentionally abort a pending play.
            if (audioRef.current === audio && error.name !== "AbortError") {
                setMode("error");
            }
        }
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        const onHide = () => {
            if (document.hidden) audio?.pause();
        };
        document.addEventListener("visibilitychange", onHide);
        return () => {
            document.removeEventListener("visibilitychange", onHide);
            audio?.pause();
        };
    }, [active]);

    useEffect(() => {
        if (!playRef) return undefined;
        playRef.current = () => {
            const node = rootRef.current;
            if (node) {
                const rect = node.getBoundingClientRect();
                if (rect.top < 90 || rect.bottom > window.innerHeight) {
                    node.scrollIntoView({
                        block: "center",
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    });
                }
            }
            start(true);
        };
        return () => { playRef.current = null; };
    }, [playRef, start]);

    const selectScenario = (index) => {
        if (index === active) return;
        audioRef.current?.pause();
        setActive(index);
        setElapsed(0);
        setMode("idle");
    };

    const onTabKeyDown = (event) => {
        let next;
        if (event.key === "ArrowRight") next = (active + 1) % scenarios.length;
        else if (event.key === "ArrowLeft") next = (active - 1 + scenarios.length) % scenarios.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = scenarios.length - 1;
        else return;
        event.preventDefault();
        selectScenario(next);
        tabRefs.current[next]?.focus();
        tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
    };

    const onControl = () => {
        if (speaking || mode === "loading") {
            audioRef.current?.pause();
            setMode("paused");
        } else start(mode === "done" || mode === "error");
    };

    const status = {
        idle: "Ready when you are",
        loading: "Loading sample",
        playing: "Call in progress",
        paused: "Call paused",
        done: "Call complete",
        error: "Audio unavailable",
    }[mode];

    return (
        <div ref={rootRef} className="voice-demo">
            <audio
                key={scenario.id}
                ref={audioRef}
                src={recording.src}
                preload="none"
                muted={muted}
                onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
                onPlaying={() => setMode("playing")}
                onWaiting={() => setMode("loading")}
                onPause={(event) => {
                    if (!event.currentTarget.ended) {
                        setMode((value) => ["playing", "loading"].includes(value) ? "paused" : value);
                    }
                }}
                onEnded={() => { setMode("done"); setElapsed(recording.duration); }}
                onError={() => setMode("error")}
            />

            <div className="voice-demo-topline">
                <span><Headphones size={15} strokeWidth={1.8} /> Listen to an AI agent</span>
                <span className="voice-demo-sample">Sample call</span>
            </div>
            <div role="tablist" aria-label="Sample calls by industry" className="voice-demo-tabs">
                {scenarios.map((item, index) => (
                    <button
                        key={item.id}
                        ref={(node) => { tabRefs.current[index] = node; }}
                        type="button"
                        role="tab"
                        id={`call-tab-${item.id}`}
                        aria-selected={index === active}
                        aria-controls="call-demo-panel"
                        tabIndex={index === active ? 0 : -1}
                        onClick={() => selectScenario(index)}
                        onKeyDown={onTabKeyDown}
                    >
                        {item.tab}
                    </button>
                ))}
            </div>

            <div role="tabpanel" id="call-demo-panel" aria-labelledby={`call-tab-${scenario.id}`} className="voice-demo-panel">
                <div className="voice-demo-business">
                    <span className="voice-demo-phone"><Phone size={20} strokeWidth={1.7} /></span>
                    <div>
                        <h2>{scenario.business}</h2>
                        <p><span className={`voice-demo-status-dot ${speaking ? "is-speaking" : ""}`} aria-hidden="true" />{status}</p>
                    </div>
                    <span className="voice-demo-inbound">Inbound</span>
                </div>

                <div className="voice-demo-sound" aria-hidden="true">
                    <span>{following ? scenario.lines[current]?.who === "agent" ? "Ava · AI agent" : "Customer" : "Ava · AI agent"}</span>
                    <div className="voice-demo-wave">
                        {WAVE.map((height, index) => (
                            <span key={index} className="home-wave-bar" style={{
                                height: `${height * 100}%`,
                                "--wave-duration": `${0.65 + (index % 4) * 0.15}s`,
                                "--wave-delay": `${index * -0.09}s`,
                                animationPlayState: speaking ? "running" : "paused",
                            }} />
                        ))}
                    </div>
                    <Volume2 size={16} strokeWidth={1.7} />
                </div>

                <ol className="voice-demo-transcript" aria-label="Sample call transcript">
                    {scenario.lines.map((line, index) => (
                        <li key={`${scenario.id}-${index}`} className={`${line.who === "agent" ? "is-agent" : "is-caller"} ${following && index === current ? "is-current" : ""}`}>
                            <span className="voice-demo-speaker" aria-hidden="true">{line.who === "agent" ? "A" : "C"}</span>
                            <p><span className="sr-only">{line.who === "agent" ? "AI agent: " : "Caller: "}</span>{line.text}</p>
                        </li>
                    ))}
                </ol>

                <ul className={`voice-demo-outcomes ${following ? "is-pending" : ""}`} aria-label="Illustrative call outcomes">
                    {scenario.outcomes.map((outcome) => {
                        const Icon = ICONS[outcome.icon];
                        return (
                            <li key={outcome.label}>
                                <Icon size={17} strokeWidth={1.7} />
                                <div><p>{outcome.label}</p><span>{outcome.detail}</span></div>
                                <Check size={13} className="voice-demo-check" />
                            </li>
                        );
                    })}
                </ul>

                <div className="voice-demo-player">
                    <button type="button" onClick={onControl} className="voice-demo-play">
                        <ControlIcon size={17} className={mode === "loading" ? "voice-demo-spinner" : ""} fill={["idle", "playing", "paused"].includes(mode) ? "currentColor" : "none"} strokeWidth={1.8} />
                        {control.label}
                    </button>
                    <span className="voice-demo-time" aria-label={`${timeLabel(elapsed)} of ${timeLabel(recording.duration)}`}>{timeLabel(elapsed)} <span>/ {timeLabel(recording.duration)}</span></span>
                    <button type="button" onClick={() => setMuted((value) => !value)} className="voice-demo-mute" aria-label={muted ? "Unmute sample call" : "Mute sample call"} aria-pressed={muted}>
                        {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                    </button>
                </div>
                <progress className="voice-demo-progress" value={elapsed} max={recording.duration} aria-label="Sample call progress" />
                <p className="voice-demo-caption" role={mode === "error" ? "alert" : undefined}>
                    {mode === "error" ? "We couldn't load the audio. Retry, or read the transcript above." : "Illustrative call with AI-generated voices. No live booking is made."}
                </p>
                <span className="sr-only" role="status" aria-live="polite">{status}</span>
            </div>
        </div>
    );
}
