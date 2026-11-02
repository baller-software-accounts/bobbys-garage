"use client";

import { useSyncExternalStore } from "react";
import {
  HOURS,
  HOURS_WEEK_ORDER,
  TIME_ZONE,
  formatDayHours,
  formatMinutes,
} from "@/lib/business";

/*
 * Open/closed status computed in the browser for America/Chicago.
 * useSyncExternalStore renders the server snapshot (null → neutral UI) during
 * SSR *and* hydration, then re-renders with the real client value, so there is
 * never a hydration mismatch and nothing time-dependent runs during prerender.
 */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let formatter: Intl.DateTimeFormat | null = null;

/** "day:minutes" in shop-local time; a primitive so snapshots compare stably. */
function getSnapshot(): string {
  formatter ??= new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = formatter.formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = WEEKDAYS.indexOf(get("weekday"));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return `${day}:${minutes}`;
}

const getServerSnapshot = () => null;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
}

function useShopClock(): { day: number; minutes: number } | null {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!snap) return null;
  const [day, minutes] = snap.split(":").map(Number);
  return day >= 0 ? { day, minutes } : null;
}

type Status = { open: boolean; closingSoon: boolean; detail: string };

function computeStatus(day: number, minutes: number): Status {
  const today = HOURS[day];
  if (today.open !== null && today.close !== null) {
    if (minutes >= today.open && minutes < today.close) {
      return {
        open: true,
        closingSoon: today.close - minutes <= 60,
        detail: `Closes at ${formatMinutes(today.close)}`,
      };
    }
    if (minutes < today.open) {
      return {
        open: false,
        closingSoon: false,
        detail: `Opens today at ${formatMinutes(today.open)}`,
      };
    }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const next = HOURS[(day + offset) % 7];
    if (next.open !== null) {
      const when = offset === 1 ? "tomorrow" : next.name;
      return {
        open: false,
        closingSoon: false,
        detail: `Opens ${when} at ${formatMinutes(next.open)}`,
      };
    }
  }
  return { open: false, closingSoon: false, detail: "" };
}

/** Pill showing "Open now · Closes at 5:30 PM" (client) or a neutral hours hint (server). */
export function OpenStatusBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const clock = useShopClock();
  const base =
    "inline-flex min-h-8 items-center gap-2 rounded-full px-3 py-1 text-sm font-medium";
  const neutral =
    tone === "dark"
      ? "bg-white/10 text-white/85 ring-1 ring-white/15"
      : "bg-navy-50 text-navy-700 ring-1 ring-navy-100";

  if (!clock) {
    return (
      <span className={`${base} ${neutral}`}>
        <span className="h-2 w-2 rounded-full bg-navy-300" aria-hidden="true" />
        Open Tue–Sat from 8:30 AM
      </span>
    );
  }

  const s = computeStatus(clock.day, clock.minutes);
  const styles = s.open
    ? tone === "dark"
      ? "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/30"
      : "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
    : tone === "dark"
      ? "bg-white/10 text-white/90 ring-1 ring-white/15"
      : "bg-red-50 text-red-800 ring-1 ring-red-200";
  const dot = s.open
    ? s.closingSoon
      ? "bg-accent-500"
      : "bg-emerald-500"
    : "bg-brand-red";

  return (
    <span className={`${base} ${styles}`} role="status">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {s.open ? (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`} />
        ) : null}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      <span>
        <strong className="font-semibold">
          {s.open ? (s.closingSoon ? "Closing soon" : "Open now") : "Closed now"}
        </strong>
        {s.detail ? <span className="opacity-80"> · {s.detail}</span> : null}
      </span>
    </span>
  );
}

/** Full weekly hours table; today's row is highlighted once on the client. */
export function HoursTable({ className = "" }: { className?: string }) {
  const clock = useShopClock();
  return (
    <table className={`w-full text-left text-[0.95rem] ${className}`}>
      <caption className="sr-only">Shop hours (Central Time)</caption>
      <tbody>
        {HOURS_WEEK_ORDER.map((d) => {
          const isToday = clock?.day === d.index;
          const closed = d.open === null;
          return (
            <tr
              key={d.index}
              aria-current={isToday ? "date" : undefined}
              className={`border-b border-navy-100 last:border-0 ${
                isToday ? "bg-accent-500/10" : ""
              }`}
            >
              <th
                scope="row"
                className={`py-2.5 pr-4 pl-3 font-medium ${
                  isToday ? "text-navy-950" : "text-navy-700"
                }`}
              >
                {d.name}
                {isToday ? (
                  <span className="ml-2 rounded-full bg-accent-500 px-2 py-0.5 text-[0.7rem] font-bold tracking-wide text-navy-950 uppercase">
                    Today
                  </span>
                ) : null}
              </th>
              <td
                className={`py-2.5 pr-3 text-right tabular-nums ${
                  closed ? "text-navy-400" : "font-medium text-navy-900"
                }`}
              >
                {formatDayHours(d)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
