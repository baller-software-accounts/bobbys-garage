import Link from "next/link";
import { BUSINESS } from "@/lib/business";

/** Badge mark: navy rounded shield with an amber wrench crossing a gear. */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" rx="12" fill="#0f1a2e" />
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="9.5"
        fill="none"
        stroke="#f2a10f"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <g transform="translate(24 24)">
        <circle r="9.5" fill="none" stroke="#d7e0ee" strokeWidth="3" strokeDasharray="3.6 2.4" />
        <circle r="5" fill="none" stroke="#d7e0ee" strokeWidth="2" />
      </g>
      <path
        d="M33.7 10.6a6.4 6.4 0 0 0-8.5 7.8L12.4 31.2a2.4 2.4 0 0 0 3.4 3.4l12.8-12.8a6.4 6.4 0 0 0 7.8-8.5l-3.6 3.6-3-.8-.8-3z"
        fill="#f2a10f"
      />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 rounded-lg"
      aria-label={`${BUSINESS.name} — home`}
    >
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-bold tracking-wide uppercase ${
            tone === "light" ? "text-white" : "text-navy-900"
          }`}
        >
          Bobby&rsquo;s Garage
        </span>
        <span
          className={`mt-0.5 text-[0.66rem] font-semibold tracking-[0.1em] whitespace-nowrap uppercase sm:tracking-[0.16em] ${
            tone === "light" ? "text-accent-400" : "text-accent-700"
          }`}
        >
          Auto Repair · Mobile Service
        </span>
      </span>
    </Link>
  );
}
