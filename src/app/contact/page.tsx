import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ClockIcon, InfoIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { HoursTable, OpenStatusBadge } from "@/components/OpenStatus";
import { DirectionsLink, MapEmbed, PageHeader } from "@/components/ui";
import { ADDRESS_LINE_1, ADDRESS_LINE_2, BUSINESS } from "@/lib/business";

const DESCRIPTION = `Call ${BUSINESS.phone.display} or request service online. Bobby's Garage is at ${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}. Open Tue–Fri 8:30–5:30, Sat 8:30–5.`;

export const metadata: Metadata = {
  title: "Contact & Request Service",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Bobby's Garage",
    description: DESCRIPTION,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's get you back on the road"
        intro="The fastest way to reach us is a phone call. You can also send a service request below and we'll follow up."
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-12">
          {/* Form */}
          <div id="request" className="card scroll-mt-24 p-6 sm:p-8" aria-labelledby="request-title">
            <p className="eyebrow text-accent-700">Request service</p>
            <h2 id="request-title" className="mt-2 text-3xl font-bold text-navy-950 uppercase sm:text-4xl">
              Tell us what&rsquo;s going on
            </h2>
            <p className="mt-2 mb-6 text-navy-700">
              Share a few details and we&rsquo;ll reach out to talk it through.
            </p>
            <ContactForm />
          </div>

          {/* Details */}
          <aside className="space-y-6" aria-label="Shop contact details">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-navy-950 uppercase">Call or visit</h2>
              <a
                href={BUSINESS.phone.href}
                className="mt-4 flex items-center gap-3 rounded-xl bg-navy-900 p-4 text-white transition hover:bg-navy-800"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-500 text-navy-950">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium tracking-wider text-navy-200 uppercase">
                    Tap to call
                  </span>
                  <span className="font-display text-2xl font-bold tracking-wide">
                    {BUSINESS.phone.display}
                  </span>
                </span>
              </a>
              <address className="mt-5 flex items-start gap-3 not-italic">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" />
                <span className="text-navy-900">
                  <span className="font-semibold">{BUSINESS.alternateName}</span>
                  <br />
                  {ADDRESS_LINE_1}
                  <br />
                  {ADDRESS_LINE_2}
                </span>
              </address>
              <div
                className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-500/10 p-4 text-sm leading-relaxed text-navy-800 ring-1 ring-accent-500/30"
                role="note"
              >
                <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-700" />
                <p>
                  <strong>Heads up:</strong> we&rsquo;re at <strong>{ADDRESS_LINE_1}</strong>. If you
                  saw <strong>{BUSINESS.outdatedAddress}</strong> in an old listing, that&rsquo;s
                  outdated — come see us on I-30!
                </p>
              </div>
              <DirectionsLink className="btn-outline mt-5 w-full" />
            </div>

            <div className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-navy-950 uppercase">
                  <ClockIcon className="h-5 w-5 text-accent-700" /> Hours
                </h2>
                <OpenStatusBadge />
              </div>
              <HoursTable className="mt-4" />
              <p className="mt-3 text-xs text-navy-500">All times Central.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-16 sm:pb-24" aria-label="Map">
        <div className="container-page">
          <MapEmbed className="h-80 sm:h-96" />
        </div>
      </section>
    </>
  );
}
