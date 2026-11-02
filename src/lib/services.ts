export type ServiceIconName =
  | "brakes"
  | "suspension"
  | "ac"
  | "engine"
  | "electrical"
  | "maintenance"
  | "mobile";

export type Service = {
  slug: string;
  name: string;
  icon: ServiceIconName;
  summary: string;
  items: string[];
};

/** Generic descriptions of typical work — no prices or guarantees. */
export const SERVICES: Service[] = [
  {
    slug: "brakes",
    name: "Brakes",
    icon: "brakes",
    summary:
      "Squealing, grinding, or a soft pedal? We inspect the whole system and tell you what actually needs attention.",
    items: [
      "Brake pad and shoe replacement",
      "Rotor and drum service",
      "Brake fluid service",
      "Caliper and brake line repair",
      "ABS warning light diagnosis",
    ],
  },
  {
    slug: "suspension-steering",
    name: "Suspension & Steering",
    icon: "suspension",
    summary:
      "Pulling, clunking, or a rough ride — we find the real cause before anything gets replaced.",
    items: [
      "Shocks and struts",
      "Ball joints and tie rod ends",
      "Control arms and bushings",
      "Power steering diagnosis and repair",
      "Front-end noise and vibration checks",
    ],
  },
  {
    slug: "ac-cooling",
    name: "AC & Cooling",
    icon: "ac",
    summary:
      "Texas heat is hard on vehicles. We keep your AC blowing cold and your engine running at the right temperature.",
    items: [
      "AC performance check and recharge",
      "AC leak and component diagnosis",
      "Radiator, hose, and water pump repair",
      "Thermostat replacement",
      "Overheating diagnosis",
    ],
  },
  {
    slug: "engine-drivetrain",
    name: "Engine & Drivetrain",
    icon: "engine",
    summary:
      "From rough idles to strange noises, we track down engine and drivetrain problems methodically.",
    items: [
      "Check-engine light diagnosis",
      "Belts, hoses, and gaskets",
      "Ignition and tune-up work",
      "Oil and fluid leak repair",
      "CV axles and driveline components",
    ],
  },
  {
    slug: "electrical-diagnostics",
    name: "Electrical & Diagnostics",
    icon: "electrical",
    summary:
      "Careful, step-by-step diagnosis so you pay to fix the problem — not to guess at it.",
    items: [
      "Computer scan and warning-light diagnosis",
      "Battery, starter, and alternator testing",
      "Wiring and fuse troubleshooting",
      "Lighting and accessory repair",
      "No-start diagnosis",
    ],
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    icon: "maintenance",
    summary:
      "Routine care that keeps small issues from becoming big ones — with honest advice on what can wait.",
    items: [
      "Oil and filter changes",
      "Fluid checks and services",
      "Filter replacement (air & cabin)",
      "Tire rotation and inspection",
      "Pre-trip and seasonal inspections",
    ],
  },
  {
    slug: "mobile-service",
    name: "Mobile Service",
    icon: "mobile",
    summary:
      "Can't make it to the shop? For many jobs, we can come to you at home or work around Rockwall.",
    items: [
      "On-site diagnosis",
      "Battery and starting issues",
      "Many routine maintenance jobs",
      "Select brake and repair work",
    ],
  },
];
