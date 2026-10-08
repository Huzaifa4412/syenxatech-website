import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

/* Indicative figures retained from the linked 2026 pricing guide. */
const OPTIONS = [
    { name: "AI calling agent", cost: "$60 to $300", hours: "24/7, including holidays", capacity: "Multiple calls at once", booking: "Books into your calendar", highlight: true },
    { name: "Live answering service", cost: "$300 to $900", hours: "24/7 on higher plans", capacity: "Limited by available staff", booking: "Takes a message; may book" },
    { name: "In-house receptionist", cost: "$3,000+", hours: "Business hours", capacity: "One call at a time", booking: "Books into your calendar" },
];
const COLUMNS = [
    { key: "cost", label: "Monthly cost" }, { key: "hours", label: "Availability" },
    { key: "capacity", label: "Call capacity" }, { key: "booking", label: "Booking" },
];

export default function CoverageComparison() {
    return (
        <section id="compare" aria-labelledby="compare-heading" className="hp-section hp-comparison">
            <div className="hp-container">
                <Reveal className="hp-comparison-layout">
                    <div className="hp-comparison-intro">
                        <h2 id="compare-heading">More coverage.<br /><span>A different cost.</span></h2>
                        <p>Compare three ways to cover the phone, using indicative US costs for about 200 calls a month.</p>
                        <Link href="/blog/ai-calling-agent-cost-2026" className="hp-text-link">See the pricing breakdown<ArrowUpRight size={17} /></Link>
                    </div>
                    <div className="hp-comparison-data">
                        <div className="hp-comparison-desktop">
                            <table>
                                <caption className="sr-only">Indicative US monthly costs for about 200 calls, hours, capacity and booking</caption>
                                <thead><tr><th scope="col">Your options</th>{COLUMNS.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr></thead>
                                <tbody>{OPTIONS.map((option) => (
                                    <tr key={option.name} className={option.highlight ? "is-highlighted" : ""}>
                                        <th scope="row">{option.name}</th>
                                        {COLUMNS.map((column) => <td key={column.key} className={column.key === "cost" ? "hp-comparison-cost" : ""}>{option[column.key]}{column.key === "cost" && option.name === "In-house receptionist" && <small>with benefits</small>}</td>)}
                                    </tr>
                                ))}</tbody>
                            </table>
                        </div>
                        <div className="hp-comparison-mobile">
                            {OPTIONS.map((option) => <article key={option.name} className={option.highlight ? "is-highlighted" : ""}>
                                <h3>{option.name}</h3><p className="hp-comparison-cost">{option.cost}{option.name === "In-house receptionist" && <small>with benefits</small>}</p>
                                <dl>{COLUMNS.filter((column) => column.key !== "cost").map((column) => <div key={column.key}><dt>{column.label}</dt><dd>{option[column.key]}</dd></div>)}</dl>
                            </article>)}
                        </div>
                        <p className="hp-comparison-note">Illustrative market ranges, not a Syenxa quote. Your package depends on call volume, languages and integrations.</p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
