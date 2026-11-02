import type { Metadata } from "next";
import Image from "next/image";
import {
  HandshakeIcon,
  MessageIcon,
  PiggyBankIcon,
  SearchCheckIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@/components/icons";
import { CtaBand, GoogleRatingBadge, PageHeader, ReviewCard, SectionHeading } from "@/components/ui";
import { REVIEWS } from "@/lib/business";

const DESCRIPTION =
  "Meet Bobby & Christian — the father-and-son team behind Bobby's Garage, Rockwall's honest, family-owned auto repair and mobile service shop.";

export const metadata: Metadata = {
  title: "About Us",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Bobby's Garage",
    description: DESCRIPTION,
    url: "/about",
    images: [{ url: "/images/shop-bay.jpg", alt: "Service bay at Bobby's Garage" }],
  },
};

const VALUES = [
  {
    icon: ShieldCheckIcon,
    title: "Tell the truth",
    text: "You get a straight answer about what's wrong — even when the answer is \"it's a small fix.\"",
  },
  {
    icon: SearchCheckIcon,
    title: "Diagnose carefully",
    text: "We take the time to find the actual cause instead of guessing with your money.",
  },
  {
    icon: MessageIcon,
    title: "Explain everything",
    text: "We walk you through what we found and why a repair matters, in plain language.",
  },
  {
    icon: PiggyBankIcon,
    title: "Best value first",
    text: "Recommendations are made with your budget in mind. If it can wait, we'll say so.",
  },
  {
    icon: HandshakeIcon,
    title: "No upsell",
    text: "We won't sell you work you don't need. Period.",
  },
  {
    icon: UsersIcon,
    title: "Family-owned",
    text: "A father-and-son shop where you deal directly with the people doing the work.",
  },
];

export default function AboutPage() {
  const alignment = REVIEWS.find((r) => r.id === "alignment")!;
  const family = REVIEWS.find((r) => r.id === "exact-truth")!;

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A father-and-son shop built on honesty"
        intro="Bobby's Garage is an independent, family-owned auto repair and mobile service shop in Rockwall, run by Bobby and his son Christian."
      />

      <section className="py-16 sm:py-20" aria-labelledby="story-title">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-navy-900/10">
              <Image
                src="/images/shop-bay.jpg"
                alt="Inside the Bobby's Garage service bay with a vehicle on the lift"
                fill
                preload
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 sm:left-6">
              <GoogleRatingBadge />
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <SectionHeading eyebrow="Our story" id="story-title" title="Bobby & Christian" />
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-navy-800">
              <p>
                Bobby&rsquo;s Garage is a simple idea: treat every customer the way you&rsquo;d want
                your own family treated. Bobby and his son Christian work side by side, and when you
                bring your vehicle in, you&rsquo;re dealing directly with them.
              </p>
              <p>
                Ask our customers and you&rsquo;ll hear the same things again and again — they
                tell you the truth, they diagnose carefully, and they explain necessary repairs with
                best value in mind. No pressure, no padded estimates, and no selling you something
                you don&rsquo;t need.
              </p>
              <p>
                One customer came in expecting a front-end alignment they&rsquo;d been told they
                needed. It turned out to be a very easy fix — and Bobby didn&rsquo;t even charge for
                it. That&rsquo;s the kind of shop we are.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-label="In our customers' words">
        <div className="container-page grid gap-5 md:grid-cols-2">
          <ReviewCard quote={alignment.quote} size="lg" />
          <ReviewCard quote={family.quote} size="lg" />
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="values-title">
        <div className="container-page">
          <SectionHeading
            id="values-title"
            eyebrow="What we stand for"
            title="How we do business"
            align="center"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-navy-950 uppercase">{title}</h3>
                <p className="mt-2 leading-relaxed text-navy-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Come meet the family" />
    </>
  );
}
