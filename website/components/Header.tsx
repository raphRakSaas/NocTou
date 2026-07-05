import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#histoire", label: "Histoire" },
  { href: "#feuille-de-route", label: "Feuille de route" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#" className="flex items-center gap-2.5">
          <Image
            src="/images/sortirose-logo.png"
            alt="SortiRose"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="text-lg font-semibold text-accent">SortiRose</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#telecharger"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03]"
        >
          Télécharger
        </a>
      </div>
    </header>
  );
}
