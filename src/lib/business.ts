/**
 * Canonical business data for Bobby's Garage.
 * Every page, component, and the JSON-LD schema reads from here —
 * update facts in this one file only.
 */

// Current public preview on Vercel. TODO: switch to the real custom domain once one exists.
export const SITE_URL = "https://bobbys-garage.vercel.app";

export const BUSINESS = {
  name: "Bobby's Garage",
  alternateName: "Bobby's Garage & Mobile Service",
  tagline: "Rockwall's honest mechanic — 5.0★, family-owned, no upsell.",
  description:
    "Independent, family-owned auto repair and mobile mechanic service in Rockwall, TX. Honest diagnosis, clear explanations, and no upsell.",
  owners: "Bobby & Christian",
  phone: {
    display: "(214) 998-3521",
    href: "tel:+12149983521",
    schema: "+1-214-998-3521",
  },
  address: {
    street: "1785 I-30 Ste D",
    city: "Rockwall",
    region: "TX",
    postalCode: "75087",
    country: "US",
  },
  outdatedAddress: "901 Davy Crockett",
  rating: {
    value: "5.0",
    count: 26,
    label: "5.0★ on Google · 26+ reviews",
  },
  links: {
    mapEmbed:
      "https://www.google.com/maps?q=1785+I-30+Ste+D,+Rockwall,+TX+75087&output=embed",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=1785+I-30+Ste+D+Rockwall+TX+75087",
    googleReviews:
      "https://www.google.com/maps/search/?api=1&query=Bobby%27s+Garage+1785+I-30+Rockwall+TX",
  },
} as const;

export const ADDRESS_LINE_1 = BUSINESS.address.street;
export const ADDRESS_LINE_2 = `${BUSINESS.address.city}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;
export const FULL_ADDRESS = `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}`;
export const TIME_ZONE = "America/Chicago";

export type DayHours = {
  /** 0 = Sunday … 6 = Saturday (matches Date#getDay) */
  index: number;
  name: string;
  short: string;
  /** Opening/closing time in minutes after midnight, or null when closed. */
  open: number | null;
  close: number | null;
};

const H = (h: number, m = 0) => h * 60 + m;

export const HOURS: DayHours[] = [
  { index: 0, name: "Sunday", short: "Sun", open: null, close: null },
  { index: 1, name: "Monday", short: "Mon", open: null, close: null },
  { index: 2, name: "Tuesday", short: "Tue", open: H(8, 30), close: H(17, 30) },
  { index: 3, name: "Wednesday", short: "Wed", open: H(8, 30), close: H(17, 30) },
  { index: 4, name: "Thursday", short: "Thu", open: H(8, 30), close: H(17, 30) },
  { index: 5, name: "Friday", short: "Fri", open: H(8, 30), close: H(17, 30) },
  { index: 6, name: "Saturday", short: "Sat", open: H(8, 30), close: H(17) },
];

/** Hours listed Monday-first for display tables. */
export const HOURS_WEEK_ORDER: DayHours[] = [1, 2, 3, 4, 5, 6, 0].map(
  (i) => HOURS[i],
);

/** Compact grouped summary for footers and cards. */
export const HOURS_SUMMARY = [
  { days: "Tue–Fri", hours: "8:30 AM – 5:30 PM" },
  { days: "Sat", hours: "8:30 AM – 5:00 PM" },
  { days: "Sun & Mon", hours: "Closed" },
] as const;

/** Days a customer can request service (shop open days). */
export const SERVICE_DAYS = HOURS_WEEK_ORDER.filter((d) => d.open !== null).map(
  (d) => d.name,
);

export function formatMinutes(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export function formatDayHours(d: DayHours): string {
  return d.open === null || d.close === null
    ? "Closed"
    : `${formatMinutes(d.open)} – ${formatMinutes(d.close)}`;
}

/** "HH:MM" 24h for schema.org openingHoursSpecification. */
export function schemaTime(mins: number): string {
  const h = Math.floor(mins / 60).toString().padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** The only review quotes allowed on the site (verbatim from Google). */
export const REVIEWS = [
  {
    id: "best-most-honest",
    quote:
      "Bobby is by far the very best and most honest mechanic in the Rockwall area.",
  },
  {
    id: "alignment",
    quote:
      "Turned out it wasn't a front end alignment as I had been told. It was a very easy fix and he didn't even charge me!",
  },
  {
    id: "careful-diagnosis",
    quote:
      "He is very careful to diagnose and explain necessary repairs with best value in mind.",
  },
  {
    id: "exact-truth",
    quote: "Tells you EXACTLY the truth!! … Great family owned business!",
  },
] as const;

export const REVIEW_ATTRIBUTION = "Verified Google reviewer";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;
