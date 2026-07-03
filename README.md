# NocTou

Application mobile Expo pour centraliser l'agenda culturel et evenementiel de Toulouse.

## Stack

- Expo Managed Workflow
- Expo Router
- TypeScript
- NativeWind
- TanStack Query
- AsyncStorage
- Expo Location

## Lancer le projet

```bash
npm install
npm run start
```

## Variables d'environnement

- `OPEN_AGENDA_API_KEY` : cle publique de lecture OpenAgenda utilisee pour enrichir les evenements avec des images quand elles existent.

## Scripts utiles

```bash
npm run typecheck
npm run lint
npm run web
```

## Structure

- `app/` : ecrans Expo Router
- `api/` : appels Open Data Toulouse Metropole
- `components/` : composants UI reutilisables
- `hooks/` : hooks de donnees et de filtres
- `providers/` : providers globaux
- `storage/` : persistance locale
- `types/` : modeles TypeScript
- `utils/` : formatage et calculs

## Source des donnees

NocTou utilise l'Open Data de Toulouse Metropole :

[Agenda des manifestations culturelles - So Toulouse](https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/)
