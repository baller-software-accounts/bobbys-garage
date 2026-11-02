import type { Metadata } from "next";
import {
  CtaBand,
  GoogleRatingBadge,
  GoogleReviewsLink,
  PageHeader,
  ReviewCard,
  Stars,
} from "@/components/ui";
import { BUSINESS, REVIEWS } from "@/lib/business";

const DESCRIPTION = `Bobby's Garage is rated ${BUSINESS.rating.value}★ on Google from ${BUSINESS.rating.count}+ reviews. See why Rockwall drivers call Bobby the most honest mechanic around.`;

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: DESCRIPTION,
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Reviews | Bobby's Garage",
    description: DESCRIPTION,
    url: "/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="Rockwall's honest mechanic — in our customers' words"
        intro="Real words from real customers — quoted directly from reviews left for us on Google."
      />

      <section className="py-14 sm:py-20" aria-labelledby="rating-title">
        <div className="container-page">
          <div className="card flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 id="rating-title" className="sr-only">
                Overall rating
              </h2>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:gap-5">
                <span className="font-display text-7xl leading-none font-bold text-navy-950">
                  {BUSINESS.rating.value}
                </span>
                <div className="pb-1">
                  <Stars className="h-7 w-7" />
                  <p className="mt-1 font-medium text-navy-700">
                    Average rating on Google · {BUSINESS.rating.count}+ reviews
                  </p>
                </div>
              </div>
            </div>
            <GoogleRatingBadge />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.id} quote={r.quote} size="lg" />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <GoogleReviewsLink className="text-lg" />
            <p className="text-sm text-navy-600">
              Been in? We&rsquo;d be grateful if you shared your experience on Google.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="See what the fuss is about" />
    </>
  );
}
