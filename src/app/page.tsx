import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  SearchCheckIcon,
  ShieldCheckIcon,
  TruckIcon,
  UsersIcon,
} from "@/components/icons";
import { HoursTable, OpenStatusBadge } from "@/components/OpenStatus";
import { ServiceIcon } from "@/components/ServiceIcon";
import {
  CallButton,
  CtaBand,
  DirectionsLink,
  GoogleRatingBadge,
  GoogleReviewsLink,
  MapEmbed,
  RequestLink,
  ReviewCard,
  SectionHeading,
} from "@/components/ui";
import { ADDRESS_LINE_1, ADDRESS_LINE_2, BUSINESS, REVIEWS } from "@/lib/business";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const WHY_US = [
  {
    icon: SearchCheckIcon,
    title: "Honest diagnosis",
    text: "We find the real problem first and explain it in plain language — so you understand what's wrong before you spend a dime.",
  },
  {
    icon: ShieldCheckIcon,
    title: "No upsell",
    text: "If you don't need it, we won't sell it. Repairs are recommended with best value in mind.",
  },
  {
    icon: UsersIcon,
    title: "Family-owned",
    text: "A father-and-son shop. When you call, you're talking to the people who will actually work on your vehicle.",
  },
  {
    icon: TruckIcon,
    title: "Mobile service",
    text: "Can't get to the shop? For many jobs we can come to you. Call to confirm availability for your area.",
  },
];

export default function HomePage() {
  const homeReviews = REVIEWS.filter((r) => r.id !== "exact-truth");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-950" aria-labelledby="hero-title">
        <Image
          src="/images/hero.jpg"
          alt="Mechanic working on a car in the service bay at Bobby's Garage in Rockwall, Texas"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/55 md:bg-gradient-to-r md:from-navy-950/95 md:via-navy-950/75 md:to-navy-950/30"
          aria-hidden="true"
        />
        <div className="container-page flex min-h-[min(calc(100svh-4.5rem),46rem)] flex-col justify-end pt-24 pb-12 sm:min-h-0 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <OpenStatusBadge tone="dark" />
            <h1
              id="hero-title"
              className="mt-5 text-[2.75rem] leading-[0.95] font-bold text-white uppercase sm:text-6xl lg:text-7xl"
            >
              Honest auto repair in <span className="text-accent-400">Rockwall</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-100 sm:text-xl">
              {BUSINESS.tagline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton className="btn-primary text-lg" />
              <RequestLink className="btn-outline-light text-lg" />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <GoogleRatingBadge tone="dark" />
              <p className="flex items-center gap-2 text-sm text-navy-100">
                <MapPinIcon className="h-4 w-4 text-accent-400" />
                {ADDRESS_LINE_1}, Rockwall
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 sm:py-20" aria-labelledby="home-reviews">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="home-reviews"
              eyebrow="What neighbors say"
              title="Straight answers. Real reviews."
            />
            <GoogleRatingBadge />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {homeReviews.map((r) => (
              <ReviewCard key={r.id} quote={r.quote} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 font-semibold text-navy-900 hover:text-accent-700"
            >
              More reviews <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <GoogleReviewsLink />
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="border-y border-navy-900/5 bg-white py-16 sm:py-20" aria-labelledby="home-services">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="home-services"
              eyebrow="Services"
              title="Repairs done right, the first time"
              intro="From brakes and AC to check-engine lights, we diagnose carefully and fix what actually needs fixing."
            />
            <Link href="/services" className="btn-outline shrink-0">
              All services <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className={`group flex h-full flex-col rounded-2xl border p-4 transition sm:p-5 ${
                    s.slug === "mobile-service"
                      ? "border-accent-500/40 bg-accent-500/10 hover:border-accent-500"
                      : "border-navy-100 bg-cream hover:border-navy-300 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="mt-4 font-display text-lg leading-tight font-bold text-navy-950 uppercase sm:text-xl">
                    {s.name}
                  </span>
                  <span className="mt-1 hidden text-sm leading-snug text-navy-600 sm:block">
                    {s.summary}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href={BUSINESS.phone.href}
                className="flex h-full flex-col justify-between rounded-2xl bg-navy-900 p-4 text-white transition hover:bg-navy-800 sm:p-5"
              >
                <span className="font-display text-lg leading-tight font-bold uppercase sm:text-xl">
                  Not sure what you need?
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-400">
                  <PhoneIcon className="h-4 w-4" /> Just give us a call
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 sm:py-20" aria-labelledby="home-why">
        <div className="container-page">
          <SectionHeading
            id="home-why"
            eyebrow="Why Bobby's"
            title="The mechanic you can actually trust"
            intro="Reviewers keep coming back to the same things: honesty, careful diagnosis, and a family business that treats customers right."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-navy-950 uppercase">{title}</h3>
                <p className="mt-2 leading-relaxed text-navy-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours + map */}
      <section className="bg-cream-dark/60 py-16 sm:py-20" aria-labelledby="home-visit">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,26rem)_1fr]">
          <div className="card flex flex-col p-6 sm:p-8">
            <p className="eyebrow text-accent-700">Visit the shop</p>
            <h2 id="home-visit" className="mt-2 text-3xl font-bold text-navy-950 uppercase">
              Hours &amp; location
            </h2>
            <div className="mt-4">
              <OpenStatusBadge />
            </div>
            <div className="mt-5 flex items-start gap-2 text-sm font-medium text-navy-600">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0" /> Central Time
            </div>
            <HoursTable className="mt-2" />
            <address className="mt-6 flex items-start gap-3 not-italic">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" />
              <span className="text-navy-900">
                <span className="font-semibold">{BUSINESS.name}</span>
                <br />
                {ADDRESS_LINE_1}
                <br />
                {ADDRESS_LINE_2}
              </span>
            </address>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <CallButton className="btn-primary" label="Call the shop" />
              <DirectionsLink />
            </div>
          </div>
          <MapEmbed className="min-h-80 lg:min-h-full" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
