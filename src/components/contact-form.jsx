"use client";

import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";

function normalizeWhatsAppNumber(value) {
    return value.replace(/\D/g, "");
}

function buildWhatsAppUrl(number, message) {
    const digits = normalizeWhatsAppNumber(number);
    if (digits.length < 8 || digits.length > 15) return null;
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
    const errors = {};
    if (!form.name.trim()) errors.name = "Enter your name.";
    if (!form.email.trim()) errors.email = "Enter your email address.";
    else if (!EMAIL_PATTERN.test(form.email.trim()))
        errors.email = "Enter an email address like name@company.com.";
    if (!form.message.trim()) errors.message = "Tell us a little about what you need.";
    return errors;
}

const inputClass =
    "w-full rounded-2xl bg-[#faf9f7] px-4 py-3.5 text-base text-zinc-900 ring-1 ring-zinc-900/15 outline-none transition-shadow duration-200 placeholder:text-zinc-500 focus:ring-2 focus:ring-[#ff541f] aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600";

function Field({ id, label, optional, error, children }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-medium text-zinc-800">
                {label}
                {optional && <span className="ml-1.5 font-normal text-zinc-600">(optional)</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="text-sm text-red-700">
                    {error}
                </p>
            )}
        </div>
    );
}

/**
 * Contact form that hands the enquiry off to WhatsApp with a prefilled
 * message. Field names (name, email, phone, message) are kept stable.
 */
export default function ContactForm({ fallbackEmail }) {
    const baseId = useId();
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
        if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate(form);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            setStatus({ type: "error", text: "Check the highlighted fields and try again." });
            return;
        }

        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
        const lines = [
            "New inquiry from Syenxa Tech website",
            "",
            `Name: ${form.name.trim()}`,
            `Email: ${form.email.trim()}`,
            `Phone: ${form.phone.trim() || "Not provided"}`,
            "",
            "Message:",
            form.message.trim(),
        ];
        const url = whatsappNumber ? buildWhatsAppUrl(whatsappNumber, lines.join("\n")) : null;

        if (!url) {
            setStatus({
                type: "error",
                text: `WhatsApp is unavailable right now. Email us at ${fallbackEmail} and we will reply within one business day.`,
            });
            return;
        }

        window.open(url, "_blank", "noopener,noreferrer");
        setStatus({
            type: "success",
            text: "WhatsApp opened in a new tab with your message ready. Press send there to reach us.",
        });
    };

    const ids = {
        name: `${baseId}-name`,
        email: `${baseId}-email`,
        phone: `${baseId}-phone`,
        message: `${baseId}-message`,
    };
    const describedBy = (key) => (errors[key] ? `${ids[key]}-error` : undefined);

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id={ids.name} label="Name" error={errors.name}>
                    <input
                        id={ids.name}
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={describedBy("name")}
                        className={inputClass}
                    />
                </Field>
                <Field id={ids.phone} label="Phone" optional>
                    <input
                        id={ids.phone}
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </Field>
            </div>
            <Field id={ids.email} label="Email" error={errors.email}>
                <input
                    id={ids.email}
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy("email")}
                    className={inputClass}
                />
            </Field>
            <Field id={ids.message} label="What would you like to automate?" error={errors.message}>
                <textarea
                    id={ids.message}
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describedBy("message")}
                    className={`${inputClass} resize-none`}
                />
            </Field>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="submit"
                    className="group inline-flex w-full sm:w-fit items-center justify-between gap-3 rounded-full bg-zinc-900 pl-7 pr-2 py-2 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#d9400f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff541f] active:scale-[0.98]"
                >
                    Send on WhatsApp
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#ff541f] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-zinc-900">
                        <ArrowUpRight className="size-4" strokeWidth={2} />
                    </span>
                </button>
                <p className="text-sm text-zinc-600">We reply within one business day.</p>
            </div>

            <p
                role="status"
                aria-live="polite"
                className={`min-h-5 text-sm ${
                    status?.type === "error" ? "text-red-700" : "text-zinc-800"
                }`}
            >
                {status?.text}
            </p>
        </form>
    );
}
