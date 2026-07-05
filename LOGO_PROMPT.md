# NocTou — Prompt logo / icône d'application

> Fichier à copier-coller dans une IA de génération d'images pour créer le logo de NocTou.
> Dernière mise à jour : juillet 2026

---

## Quelle IA choisir ?

| Outil | Recommandation | Pourquoi |
|-------|----------------|----------|
| **Ideogram** | ⭐ **1er choix** | Très bon pour les logos plats, la typographie et les icônes d'app. Résultats propres, peu de détails inutiles. [ideogram.ai](https://ideogram.ai) |
| **Recraft** | ⭐ **2e choix** | Spécialisé logos et assets de marque, export vectoriel possible. [recraft.ai](https://recraft.ai) |
| **ChatGPT** (GPT-4o) | ✅ Bon pour itérer | Pratique si tu as déjà ChatGPT Plus. Génère vite des concepts, mais parfois trop illustratif pour une icône mobile. |
| **Gemini** (Imagen) | ✅ Correct | Qualité comparable à ChatGPT. Pas de gain évident pour ce type de logo simple. |
| **Midjourney** | ⚠️ Optionnel | Beau rendu artistique, mais souvent trop détaillé pour une icône 48×48 px. À utiliser pour explorer des directions créatives, pas pour l'export final. |
| **Figma + plugin** | 🔧 Finition | Une fois un concept validé, vectoriser et ajuster dans Figma (plugins : Vectorizer, Magicon). |

### Recommandation finale

1. **Commence sur Ideogram** avec le prompt principal (section 4).
2. **Itère 3–5 variantes** en modifiant le concept (sections 5A, 5B, 5C).
3. **Affine dans ChatGPT** si tu veux ajuster une direction précise.
4. **Vectorise et exporte** les tailles finales dans Figma ou Recraft.

---

## 1. Contexte de l'application

**NocTou** est une application mobile qui centralise l'agenda culturel de **Toulouse** : concerts, expositions, spectacles, festivals, ateliers.

- **Nom** : NocTou = *Noc* (nuit, sorties du soir) + *Tou* (Toulouse)
- **Promesse** : « La culture toulousaine, sans chercher partout »
- **Usage** : trouver une sortie ce soir, ce week-end, près de chez soi
- **Ton** : chaleureux, accessible, moderne — pas élitiste, pas institutionnel
- **Public** : Toulousains, visiteurs, curieux de culture

---

## 2. Direction créative du logo

### Ce que le logo doit évoquer (priorité)

1. **Sortir le soir** — nuit, ville qui s'anime
2. **Culture & événements** — pas un musée froid, plutôt « quoi faire ce soir »
3. **Toulouse / ville** — repère, carte, localisation (sans copier un monument)
4. **Simplicité** — lisible en petit sur l'écran d'un téléphone

### Concepts visuels recommandés (du plus simple au plus expressif)

| Concept | Description | Force |
|---------|-------------|-------|
| **A — Pin + croissant de lune** | Marqueur de carte fusionné avec un croissant. Corail sur fond clair. | Universel, immédiat |
| **B — Monogramme « N »** | Lettre N stylisée avec une courbe de coucher de soleil / nuit. | Mémorable, app-like |
| **C — Étoile + pin** | Point lumineux (événement) sur une forme de localisation. | Évoque « sortie à découvrir » |
| **D — Calendrier minimal + lune** | Case de calendrier arrondie avec croissant intégré. | Lié à l'agenda |

**Direction privilégiée : Concept A ou B** — les plus simples et les plus robustes en petite taille.

---

## 3. Charte couleurs (obligatoire)

| Rôle | Hex | Usage |
|------|-----|-------|
| **Corail principal** | `#FF7A59` | Couleur dominante du logo |
| **Corail profond** | `#E85D3A` | Ombres, dégradés |
| **Corail doux** | `#FFB08F` | Highlights, dégradés |
| **Fond clair** | `#FFFFFF` ou `#EEF2F6` | Fond de l'icône (mode jour) |
| **Fond sombre** | `#171C24` | Variante mode nuit (optionnelle) |
| **Texte / contraste** | `#0F172A` | Si lettres ou détails sombres |

**Interdit** : violet, bleu froid, vert fluo, dégradés arc-en-ciel, noir pur `#000000`.

---

## 4. Prompt principal (copier-coller)

```
Create a minimal mobile app icon logo for "NocTou", a cultural events discovery app for Toulouse, France.

CONCEPT: A simple location map pin merged with a subtle crescent moon curve, suggesting "going out at night in the city". One single iconic symbol, no text, no letters.

STYLE:
- Flat vector logo design, geometric and clean
- Modern iOS/Android app icon aesthetic (like Airbnb, Citymapper, or Spotify simplicity)
- Rounded, friendly shapes — not corporate, not childish
- 2 colors maximum: coral orange #FF7A59 as main color, white or light gray #EEF2F6 as background
- Soft rounded square format, suitable for app store icon
- No gradients unless very subtle (coral #FF7A59 to #E85D3A)
- No shadows, no 3D effects, no photorealism
- No text, no wordmark, no "NocTou" lettering

MOOD: Warm evening outing, cultural discovery, approachable and inviting — not nightlife club, not museum formal.

TECHNICAL:
- Centered composition with generous padding
- Must remain readable at 48x48 pixels (very small phone icon)
- High contrast between symbol and background
- Square canvas 1024x1024 pixels
- Transparent or solid light background

AVOID: Eiffel Tower clichés, wine bottles, detailed city skylines, theater masks, musical notes, calendar grids, busy illustrations, multiple icons combined, dark backgrounds with low contrast, purple or blue color schemes.
```

---

## 5. Prompts variantes (itérations)

### 5A — Monogramme « N » (alternative minimaliste)

```
Minimal app icon logo: stylized letter "N" for "NocTou" cultural events app. The N is formed by two simple geometric strokes, with the diagonal stroke curving like a crescent moon or sunset arc. Flat vector, coral orange #FF7A59 on white background. Rounded square app icon format, 1024x1024. No other elements, no text besides the single N letter. Clean, modern, readable at small sizes. iOS app icon style.
```

### 5B — Étoile + pin (événement à découvrir)

```
Minimal app icon: a location map pin icon with a small 4-point star or sparkle at the top, representing a cultural event to discover tonight. Flat vector design, coral #FF7A59 pin on light background #EEF2F6. Simple geometric shapes, rounded corners, app store icon format 1024x1024. No text, no city skyline, no detailed illustration. Warm and inviting mood.
```

### 5C — Calendrier + lune (lié à l'agenda)

```
Minimal app icon: a rounded square calendar page shape with a small crescent moon cutout in the top-right corner. Represents a cultural agenda app for evening outings. Flat vector, coral orange #FF7A59 symbol on white background. Geometric, clean, modern mobile app icon. 1024x1024, no text, no numbers on calendar, no grid lines.
```

### 5D — Version française (pour Ideogram / ChatGPT en FR)

```
Crée une icône d'application mobile minimaliste pour "NocTou", app de sorties culturelles à Toulouse. Symbole unique : un pin de localisation fusionné avec un croissant de lune, évoquant "sortir le soir en ville". Style flat vector, géométrique, moderne. Couleur principale corail #FF7A59, fond blanc ou gris clair #EEF2F6. Format carré arrondi 1024×1024, sans texte, sans lettres. Lisible en très petite taille (48 px). Ambiance chaleureuse et accessible. Pas de monuments, pas de notes de musique, pas de masque de théâtre, pas de dégradés arc-en-ciel.
```

---

## 6. Prompt de retouche (après 1re génération)

Quand tu as une direction qui te plaît, envoie ce prompt de raffinement :

```
Refine this app icon logo:
- Simplify further: remove any unnecessary details
- Increase padding around the symbol (40% of canvas should be empty space)
- Make shapes bolder and thicker for small-size readability
- Ensure only 2 colors: coral #FF7A59 and white/light gray background
- Keep the rounded square app icon format
- Output 1024x1024 PNG with solid background
- The icon must work on both light and dark phone home screens
```

---

## 7. Spécifications techniques (Expo / App Store)

Une fois le logo choisi, prépare ces fichiers :

| Fichier | Taille | Usage |
|---------|--------|-------|
| `assets/icon.png` | **1024 × 1024** px | Icône iOS + Expo |
| `assets/android-icon-foreground.png` | **1024 × 1024** px | Premier plan Android adaptive |
| `assets/android-icon-background.png` | **1024 × 1024** px | Fond Android (couleur unie `#EEF2F6` ou `#FF7A59`) |
| `assets/android-icon-monochrome.png` | **1024 × 1024** px | Monochrome Android false pre Android 13+ |
| `assets/favicon.png` | **48 × 48** px | Web |

**Règles importantes :**
- Pas de transparence sur `icon.png` iOS (fond opaque obligatoire)
- Le symbole doit tenir dans le **safe zone** central (≈ 66 % du canvas) pour Android adaptive icon
- Tester en 48 × 48 px : si on ne distingue plus le symbole → simplifier

**Couleur de fond Android adaptive** (dans `app.json`) :
```json
"backgroundColor": "#EEF2F6"
```
ou
```json
"backgroundColor": "#FF7A59"
```
selon si le logo est corail sur blanc ou blanc sur corail.

---

## 8. Checklist de validation

Avant de valider le logo final, vérifie :

- [ ] Compréhensible en **1 seconde** sans explication
- [ ] Lisible à **48 × 48** px (zoom arrière sur le téléphone)
- [ ] Fonctionne sur **fond clair et fond sombre**
- [ ] **2 couleurs max** (+ blanc/gris)
- [ ] Pas de texte « NocTou » dans l'icône (Apple/Google déconseillent le texte dans les icônes)
- [ ] Évoque **sortie / culture / ville** — pas boîte de nuit, pas mairie
- [ ] Cohérent avec le corail `#FF7A59` de l'app
- [ ] Original — ne ressemble pas à Google Maps, Citymapper ou Meetup

---

## 9. Ce qu'il faut éviter

| ❌ Éviter | Pourquoi |
|----------|----------|
| Capitole de Toulouse détaillé | Trop local, illisible en petit |
| Masque de théâtre | Cliché culturel, daté |
| Notes de musique | Trop générique, pensé « app musique » |
| Calendrier avec grille | Illisible à 48 px |
| Dégradé multicolore | Incohérent avec la charte |
| Fond noir avec logo sombre | Disparaît sur écran d'accueil dark mode |
| Texte « NocTou » dans l'icône | Illisible, mauvaise pratique store |
| Style 3D / glossy | Daté, ne scale pas bien |

---

## 10. Workflow recommandé (15 min)

```
1. Ideogram  →  Prompt principal (section 4)     →  4 images
2. Choisir   →  Direction A (pin + lune)         →  1 image
3. Ideogram  →  Prompt retouche (section 6)      →  2 images
4. ChatGPT   →  "Simplify this icon further..."  →  1 image
5. Figma     →  Vectoriser + exporter 1024 PNG   →  assets/
6. Tester    →  Remplacer assets/icon.png        →  npx expo start
7. Valider   →  Checklist section 8              →  ✅
```

---

## 11. Brief créatif en une phrase

> **NocTou** : une icône chaleureuse et ultra-simple — un repère de sortie nocturne en corail — qui dit « ce soir, il se passe quelque chose près de toi » sans un mot.

---

*Fichier généré pour le projet NocTou — agenda culturel Toulouse.*
