import { BUSINESS, HOURS, SITE_URL, schemaTime } from "./business";

/** schema.org AutoRepair (LocalBusiness subtype) for the root layout. */
export function autoRepairJsonLd() {
  const openDays = HOURS.filter((d) => d.open !== null && d.close !== null);
  // Group days that share identical hours into one specification each.
  const groups = new Map<string, string[]>();
  for (const d of openDays) {
    const key = `${d.open}-${d.close}`;
    groups.set(key, [...(groups.get(key) ?? []), d.name]);
  }

  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.phone.schema,
    image: `${SITE_URL}/images/hero.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: {
      "@type": "City",
      name: "Rockwall",
      containedInPlace: { "@type": "State", name: "Texas" },
    },
    openingHoursSpecification: [...groups.entries()].map(([key, days]) => {
      const [open, close] = key.split("-").map(Number);
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days.map((d) => `https://schema.org/${d}`),
        opens: schemaTime(open),
        closes: schemaTime(close),
      };
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating.value,
      bestRating: 5,
      reviewCount: BUSINESS.rating.count,
    },
  };
}
