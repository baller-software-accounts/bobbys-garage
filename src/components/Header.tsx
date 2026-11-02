import { BUSINESS } from "@/lib/business";
import { PhoneIcon } from "./icons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { DesktopNav } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/8 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <DesktopNav />
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={BUSINESS.phone.href}
            className="btn-primary hidden min-h-11 px-4 py-2 sm:inline-flex"
          >
            <PhoneIcon className="h-5 w-5" />
            <span>{BUSINESS.phone.display}</span>
          </a>
          <a
            href={BUSINESS.phone.href}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500 text-navy-950 hover:bg-accent-400 sm:hidden"
          >
            <PhoneIcon className="h-5 w-5" />
            <span className="sr-only">Call {BUSINESS.phone.display}</span>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
