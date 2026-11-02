"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { BUSINESS, SERVICE_DAYS } from "@/lib/business";
import { CheckCircleIcon, InfoIcon, PhoneIcon } from "./icons";

type Values = {
  name: string;
  phone: string;
  email: string;
  year: string;
  make: string;
  model: string;
  issue: string;
  day: string;
  contactMethod: "call" | "text" | "email";
};

type Errors = Partial<Record<keyof Values, string>>;

const INITIAL: Values = {
  name: "",
  phone: "",
  email: "",
  year: "",
  make: "",
  model: "",
  issue: "",
  day: "",
  contactMethod: "call",
};

const FIELD_ORDER: (keyof Values)[] = [
  "name",
  "phone",
  "email",
  "contactMethod",
  "year",
  "make",
  "model",
  "issue",
  "day",
];

const CONTACT_METHODS = [
  { value: "call", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;

function validate(v: Values): Errors {
  const e: Errors = {};
  const maxYear = new Date().getFullYear() + 1;
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  const digits = v.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (!digits) e.phone = "Please enter a phone number so we can reach you.";
  else if (digits.length !== 10) e.phone = "Please enter a 10-digit phone number.";
  if (v.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
      e.email = "Please enter a valid email address.";
  } else if (v.contactMethod === "email") {
    e.email = "Add an email address, or choose a different contact method.";
  }
  if (v.year.trim()) {
    const y = Number(v.year);
    if (!/^\d{4}$/.test(v.year.trim()) || y < 1900 || y > maxYear)
      e.year = `Enter a 4-digit year (1900–${maxYear}).`;
  }
  if (!v.make.trim()) e.make = "Please enter the vehicle make.";
  if (!v.model.trim()) e.model = "Please enter the vehicle model.";
  if (v.issue.trim().length < 10)
    e.issue = "Please describe the issue in a few words (at least 10 characters).";
  if (!v.day) e.day = "Please choose a preferred day.";
  return e;
}

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  const local = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
  if (local.length < 4) return raw;
  if (local.length < 7) return `(${local.slice(0, 3)}) ${local.slice(3)}`;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 10)}`;
}

const inputBase =
  "mt-1.5 block w-full rounded-xl border bg-white px-4 py-3 text-base text-navy-950 shadow-sm placeholder:text-navy-400 focus:outline-none focus-visible:outline-none focus:ring-4";
const inputOk = "border-navy-200 focus:border-accent-600 focus:ring-accent-500/25";
const inputErr = "border-brand-red focus:border-brand-red focus:ring-brand-red/20";

export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState<Values | null>(null);

  const id = (k: string) => `${uid}-${k}`;

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setAttempted(true);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      return;
    }
    // Demo only: no backend. A real integration would POST here.
    setSubmitted(values);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  function reset() {
    setValues(INITIAL);
    setErrors({});
    setAttempted(false);
    setSubmitted(null);
  }

  if (submitted) {
    const method = CONTACT_METHODS.find((m) => m.value === submitted.contactMethod)!;
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200 focus:outline-none sm:p-8"
      >
        <CheckCircleIcon className="h-10 w-10 text-emerald-600" />
        <h3 className="mt-4 text-3xl font-bold text-navy-950 uppercase">
          Thanks, {submitted.name.trim().split(/\s+/)[0]}!
        </h3>
        <p className="mt-2 text-lg text-navy-800">
          Your request for the{" "}
          <strong>
            {[submitted.year, submitted.make, submitted.model].filter(Boolean).join(" ")}
          </strong>{" "}
          has been noted, with <strong>{submitted.day}</strong> as your preferred day. We&rsquo;ll
          reach out by <strong>{method.label.toLowerCase()}</strong>.
        </p>
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-white/70 p-3 text-sm text-navy-700 ring-1 ring-emerald-200">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            This is a demo form — nothing was actually sent. For anything urgent, please call{" "}
            <a href={BUSINESS.phone.href} className="font-semibold underline">
              {BUSINESS.phone.display}
            </a>
            .
          </span>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={BUSINESS.phone.href} className="btn-primary">
            <PhoneIcon className="h-5 w-5" /> Call now
          </a>
          <button type="button" onClick={reset} className="btn-outline">
            Send another request
          </button>
        </div>
      </div>
    );
  }

  const field = (key: keyof Values) => ({
    id: id(key),
    name: key,
    "data-field": key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? id(`${key}-error`) : undefined,
    className: `${inputBase} ${errors[key] ? inputErr : inputOk}`,
  });

  const errorText = (k: keyof Values) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className="mt-1.5 text-sm font-medium text-brand-red">
        {errors[k]}
      </p>
    ) : null;

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={id("demo-note")}>
      <p id={id("demo-note")} className="flex items-start gap-2 rounded-xl bg-accent-500/10 p-3 text-sm text-navy-800 ring-1 ring-accent-500/30">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-700" />
        <span>
          Demo form — requests aren&rsquo;t sent anywhere yet. For urgent needs, call{" "}
          <a href={BUSINESS.phone.href} className="font-semibold underline">
            {BUSINESS.phone.display}
          </a>
          .
        </span>
      </p>

      {attempted && errorCount > 0 ? (
        <div role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800 ring-1 ring-red-200">
          Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} below.
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="font-medium text-navy-900">
            Name <span className="text-brand-red" aria-hidden="true">*</span>
          </label>
          <input
            {...field("name")}
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={id("phone")} className="font-medium text-navy-900">
            Phone <span className="text-brand-red" aria-hidden="true">*</span>
          </label>
          <input
            {...field("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="e.g. (214) 555-0123"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={(e) => update("phone", formatPhone(e.target.value))}
          />
          {errorText("phone")}
        </div>
      </div>

      <div>
        <label htmlFor={id("email")} className="font-medium text-navy-900">
          Email <span className="text-sm font-normal text-navy-500">(optional)</span>
        </label>
        <input
          {...field("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
        />
        {errorText("email")}
      </div>

      <fieldset>
        <legend className="font-medium text-navy-900">Preferred contact method</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {CONTACT_METHODS.map((m, i) => (
            <label
              key={m.value}
              className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-sm font-medium transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent-500/30 ${
                values.contactMethod === m.value
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-200 bg-white text-navy-800 hover:border-navy-400"
              }`}
            >
              <input
                type="radio"
                name="contactMethod"
                value={m.value}
                data-field={i === 0 ? "contactMethod" : undefined}
                checked={values.contactMethod === m.value}
                onChange={() => update("contactMethod", m.value)}
                className="sr-only"
              />
              {m.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-medium text-navy-900">Vehicle</legend>
        <div className="mt-1 grid grid-cols-[minmax(0,6rem)_1fr] gap-3 sm:grid-cols-[7rem_1fr_1fr]">
          <div>
            <label htmlFor={id("year")} className="text-sm text-navy-700">
              Year
            </label>
            <input
              {...field("year")}
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="e.g. 2015"
              value={values.year}
              onChange={(e) => update("year", e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <div>
            <label htmlFor={id("make")} className="text-sm text-navy-700">
              Make <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              {...field("make")}
              type="text"
              required
              placeholder="e.g. Ford"
              value={values.make}
              onChange={(e) => update("make", e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor={id("model")} className="text-sm text-navy-700">
              Model <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              {...field("model")}
              type="text"
              required
              placeholder="e.g. F-150"
              value={values.model}
              onChange={(e) => update("model", e.target.value)}
            />
          </div>
        </div>
        {errorText("year")}
        {errorText("make")}
        {errorText("model")}
      </fieldset>

      <div>
        <label htmlFor={id("issue")} className="font-medium text-navy-900">
          What&rsquo;s going on? <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        <textarea
          {...field("issue")}
          rows={5}
          required
          placeholder="e.g., Grinding noise when braking, started last week."
          value={values.issue}
          onChange={(e) => update("issue", e.target.value)}
        />
        {errorText("issue")}
      </div>

      <div>
        <label htmlFor={id("day")} className="font-medium text-navy-900">
          Preferred day <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        <select
          {...field("day")}
          required
          value={values.day}
          onChange={(e) => update("day", e.target.value)}
        >
          <option value="" disabled>
            Select a day (Tue–Sat)
          </option>
          {SERVICE_DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errorText("day")}
      </div>

      <p className="text-sm text-navy-500">
        <span className="text-brand-red" aria-hidden="true">*</span> Required field
      </p>

      <button type="submit" className="btn-primary w-full text-lg sm:w-auto sm:px-8">
        Send request
      </button>
    </form>
  );
}
