# SortiRose — Site vitrine

Site vitrine Next.js (App Router + Tailwind CSS v4) pour presenter l'application
mobile SortiRose : agenda culturel de Toulouse, gratuit et sans publicite.

Ce dossier fait partie du monorepo principal `NocTou`, aux cotes de l'application
mobile Expo situee a la racine du depot.

## Lancer le site en local

```bash
cd website
npm install
npm run dev
```

Le site est disponible sur `http://localhost:3000`.

## Structure

- `app/` : page unique (App Router), layout, metadonnees SEO
- `components/` : sections de la page (Header, Hero, Features, Story, Roadmap, Footer)
- `public/images/` : logo SortiRose et illustrations generees pour le site

## Contenu editorial

- **Hero** : accroche, badge "100% gratuit", boutons App Store / Google Play
  (marques "Bientot disponible" tant que l'app n'est pas publiee sur les stores)
- **Fonctionnalites** : agenda, carte, favoris
- **Histoire** : presentation du projet comme initiative personnelle et gratuite,
  base sur l'Open Data de Toulouse Metropole
- **Feuille de route** : publication sur les stores, mesure anonyme (PostHog) a venir

## Deploiement

Voir la section "Deploiement Vercel (monorepo)" dans le `README.md` a la racine
du depot pour connecter ce site et l'application web Expo a Vercel depuis le
meme repo GitHub.
