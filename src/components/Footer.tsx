import Link from "next/link";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  BUSINESS,
  HOURS_SUMMARY,
  NAV_LINKS,
} from "@/lib/business";
import { ClockIcon, MapPinIcon, PhoneIcon } from "./icons";
import { Logo } from "./Logo";

/** Cached so the year is captured in the static shell (Cache Components). */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="bg-navy-950 pb-28 text-navy-100 md:pb-0">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">
            Independent, family-owned auto repair and mobile service in Rockwall,
            TX. Honest diagnosis, no upsell.
          </p>
        </div>

        <div>
          <h2 className="eyebrow text-accent-400">Visit</h2>
          <address className="mt-3 space-y-3 text-sm not-italic">
            <a
              href={BUSINESS.links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2.5 hover:text-white"
            >
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
              <span>
                {ADDRESS_LINE_1}
                <br />
                {ADDRESS_LINE_2}
              </span>
            </a>
            <a
              href={BUSINESS.phone.href}
              className="flex items-center gap-2.5 font-semibold text-white hover:text-accent-300"
            >
              <PhoneIcon className="h-4 w-4 shrink-0 text-accent-400" />
              {BUSINESS.phone.display}
            </a>
          </address>
        </div>

        <div>
          <h2 className="eyebrow text-accent-400">Hours</h2>
          <dl className="mt-3 space-y-1.5 text-sm">
            {HOURS_SUMMARY.map((row) => (
              <div key={row.days} className="flex gap-2.5">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-400/70" />
                <dt className="w-20 shrink-0 text-navy-200">{row.days}</dt>
                <dd className="text-white">{row.hours}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-accent-400">Explore</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {BUSINESS.name}. All rights reserved.
          </p>
          <p>{BUSINESS.rating.label}</p>
        </div>
      </div>
    </footer>
  );
}
