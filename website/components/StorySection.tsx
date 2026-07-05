import Image from "next/image";

const promises = [
  "Gratuite, aujourd'hui et demain",
  "Sans publicité, sans abonnement",
  "Aucune donnée revendue",
];

export function StorySection() {
  return (
    <section id="histoire" className="scroll-mt-24 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md md:order-2">
          <div className="absolute inset-0 -z-10 scale-90 rounded-[40px] bg-accent-soft blur-2xl" />
          <Image
            src="/images/story-developer.png"
            alt="Un développeur indépendant travaillant sur SortiRose le soir"
            width={1024}
            height={683}
            className="w-full rounded-[32px]"
          />
        </div>

        <div className="md:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-deep">
            Notre histoire
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Un projet perso, fait avec passion.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-muted">
            SortiRose est né un soir, de l&apos;envie d&apos;un développeur
            indépendant de créer quelque chose d&apos;utile pour sa ville. Pas de
            business plan, pas d&apos;investisseurs : juste l&apos;envie de bien
            faire les choses, et de prouver qu&apos;on peut construire une belle
            application avec des outils gratuits et des données ouvertes.
          </p>

          <p className="mt-4 text-base leading-relaxed text-muted">
            Toutes les sorties affichées proviennent de l&apos;
            <a
              href="https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-deep underline underline-offset-4"
            >
              Open Data de Toulouse Métropole
            </a>
            . Aucun serveur payant, aucune régie publicitaire : juste une appli qui
            fait bien son travail.
          </p>

          <ul className="mt-8 space-y-3">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-3 text-sm font-medium text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  ✓
                </span>
                {promise}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
