const roadmapItems = [
  {
    title: "Publication sur les stores",
    description: "Google Play et App Store, pour une installation en un clic.",
  },
  {
    title: "Mesure anonyme et transparente",
    description:
      "Un outil comme PostHog, en mode anonyme, pour comprendre l'usage et améliorer l'appli — jamais pour revendre vos données.",
  },
  {
    title: "Toujours plus de sorties",
    description: "De nouvelles sources de données pour couvrir toute la métropole.",
  },
];

export function RoadmapSection() {
  return (
    <section id="feuille-de-route" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[32px] border border-border bg-surface px-8 py-12 sm:px-12">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Et la suite ?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              SortiRose évolue petit à petit, toujours dans la même direction :
              rester simple, gratuite et honnête.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {roadmapItems.map((item, index) => (
              <div key={item.title}>
                <span className="text-sm font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
