"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BUSINESS, NAV_LINKS } from "@/lib/business";
import { MenuIcon, PhoneIcon, XIcon } from "./icons";
import { isActive } from "./NavLinks";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-100 bg-white text-navy-900 hover:bg-navy-50"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 bg-navy-950/40 backdrop-blur-[2px]"
            onClick={close}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id="mobile-menu"
            className="fixed inset-x-0 top-[4.5rem] z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-navy-100 bg-white px-5 pt-3 pb-6 shadow-xl"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-12 items-center justify-between rounded-xl px-3 font-display text-xl font-semibold tracking-wide uppercase ${
                          active
                            ? "bg-navy-50 text-navy-950"
                            : "text-navy-800 hover:bg-navy-50"
                        }`}
                      >
                        {link.label}
                        {active ? (
                          <span className="h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-4 grid gap-3">
              <a href={BUSINESS.phone.href} className="btn-primary w-full">
                <PhoneIcon className="h-5 w-5" />
                Call {BUSINESS.phone.display}
              </a>
              <Link href="/contact#request" onClick={close} className="btn-outline w-full">
                Request service
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
