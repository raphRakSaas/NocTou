# SortiRose — Ce qu'il reste à faire

*Dernière mise à jour : 2026-07-05. Document de travail, pas un conseil juridique formel (voir disclaimer en bas).*

---

## 1. Ta question : es-tu vraiment soumis à toutes ces obligations ?

Contexte : SortiRose est un **projet personnel**, développé par toi seul, **gratuit, sans publicité, sans monétisation**, aucune structure pro derrière (pas de lien avec "Plum").

Ça change beaucoup de choses par rapport à une appli éditée par une société. Détail par obligation :

### LCEN — mentions légales (identité de l'éditeur)
La loi (art. 6-III, [Légifrance](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000042038977/2020-06-26/)) prévoit un **régime allégé pour les éditeurs non professionnels** : tu peux ne montrer publiquement que l'identité de ton "hébergeur" (dans ton cas : Apple App Store / Google Play), à condition que **tes vraies coordonnées soient connues de cet hébergeur** — ce qui est déjà le cas via ton compte développeur Apple/Google (vérification d'identité obligatoire à l'inscription).

**Concrètement** : tu n'es pas obligé d'afficher ton nom, adresse ou téléphone publiquement dans l'app. Un email de contact reste recommandé (confort utilisateur, demandes de retrait d'image, etc.) mais n'est pas une obligation stricte dans ce régime.

⚠️ **Point de bascule important** : *"la qualification d'édition non professionnelle est perdue dès qu'apparaît une contrepartie économique, même modeste"* — pub, don, achat in-app, version payante, tip jar... Le jour où tu ajoutes n'importe quelle forme de monétisation, tu repasses en éditeur "professionnel" et dois publier des mentions légales complètes (identité, adresse, éventuellement un statut d'auto-entrepreneur pour encaisser légalement de l'argent).

### RGPD
S'applique **indépendamment de ton statut pro/perso** dès que tu publies une app accessible au public (l'exemption "usage strictement personnel/domestique" du RGPD ne joue pas ici, car l'app est distribuée à un public indéterminé). En revanche, la charge réelle est très légère pour SortiRose : pas de compte, pas de serveur à toi, données stockées uniquement en local sur l'appareil, géoloc optionnelle. Une politique de confidentialité honnête et courte (déjà en place dans `app/privacy.tsx`) couvre l'essentiel. Pas de DPO, pas d'enregistrement CNIL nécessaires à ce niveau.

### Licence Open Data (Toulouse Métropole) et droits d'image (OpenAgenda)
Ces obligations **ne dépendent pas de ton statut pro/perso** — elles s'imposent à quiconque réutilise ces données/images, particulier ou entreprise. La Licence Ouverte Etalab 2.0 impose une mention de source (déjà faite). Les visuels récupérés via OpenAgenda ou scrapés depuis les sites de billetterie restent la propriété de leurs auteurs — risque résiduel faible mais réel si quelqu'un réclame.

### Règles Apple / Google (politique de confidentialité, formulaires App Privacy / Data Safety)
Ce sont des **règles contractuelles des stores**, pas des lois françaises/européennes — elles s'appliquent à tout développeur qui publie via ces plateformes, société ou particulier. Pas d'échappatoire liée à ton statut perso ici.

### European Accessibility Act (accessibilité)
Vise les "opérateurs économiques" exerçant une activité économique. Un projet personnel non lucratif est très probablement **hors du champ légal de cette réglementation**. Les améliorations d'accessibilité déjà faites (labels, contrastes) restent une bonne pratique, pas une obligation dans ton cas.

### En résumé
| Obligation | S'applique à toi maintenant ? |
|---|---|
| Mentions légales complètes (nom, adresse, SIRET) | Non — régime allégé non-pro |
| Politique de confidentialité RGPD | Oui, mais très légère |
| Attribution licence Open Data | Oui, indépendant du statut |
| Vigilance droits d'image OpenAgenda | Oui, indépendant du statut |
| Politique de confidentialité publique (URL) pour les stores | Oui — obligation des stores |
| Formulaires App Privacy / Data Safety | Oui — obligation des stores |
| European Accessibility Act | Probablement non |

**Disclaimer** : je ne suis pas avocat, ceci est une synthèse pour t'aider à avancer, pas un conseil juridique opposable. Si un jour tu monétises l'app (même un peu), refais ce point avec un avocat ou via une permanence gratuite (CNIL, Ordre des avocats, BPI France pour la partie création d'activité).

---

## 2. Reste à faire — Juridique

- [ ] **Décider** : garder l'email de contact public dans les pages légales (déjà mis : `raphael.rakotonaivo.saas@gmail.com`), ou préférer l'anonymat total permis par le régime non-pro ?
- [ ] **Publier la politique de confidentialité sur une URL publique hors app** — obligatoire pour la soumission App Store Connect / Google Play Console (actuellement elle n'existe que dans l'écran `app/privacy.tsx`). Une simple page statique (GitHub Pages, Notion public, etc.) suffit.
- [ ] **Remplir les formulaires "App Privacy" (Apple) et "Data Safety" (Google)** dans les consoles respectives, en cohérence avec ce que déclare `app/privacy.tsx` (géoloc optionnelle, aucune donnée vendue, pas de tracking publicitaire).
- [x] **Bundle identifier `com.plum.sortirose`** — mis à jour lors du rebrand SortiRose (nécessite une nouvelle build / réinstallation si l'ancienne app `com.plum.noctou` était déjà installée).
- [ ] **Garder en tête le point de bascule monétisation** : le jour où tu ajoutes pub/don/achat, revenir sur ce fichier en entier.

## 3. Reste à faire — Technique (secondaire)

- [ ] `components/FilterBar.tsx` a été retravaillé en dehors de cette session (nouveau composant `FilterOptionsSheet` avec des feuilles de sélection au lieu des chips horizontales) — à tester à l'usage.
- [ ] Limitation connue et non bloquante : les appels OpenAgenda et le scraping d'image (`api/ogImage.ts`) échouent en CORS sur le build web (fonctionnent en natif iOS/Android) — à garder en tête si la version web est un jour mise en avant.

---

## Sources consultées
- [Article 6 LCEN — Légifrance](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000042038977/2020-06-26/)
- [Licence Ouverte / Open Licence Etalab 2.0](https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Licence_Ouverte.pdf)
- [Licence — Open Data Toulouse Métropole](https://data.toulouse-metropole.fr/pages/licence/)
