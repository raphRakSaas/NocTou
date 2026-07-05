# SortiRose

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
npm run start:dev
```

## Builds Android

Il y a 2 types de builds Android utiles pour ce projet :

- `development` : build de dev pour continuer a coder et tester avec `npm run start:dev`.
- `preview` : vrai APK autonome a partager et installer sans lancer le serveur de dev.

1. Installer et connecter EAS CLI :

```bash
npm install --global eas-cli
eas login
```

2. Premiere configuration du projet EAS si necessaire :

```bash
eas init
```

3. Lancer une build Android de developpement :

```bash
npm exec --yes eas-cli -- build --platform android --profile development
```

Commande alternative si `eas` est bien disponible globalement :

```bash
eas build --platform android --profile development
```

4. Installer l'APK sur votre telephone depuis le lien fourni par EAS.

5. Ensuite, pour travailler avec votre app installee :

```bash
npm run start:dev
```

L'application installee remplacera Expo Go pour ce projet et pourra ouvrir directement votre bundler local.

### APK partageable sans serveur de dev

Pour generer un APK autonome que tu peux partager et installer directement :

```bash
npm exec --yes eas-cli -- build --platform android --profile preview
```

Commande alternative si `eas` est disponible globalement :

```bash
eas build --platform android --profile preview
```

Une fois la build terminee sur Expo :

1. telecharge le fichier `.apk`
2. envoie-le par AirDrop, Drive, WhatsApp, Telegram ou mail
3. ouvre le `.apk` sur le telephone Android pour l installer

Cette build `preview` fonctionne seule et ne demande pas `npm run start:dev`.

### Commandes a refaire la prochaine fois

Pour relancer une nouvelle build Android plus tard, utilise simplement :

```bash
npm exec --yes eas-cli -- build --platform android --profile development
```

Puis, une fois l'application installee sur le telephone :

```bash
npm run start:dev
```

Pour refaire un APK partageable autonome :

```bash
npm exec --yes eas-cli -- build --platform android --profile preview
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

SortiRose utilise l'Open Data de Toulouse Metropole :

[Agenda des manifestations culturelles - So Toulouse](https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/)
