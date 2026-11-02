import type { Metadata } from "next";
import Image from "next/image";
import { CheckIcon, InfoIcon, PhoneIcon } from "@/components/icons";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CallButton, CtaBand, PageHeader, RequestLink } from "@/components/ui";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/services";

const DESCRIPTION =
  "Brakes, suspension & steering, AC & cooling, engine & drivetrain, electrical diagnostics, maintenance, and mobile mechanic service in Rockwall, TX — from an honest, family-owned shop.";

export const metadata: Metadata = {
  title: "Auto Repair Services",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Auto Repair Services | Bobby's Garage",
    description: DESCRIPTION,
    url: "/services",
    images: [{ url: "/images/engine-work.jpg", alt: "Engine repair at Bobby's Garage" }],
  },
};

export default function ServicesPage() {
  const shopServices = SERVICES.filter((s) => s.slug !== "mobile-service");
  const mobile = SERVICES.find((s) => s.slug === "mobile-service")!;

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everyday repairs, explained honestly"
        intro="We diagnose carefully, explain what we find, and recommend repairs with best value in mind. If something can wait, we'll tell you."
        image={
          <Image
            src="/images/engine-work.jpg"
            alt="Close-up of a mechanic's hands working on a car engine"
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover"
          />
        }
      />

      <section className="py-14 sm:py-20" aria-label="Service categories">
        <div className="container-page">
          <nav aria-label="Jump to a service" className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
            <ul className="flex gap-2 sm:flex-wrap">
              {SERVICES.map((s) => (
                <li key={s.slug} className="shrink-0">
                  <a
                    href={`#${s.slug}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-navy-100 bg-white px-4 text-sm font-medium text-navy-800 hover:border-navy-300"
                  >
                    <ServiceIcon name={s.icon} className="h-4 w-4 text-accent-700" />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shopServices.map((s) => (
              <article
                key={s.slug}
                id={s.slug}
                aria-labelledby={`${s.slug}-title`}
                className="card flex scroll-mt-28 flex-col p-6 sm:p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </span>
                <h2 id={`${s.slug}-title`} className="mt-5 text-2xl font-bold text-navy-950 uppercase">
                  {s.name}
                </h2>
                <p className="mt-2 leading-relaxed text-navy-700">{s.summary}</p>
                <p className="mt-5 text-xs font-semibold tracking-wider text-navy-500 uppercase">
                  Typical work
                </p>
                <ul className="mt-2 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-navy-800">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 flex items-start gap-2 text-sm text-navy-600">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
            Don&rsquo;t see your issue listed? Call us at{" "}
            <a href={BUSINESS.phone.href} className="font-semibold text-navy-900 underline underline-offset-2">
              {BUSINESS.phone.display}
            </a>{" "}
            — we&rsquo;ll tell you honestly whether it&rsquo;s something we can help with.
          </p>
        </div>
      </section>

      {/* Mobile service callout */}
      <section id={mobile.slug} className="scroll-mt-20 pb-16 sm:pb-24" aria-labelledby="mobile-title">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl bg-navy-900 shadow-xl ring-1 ring-accent-500/30 lg:grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-full">
              <Image
                src="/images/mobile-service.jpg"
                alt="Bobby's Garage mobile mechanic working on a customer's car on location"
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-accent-500 px-3 py-1.5 text-sm font-bold text-navy-950 shadow">
                <ServiceIcon name="mobile" className="h-4 w-4" /> We come to you
              </span>
            </div>
            <div className="p-7 sm:p-10">
              <p className="eyebrow text-accent-400">Mobile service</p>
              <h2 id="mobile-title" className="mt-2 text-3xl font-bold text-white uppercase sm:text-4xl">
                Repairs at your home or work
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-navy-100">{mobile.summary}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {mobile.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-white">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex items-start gap-3 rounded-2xl bg-accent-500/15 p-4 text-accent-300 ring-1 ring-accent-500/30">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm leading-relaxed text-white">
                  <strong className="text-accent-300">Call to confirm availability for your area.</strong>{" "}
                  Mobile service depends on the job and location — we&rsquo;ll let you know honestly
                  whether it&rsquo;s a better fit for the shop.
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CallButton />
                <RequestLink className="btn-outline-light" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Get an honest second opinion" text="Told you need an expensive repair? Call Bobby. We'll take a careful look and tell you exactly what we find." />
    </>
  );
}
