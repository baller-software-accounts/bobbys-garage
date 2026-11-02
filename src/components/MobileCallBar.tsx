import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { PhoneIcon } from "./icons";

/** Sticky bottom tap-to-call bar, mobile only. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950/95 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2.5">
        <a
          href={BUSINESS.phone.href}
          className="btn-primary flex-[2] px-3 whitespace-nowrap"
        >
          <PhoneIcon className="h-5 w-5" />
          Call {BUSINESS.phone.display}
        </a>
        <Link href="/contact#request" className="btn-outline-light flex-1 px-3 whitespace-nowrap">
          Request
        </Link>
      </div>
    </div>
  );
}
