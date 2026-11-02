import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS, REVIEW_ATTRIBUTION } from "@/lib/business";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  NavigationIcon,
  PhoneIcon,
  QuoteIcon,
  StarIcon,
} from "./icons";

export function Stars({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-accent-500" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  );
}

/** Aggregate Google rating badge. */
export function GoogleRatingBadge({
  tone = "light",
  linked = true,
}: {
  tone?: "light" | "dark";
  linked?: boolean;
}) {
  const inner = (
    <>
      <GoogleG className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="flex items-center gap-2">
          <span className={`font-display text-2xl font-bold ${tone === "dark" ? "text-white" : "text-navy-950"}`}>
            {BUSINESS.rating.value}
          </span>
          <Stars className="h-4 w-4" />
        </span>
        <span className={`text-xs font-medium ${tone === "dark" ? "text-white/75" : "text-navy-600"}`}>
          on Google · {BUSINESS.rating.count}+ reviews
        </span>
      </span>
    </>
  );
  const cls = `inline-flex items-center gap-3 rounded-2xl px-4 py-2.5 ${
    tone === "dark"
      ? "bg-white/10 ring-1 ring-white/20 backdrop-blur-sm"
      : "bg-white ring-1 ring-navy-100 shadow-sm"
  }`;
  return linked ? (
    <a
      href={BUSINESS.links.googleReviews}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} transition hover:ring-accent-500`}
      aria-label={`Rated ${BUSINESS.rating.value} out of 5 on Google from ${BUSINESS.rating.count}+ reviews — read reviews on Google (opens in new tab)`}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export function ReviewCard({
  quote,
  size = "md",
}: {
  quote: string;
  size?: "md" | "lg";
}) {
  return (
    <figure className="card relative flex h-full flex-col p-6 sm:p-7">
      <QuoteIcon className="absolute top-5 right-5 h-8 w-8 text-navy-100" />
      <Stars className="h-4.5 w-4.5" />
      <blockquote
        className={`mt-4 flex-1 font-medium text-navy-900 ${
          size === "lg" ? "text-lg leading-relaxed sm:text-xl" : "leading-relaxed"
        }`}
      >
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-2 border-t border-navy-100 pt-4 text-sm text-navy-600">
        <GoogleG className="h-4 w-4" />
        {REVIEW_ATTRIBUTION}
      </figcaption>
    </figure>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "dark" ? "text-accent-400" : "text-accent-700"}`}>{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className={`mt-2 text-3xl leading-[1.05] font-bold uppercase sm:text-4xl ${
          tone === "dark" ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-lg leading-relaxed ${tone === "dark" ? "text-navy-100" : "text-navy-700"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function CallButton({ className = "btn-primary", label }: { className?: string; label?: string }) {
  return (
    <a href={BUSINESS.phone.href} className={className}>
      <PhoneIcon className="h-5 w-5" />
      {label ?? `Call ${BUSINESS.phone.display}`}
    </a>
  );
}

export function RequestLink({ className = "btn-outline" }: { className?: string }) {
  return (
    <Link href="/contact#request" className={className}>
      Request service
      <ArrowRightIcon className="h-5 w-5" />
    </Link>
  );
}

export function DirectionsLink({ className = "btn-outline" }: { className?: string }) {
  return (
    <a
      href={BUSINESS.links.directions}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <NavigationIcon className="h-5 w-5" />
      Get directions
      <span className="sr-only"> (opens Google Maps in a new tab)</span>
    </a>
  );
}

export function GoogleReviewsLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={BUSINESS.links.googleReviews}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 font-semibold text-navy-900 underline decoration-accent-500 decoration-2 underline-offset-4 hover:text-accent-700 ${className}`}
    >
      Read all our reviews on Google
      <ExternalLinkIcon className="h-4 w-4" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-navy-100 ring-1 ring-navy-900/10 ${className}`}>
      <iframe
        src={BUSINESS.links.mapEmbed}
        title={`Map showing ${BUSINESS.name} at 1785 I-30 Ste D, Rockwall, TX`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-full min-h-72 w-full border-0"
        allowFullScreen
      />
    </div>
  );
}

/** Full-width call-to-action band. */
export function CtaBand({
  title = "Car trouble? Talk to Bobby.",
  text = "Call for an honest diagnosis and a straight answer — or send a service request and we'll get back to you.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900" aria-labelledby="cta-band-title">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,#fff_0_2px,transparent_2px_22px)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" aria-hidden="true" />
      <div className="container-page relative flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-xl">
          <h2 id="cta-band-title" className="text-3xl font-bold text-white uppercase sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg text-navy-100">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
          <CallButton />
          <RequestLink className="btn-outline-light" />
        </div>
      </div>
    </section>
  );
}

/** Interior page header with optional background image. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      {image ? (
        <>
          {image}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/55"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:repeating-linear-gradient(135deg,#fff_0_2px,transparent_2px_22px)]"
          aria-hidden="true"
        />
      )}
      <div className="container-page py-14 sm:py-20">
        <p className="eyebrow text-accent-400">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.02] font-bold text-white uppercase sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{intro}</p> : null}
      </div>
    </section>
  );
}
