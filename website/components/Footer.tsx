import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/sortirose-logo.png"
            alt="SortiRose"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="text-sm font-semibold text-accent">SortiRose</span>
        </div>

        <p className="text-xs text-muted">
          Données publiques fournies par{" "}
          <a
            href="https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Toulouse Métropole
          </a>
        </p>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} SortiRose — Projet indépendant
        </p>
      </div>
    </footer>
  );
}
