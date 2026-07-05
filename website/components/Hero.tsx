import Image from "next/image";

import { DownloadButtons } from "@/components/DownloadButtons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-deep">
            100% gratuit · Toulouse
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Toutes les sorties de Toulouse.
            <br />
            <span className="text-accent">Un seul endroit.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Concerts, expos, festivals, théâtre... SortiRose rassemble l&apos;agenda
            culturel toulousain en une appli simple, rapide et sans surprise.
          </p>

          <div id="telecharger" className="mt-8 scroll-mt-24">
            <DownloadButtons />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-0 -z-10 scale-90 rounded-[40px] bg-accent-soft blur-2xl" />
          <Image
            src="/images/hero-toulouse.png"
            alt="Illustration de Toulouse avec le repère SortiRose"
            width={1024}
            height={683}
            className="w-full rounded-[32px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
