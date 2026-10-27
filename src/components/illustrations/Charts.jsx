/**
 * Lightweight inline SVG charts. Server-safe (no hooks), brand palette,
 * every chart carries a title/description for screen readers and crawlers.
 */

const ORANGE = "#ff541f";
const INK = "#18181b";
const MUTED = "#a1a1aa";
const LINE = "rgba(24,24,27,0.08)";

function Frame({ title, description, viewBox, children, className = "" }) {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
        <svg
            viewBox={viewBox}
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
            className={`w-full h-auto ${className}`}
        >
            <title id={`${id}-title`}>{title}</title>
            <desc id={`${id}-desc`}>{description}</desc>
            {children}
        </svg>
    );
}

/** Horizontal bars: odds of qualifying a lead by response time. */
export function SpeedToLeadChart() {
    const rows = [
        { label: "Within 5 minutes", value: 21, display: "21x" },
        { label: "Within 10 minutes", value: 5.25, display: "~5x" },
        { label: "Within 30 minutes", value: 1, display: "1x" },
        { label: "After 1 hour", value: 0.4, display: "<1x" },
    ];
    const max = 21;
    const w = 640;
    const labelW = 190;
    const barW = w - labelW - 90;
    return (
        <Frame
            title="Odds of qualifying a lead by response time"
            description="Contacting a lead within five minutes makes qualification 21 times more likely than waiting 30 minutes, according to the MIT and InsideSales lead response study."
            viewBox={`0 0 ${w} ${rows.length * 56 + 20}`}
        >
            {rows.map((r, i) => {
                const y = 10 + i * 56;
                const bw = Math.max(8, (r.value / max) * barW);
                return (
                    <g key={r.label}>
                        <text x="0" y={y + 24} fontSize="15" fill={INK} fontWeight="600">{r.label}</text>
                        <rect x={labelW} y={y + 8} width={barW} height={26} rx="13" fill={LINE} />
                        <rect x={labelW} y={y + 8} width={bw} height={26} rx="13" fill={i === 0 ? ORANGE : "#fdba9b"} />
                        <text x={labelW + bw + 12} y={y + 26} fontSize="15" fontWeight="700" fill={i === 0 ? ORANGE : INK}>{r.display}</text>
                    </g>
                );
            })}
        </Frame>
    );
}

/** Donut: share of small business calls that go unanswered. */
export function MissedCallsDonut({ value = 62, label = "of small business calls go unanswered" }) {
    const r = 70;
    const c = 2 * Math.PI * r;
    const filled = (value / 100) * c;
    return (
        <Frame
            title={`${value}% ${label}`}
            description={`A donut chart showing that ${value} percent of inbound calls to small businesses are not answered.`}
            viewBox="0 0 420 200"
        >
            <g transform="translate(100 100)">
                <circle r={r} fill="none" stroke={LINE} strokeWidth="22" />
                <circle
                    r={r}
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeDasharray={`${filled} ${c - filled}`}
                    transform="rotate(-90)"
                />
                <text textAnchor="middle" y="12" fontSize="38" fontWeight="800" fill={INK}>{value}%</text>
            </g>
            <text x="200" y="88" fontSize="17" fontWeight="700" fill={INK}>Unanswered</text>
            <text x="200" y="112" fontSize="14" fill={MUTED}>{label}</text>
            <rect x="200" y="132" width="12" height="12" rx="3" fill={ORANGE} />
            <text x="220" y="143" fontSize="13" fill={INK}>Missed or sent to voicemail</text>
            <rect x="200" y="154" width="12" height="12" rx="3" fill="#e4e4e7" />
            <text x="220" y="165" fontSize="13" fill={INK}>Answered by a person</text>
        </Frame>
    );
}

/** Vertical bars comparing monthly cost of phone coverage options. */
export function CostBarChart() {
    const bars = [
        { label: "AI calling agent", sub: "usage, ~200 calls", value: 300, display: "$60 to $300", accent: true },
        { label: "Answering service", sub: "24/7 plans", value: 900, display: "$300 to $900" },
        { label: "Receptionist", sub: "salary + benefits", value: 3000, display: "$3,000+" },
    ];
    const max = 3000;
    const w = 640;
    const h = 300;
    const chartH = 200;
    const gap = 40;
    const bw = (w - gap * (bars.length + 1)) / bars.length;
    return (
        <Frame
            title="Monthly cost of phone coverage options for a US small business"
            description="AI calling agents cost roughly 60 to 300 dollars a month for about 200 calls, live answering services 300 to 900 dollars, and an in-house receptionist 3,000 dollars or more."
            viewBox={`0 0 ${w} ${h}`}
        >
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <line key={t} x1="0" x2={w} y1={20 + chartH - t * chartH} y2={20 + chartH - t * chartH} stroke={LINE} />
            ))}
            {bars.map((b, i) => {
                const x = gap + i * (bw + gap);
                const bh = Math.max(14, (b.value / max) * chartH);
                const y = 20 + chartH - bh;
                return (
                    <g key={b.label}>
                        <rect x={x} y={y} width={bw} height={bh} rx="14" fill={b.accent ? ORANGE : "#d4d4d8"} />
                        <text x={x + bw / 2} y={y - 10} textAnchor="middle" fontSize="16" fontWeight="800" fill={b.accent ? ORANGE : INK}>{b.display}</text>
                        <text x={x + bw / 2} y={20 + chartH + 26} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>{b.label}</text>
                        <text x={x + bw / 2} y={20 + chartH + 46} textAnchor="middle" fontSize="13" fill={MUTED}>{b.sub}</text>
                    </g>
                );
            })}
        </Frame>
    );
}

/** Range bars: what a small business website costs by build type (2026, US). */
export function WebsiteCostChart() {
    const rows = [
        { label: "DIY builder", lo: 200, hi: 600, display: "$200 to $600 / yr" },
        { label: "Freelancer", lo: 2000, hi: 8000, display: "$2,000 to $8,000" },
        { label: "Boutique agency", lo: 8000, hi: 15000, display: "$8,000 to $15,000+" },
        { label: "Syenxa Tech", lo: 200, hi: 2500, display: "From $200", accent: true },
    ];
    const max = 16000;
    const w = 640;
    const labelW = 150;
    const barW = w - labelW - 170;
    return (
        <Frame
            title="Small business website cost by build type, USA 2026"
            description="Range bars comparing 2026 US website costs: DIY builders 200 to 600 dollars a year, freelancers 2,000 to 8,000 dollars, boutique agencies 8,000 to 15,000 dollars or more, and Syenxa Tech from 200 dollars."
            viewBox={`0 0 ${w} ${rows.length * 56 + 20}`}
        >
            {rows.map((r, i) => {
                const y = 10 + i * 56;
                const x1 = labelW + (r.lo / max) * barW;
                const x2 = labelW + (r.hi / max) * barW;
                return (
                    <g key={r.label}>
                        <text x="0" y={y + 24} fontSize="15" fontWeight="600" fill={r.accent ? ORANGE : INK}>{r.label}</text>
                        <rect x={labelW} y={y + 8} width={barW} height={26} rx="13" fill={LINE} />
                        <rect x={x1} y={y + 8} width={Math.max(18, x2 - x1)} height={26} rx="13" fill={r.accent ? ORANGE : "#a1a1aa"} />
                        <text x={labelW + barW + 12} y={y + 26} fontSize="14" fontWeight="700" fill={r.accent ? ORANGE : INK}>{r.display}</text>
                    </g>
                );
            })}
        </Frame>
    );
}

/** Lighthouse-style score rings. */
export function ScoreRings({ scores = [
    { label: "Performance", value: 98 },
    { label: "SEO", value: 100 },
    { label: "Accessibility", value: 96 },
    { label: "Best practices", value: 100 },
] }) {
    const r = 26;
    const c = 2 * Math.PI * r;
    return (
        <Frame
            title="Target Lighthouse scores for every Syenxa Tech website"
            description="Four score rings: performance 98, SEO 100, accessibility 96, best practices 100."
            viewBox={`0 0 ${scores.length * 110} 110`}
        >
            {scores.map((s, i) => {
                const cx = 55 + i * 110;
                const filled = (s.value / 100) * c;
                return (
                    <g key={s.label} transform={`translate(${cx} 44)`}>
                        <circle r={r} fill="none" stroke="rgba(22,163,74,0.15)" strokeWidth="6" />
                        <circle r={r} fill="none" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${filled} ${c - filled}`} transform="rotate(-90)" />
                        <text textAnchor="middle" y="6" fontSize="17" fontWeight="800" fill="#15803d">{s.value}</text>
                        <text textAnchor="middle" y="50" fontSize="11" fontWeight="600" fill={INK}>{s.label}</text>
                    </g>
                );
            })}
        </Frame>
    );
}

/** Funnel: what US consumers do after a local mobile search. */
export function LocalSearchFunnel() {
    const steps = [
        { label: "Research online before buying", value: 81, note: "of US shoppers" },
        { label: "Visit the company website first", value: 63, note: "of consumers" },
        { label: "Visit a business within 24 hours of a local mobile search", value: 76, note: "of local searchers" },
        { label: "Purchase within a week", value: 28, note: "of local searches" },
    ];
    const w = 640;
    return (
        <Frame
            title="How US consumers move from search to purchase"
            description="81 percent research online before buying, 63 percent visit the company website first, 76 percent of local mobile searchers visit a business within a day, and 28 percent purchase within a week."
            viewBox={`0 0 ${w} ${steps.length * 70 + 10}`}
        >
            {steps.map((s, i) => {
                const y = 5 + i * 70;
                const bw = (s.value / 100) * (w - 40);
                const x = (w - bw) / 2;
                return (
                    <g key={s.label}>
                        <rect x={x} y={y} width={bw} height={52} rx="14" fill={i === 0 ? ORANGE : i === 1 ? "#ff7a4d" : i === 2 ? "#ff9f7a" : "#ffc4ab"} />
                        <text x={w / 2} y={y + 22} textAnchor="middle" fontSize="18" fontWeight="800" fill={i < 3 ? "#fff" : INK}>{s.value}%</text>
                        <text x={w / 2} y={y + 41} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={i < 3 ? "rgba(255,255,255,0.9)" : INK}>{s.label}</text>
                    </g>
                );
            })}
        </Frame>
    );
}

/** Stacked comparison: where clicks go in 2026 US Google searches. */
export function ZeroClickChart() {
    const rows = [
        { label: "All Google searches (US)", value: 68 },
        { label: "Searches showing an AI Overview", value: 83 },
        { label: "Google AI Mode", value: 93 },
    ];
    const w = 640;
    const labelW = 250;
    const barW = w - labelW - 70;
    return (
        <Frame
            title="Share of searches that end without a click to any website, 2026"
            description="68 percent of US Google searches end without a click, 83 percent when an AI Overview is shown, and 93 percent in Google AI Mode."
            viewBox={`0 0 ${w} ${rows.length * 56 + 20}`}
        >
            {rows.map((r, i) => {
                const y = 10 + i * 56;
                const bw = (r.value / 100) * barW;
                return (
                    <g key={r.label}>
                        <text x="0" y={y + 24} fontSize="14" fontWeight="600" fill={INK}>{r.label}</text>
                        <rect x={labelW} y={y + 8} width={barW} height={26} rx="13" fill={LINE} />
                        <rect x={labelW} y={y + 8} width={bw} height={26} rx="13" fill={i === 2 ? ORANGE : i === 1 ? "#ff7a4d" : "#ff9f7a"} />
                        <text x={labelW + bw + 10} y={y + 26} fontSize="15" fontWeight="800" fill={INK}>{r.value}%</text>
                    </g>
                );
            })}
        </Frame>
    );
}

/** Voice latency comparison (milliseconds) between voice systems. Lower is better. */
export function VoiceLatencyChart() {
    const rows = [
        { label: "Human conversational pause", value: 300, display: "250-350 ms", note: "Natural speech benchmark" },
        { label: "Syenxa custom voice AI agent", value: 480, display: "450-520 ms", note: "Sub-second real-time response", accent: true },
        { label: "Generic SaaS DIY voice bot", value: 1400, display: "1,200-1,800 ms", note: "Noticeable awkward pause" },
        { label: "Legacy phone IVR tree", value: 3500, display: "3,000+ ms", note: "Robotic touch-tone menus" },
    ];
    const max = 3600;
    const w = 640;
    const labelW = 230;
    const barW = w - labelW - 130;
    return (
        <Frame
            title="Conversational voice latency comparison in milliseconds"
            description="Syenxa custom voice AI responds in 450 to 520 milliseconds, closely approaching human conversational benchmarks (250-350ms) compared to 1,400ms for generic bots and 3,500ms for legacy IVR menus."
            viewBox={`0 0 ${w} ${rows.length * 62 + 20}`}
        >
            {rows.map((r, i) => {
                const y = 10 + i * 62;
                const bw = Math.max(16, (r.value / max) * barW);
                return (
                    <g key={r.label}>
                        <text x="0" y={y + 22} fontSize="14" fontWeight="600" fill={r.accent ? ORANGE : INK}>{r.label}</text>
                        <text x="0" y={y + 40} fontSize="11" fill={MUTED}>{r.note}</text>
                        <rect x={labelW} y={y + 10} width={barW} height={24} rx="12" fill={LINE} />
                        <rect x={labelW} y={y + 10} width={bw} height={24} rx="12" fill={r.accent ? ORANGE : i === 0 ? "#16a34a" : "#a1a1aa"} />
                        <text x={labelW + bw + 12} y={y + 27} fontSize="14" fontWeight="700" fill={r.accent ? ORANGE : i === 0 ? "#15803d" : INK}>{r.display}</text>
                    </g>
                );
            })}
        </Frame>
    );
}

/** Channel conversion rates: Inbound voice vs Live chat vs Web forms. */
export function ChannelConversionChart() {
    const rows = [
        { label: "Inbound Phone Call (Voice AI)", value: 42, display: "35% - 50%", note: "Immediate high-intent buyer dialog", accent: true },
        { label: "Interactive Web Chatbot", value: 16, display: "12% - 18%", note: "Assisted web self-service & intake", accent: false },
        { label: "Static Website Form", value: 3.5, display: "2% - 4%", note: "Passive asynchronous contact form", accent: false },
    ];
    const max = 50;
    const w = 640;
    const labelW = 250;
    const barW = w - labelW - 120;
    return (
        <Frame
            title="Inbound lead conversion rates by customer engagement channel"
            description="Inbound phone calls convert at 35 to 50 percent, compared to 12 to 18 percent for interactive chatbots and 2 to 4 percent for static contact forms."
            viewBox={`0 0 ${w} ${rows.length * 64 + 20}`}
        >
            {rows.map((r, i) => {
                const y = 10 + i * 64;
                const bw = Math.max(16, (r.value / max) * barW);
                return (
                    <g key={r.label}>
                        <text x="0" y={y + 22} fontSize="14" fontWeight="600" fill={r.accent ? ORANGE : INK}>{r.label}</text>
                        <text x="0" y={y + 40} fontSize="11" fill={MUTED}>{r.note}</text>
                        <rect x={labelW} y={y + 10} width={barW} height={24} rx="12" fill={LINE} />
                        <rect x={labelW} y={y + 10} width={bw} height={24} rx="12" fill={r.accent ? ORANGE : "#fdba9b"} />
                        <text x={labelW + bw + 12} y={y + 27} fontSize="14" fontWeight="700" fill={r.accent ? ORANGE : INK}>{r.display}</text>
                    </g>
                );
            })}
        </Frame>
    );
}

/** Architectural latency pipeline breakdown: Voice AI vs Text Chatbot. */
export function PipelineLatencyBreakdown() {
    const w = 640;
    return (
        <Frame
            title="Conversational Architecture: Voice AI Pipeline vs Chatbot Pipeline"
            description="Voice AI streaming pipeline processes audio via ASR, LLM, and TTS in under 500ms, while text chatbots stream tokens asynchronously over 1,000 to 2,000ms."
            viewBox="0 0 640 210"
        >
            {/* Voice Stream Pipeline */}
            <g transform="translate(10, 15)">
                <text x="0" y="16" fontSize="13" fontWeight="700" fill={ORANGE} letterSpacing="0.5">VOICE STREAM PIPELINE (~450ms Total)</text>
                
                <rect x="0" y="30" width="135" height="44" rx="10" fill="rgba(255,84,31,0.08)" stroke="rgba(255,84,31,0.3)" strokeWidth="1" />
                <text x="67" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>Streaming ASR</text>
                <text x="67" y="66" textAnchor="middle" fontSize="10" fill={MUTED}>~120ms</text>

                <text x="148" y="57" textAnchor="middle" fontSize="14" fill={MUTED}>➔</text>

                <rect x="160" y="30" width="145" height="44" rx="10" fill="rgba(255,84,31,0.08)" stroke="rgba(255,84,31,0.3)" strokeWidth="1" />
                <text x="232" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>LLM First Token</text>
                <text x="232" y="66" textAnchor="middle" fontSize="10" fill={MUTED}>~180ms TTFT</text>

                <text x="318" y="57" textAnchor="middle" fontSize="14" fill={MUTED}>➔</text>

                <rect x="330" y="30" width="135" height="44" rx="10" fill="rgba(255,84,31,0.08)" stroke="rgba(255,84,31,0.3)" strokeWidth="1" />
                <text x="397" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>Streaming TTS</text>
                <text x="397" y="66" textAnchor="middle" fontSize="10" fill={MUTED}>~150ms</text>

                <text x="478" y="57" textAnchor="middle" fontSize="14" fill={MUTED}>➔</text>

                <rect x="490" y="30" width="125" height="44" rx="10" fill={ORANGE} />
                <text x="552" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">Audio Output</text>
                <text x="552" y="66" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.85)">Sub-500ms</text>
            </g>

            {/* Chatbot Pipeline */}
            <g transform="translate(10, 115)">
                <text x="0" y="16" fontSize="13" fontWeight="700" fill={INK} letterSpacing="0.5">CHATBOT STREAM PIPELINE (~1,200ms Total)</text>
                
                <rect x="0" y="30" width="180" height="44" rx="10" fill={LINE} />
                <text x="90" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>HTTP / WebSocket In</text>
                <text x="90" y="66" textAnchor="middle" fontSize="10" fill={MUTED}>Instant payload</text>

                <text x="195" y="57" textAnchor="middle" fontSize="14" fill={MUTED}>➔</text>

                <rect x="210" y="30" width="220" height="44" rx="10" fill={LINE} />
                <text x="320" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>RAG + Prompt Reasoning</text>
                <text x="320" y="66" textAnchor="middle" fontSize="10" fill={MUTED}>600ms - 1,200ms</text>

                <text x="445" y="57" textAnchor="middle" fontSize="14" fill={MUTED}>➔</text>

                <rect x="460" y="30" width="155" height="44" rx="10" fill="#27272a" />
                <text x="537" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">Token Stream UI</text>
                <text x="537" y="66" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)">Progressive typing</text>
            </g>
        </Frame>
    );
}
