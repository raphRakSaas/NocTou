import Image from "next/image";

const features = [
  {
    image: "/images/feature-agenda.png",
    title: "Un agenda toujours à jour",
    description:
      "Toutes les sorties culturelles de Toulouse, mises à jour chaque jour, classées par date et par catégorie.",
  },
  {
    image: "/images/feature-map.png",
    title: "La carte de vos sorties",
    description:
      "Visualisez les événements autour de vous et triez par proximité en un geste.",
  },
  {
    image: "/images/feature-favorites.png",
    title: "Vos favoris, toujours à portée",
    description:
      "Enregistrez les sorties qui vous plaisent et retrouvez-les hors ligne, directement sur votre téléphone.",
  },
];

export function Features() {
  return (
    <section id="fonctionnalites" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Simple. Rapide. Efficace.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Pas de fioritures, juste ce qu&apos;il faut pour trouver votre prochaine
            sortie en quelques secondes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[28px] border border-border bg-surface p-6"
            >
              <div className="overflow-hidden rounded-2xl bg-accent-soft">
                <Image
                  src={feature.image}
                  alt=""
                  width={1024}
                  height={683}
                  className="h-44 w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
