# Plan d'itérations — L'BURN (équipe NY53ZD)

**Plan validé le 2026-11-18** (Itération 1, sans corrections rapportées).

**Itération 1 démarrée le 2026-11-18 à 17:03** — temps restant annoncé à ce moment : ~25 minutes (budget serré : 10 codage + 5 publication + 10 test = 25 max, pas de marge).

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation — ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`).
- **Temps restant annoncé** : 30 minutes (demandé le 2026-11-18).
- **Durée du tour de test de l'équipe** : 10 minutes (valeur par défaut, le développeur ne la connaissait pas).
- **Hors périmètre** (explicite dans le PRD de la passation) : back-office de gestion des contenus/parcours, validation d'accès à BURN'ette is BACK, modèle de paiement, modules 5-6 de BIB, ateliers Feel Good, notifications personnalisées, parcours ACTIV' et formation Sentinelle, connexion/création de compte.

## ✂️ Le périmètre ne tient pas au-delà d'une itération

Une itération complète coûte au minimum codage (jusqu'à 10 min) + publication (~5 min) + tour de test (10 min) = **jusqu'à 25 minutes**. Avec 30 minutes au total, le temps ne permet de dérouler qu'**une seule itération** jusqu'au bout (codage + publication + tour de test), avec 5 minutes de marge. Toute itération 2 supposerait un temps de build prolongé.

Ce qui sort donc de ce build, reporté dans « À venir » :
- le vrai quiz d'évaluation (énergie/stade) et son calcul de suggestion ;
- le choix du module et sa page (ressources, ateliers socles) ;
- l'inscription à un atelier ;
- le fil d'Ariane et la réévaluation.

❓ L'étape 7 du scénario idéal de la passation (« création d'une application mobile en complément ») n'apparaît ni dans le plan de livraison de l'équipe ni dans la liste « hors périmètre » du PRD. Je la traite comme hors périmètre pour ce hackathon vu le budget — à confirmer avec les cadreurs si elle est réellement attendue au pitch.

## Itération 1 : on peut se choisir un persona et voir s'afficher une suggestion de parcours (données en dur)

- **Dans le périmètre** :
  - squelette de déployabilité : `.env.example` et `DEPLOIEMENT.md` (le reste du gabarit — `api/`, `frontend/`, Dockerfiles, `/health` et `/sante` — est déjà posé) ;
  - écran *Qui êtes-vous ?* : liste de personas d'exemple (un par rôle du scénario), sélection sans connexion ;
  - écran *Suggestion de parcours* : après sélection, affichage en dur du nom du parcours (BURN TO BE ALIVE ou BURN'ette is BACK), du module suggéré et d'une phrase expliquant pourquoi — pas de vrai quiz, pas de calcul.
- **Hors périmètre** : le quiz d'évaluation réel, le choix du module, la page module, l'inscription à un atelier, le fil d'Ariane, la réévaluation.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'application déployée, quand on l'ouvre sur `/`, alors l'écran *Qui êtes-vous ?* affiche une liste de personas d'exemple.
  - Étant donné un persona choisi, quand on valide, alors l'écran *Suggestion de parcours* affiche un parcours et un module (données en dur) avec une phrase d'explication.
  - Étant donné le déploiement, quand on appelle `$URL_PUBLIQUE/health` et `$URL_PUBLIQUE/sante`, alors les deux répondent 200 avec un corps non ambigu (pas la page de réveil).
- **Hypothèse de l'équipe couverte** : aucune, justifié — les données étant en dur, on ne peut pas encore mesurer « 0 contact équipe pour orienter vers un module » ; cette hypothèse ne devient testable qu'une fois le vrai quiz branché.
- **Codage estimé** : 10 minutes (plafond).
- **Fichiers prévus** (~5, hors tests) : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/app/page.tsx` (écran *Qui êtes-vous ?*), une route/page *Suggestion de parcours*, un fichier de données en dur (personas + suggestion).
- **Tests unitaires prévus** : 1 à 3, sur la logique pure de sélection de persona → suggestion affichée (pas de test sur le balisage).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir l'app, choisir un persona, voir la suggestion de parcours s'afficher.
- **Bilan** :
  - **Durée de codage réelle** : ~3 minutes (160 s entre `.iterations/1.debut` et `.iterations/1.fin`), aucun dépassement, pas de question d'alarme nécessaire.
  - **Critères satisfaits** : les 3 — écran *Qui êtes-vous ?* avec personas, écran *Suggestion de parcours* avec données en dur, `/health` et `/sante` répondent 200 (vérifiés en local sur `localhost:8080`/`:8081`, à confirmer par le développeur sur `$URL_PUBLIQUE`, non bloquant).
  - **Reporté** : rien de ce qui était dans le périmètre — tout est fait. Le quiz réel, le module, l'atelier et le fil d'Ariane restent dans « À venir » comme prévu.
  - **Bloqué par le harnais** : rien sur le signal (`.env`/secrets absents, `npm test` passant). Un contretemps hors harnais a coûté du temps de déploiement : `docker.io` a renvoyé `toomanyrequests` (quota anonyme) sur les deux images de base ; contourné en basculant les `Dockerfile` vers `mirror.gcr.io/library/...`, qui sert les mêmes images sous un quota séparé.
  - **Démo** : `e2e/demo.spec.ts` mis à jour (ouverture, choix du persona Camille, vérification de la suggestion BURN TO BE ALIVE), mais `npx playwright install` n'a jamais été exécuté sur cette machine — le navigateur Chromium manque, donc `npm run demo` échoue localement sans rapport avec l'application. Non bloquant (la démo n'est pas un test), mais à corriger avant la prochaine démo à l'équipe.
  - **Modifications** :
    - `.env.example` — pose la variable `PORT` attendue par le contrat de déployabilité (critère squelette).
    - `DEPLOIEMENT.md` — description à jour du périmètre actuel et des points fragiles (critère squelette).
    - `frontend/src/lib/suggestions.ts` + `suggestions.test.ts` — logique pure persona → suggestion, avec ses tests (critères 1 et 2).
    - `frontend/src/app/page.tsx` + `page.module.css` — écrans *Qui êtes-vous ?* et *Suggestion de parcours* (critères 1 et 2).
    - `api/Dockerfile`, `frontend/Dockerfile` — bascule vers `mirror.gcr.io` pour contourner le quota Docker Hub (nécessaire au déploiement, critère 3).
    - `podman-compose.yml` — déploiement des deux services sur 8080/8081 selon la recette du serveur.
    - `e2e/demo.spec.ts` — étapes de la démo pour cette itération (hors DoD).

## Itération 2 : stabiliser l'écran livré pour le pitch (pas de nouvelle fonctionnalité)

- **Temps restant annoncé** : 15 minutes (demandé le 2026-11-18 à 17:49). Durée du tour de test non redemandée : à 15 minutes, codage (≤10 min) + publication (~5 min) ne laisse déjà plus de marge, donc aucun tour de test de l'équipe n'est possible avant la fin du temps annoncé.
- ✂️ **Périmètre réduit explicitement** : le temps ne permet pas de démarrer le vrai quiz d'évaluation (itération reportée ci-dessous) ni un tour de test. Décision prise avec le développeur : consacrer le temps à stabiliser ce qui est déjà déployé plutôt que risquer une fonctionnalité inachevée.
- **Dans le périmètre** : corriger les deux détails cosmétiques du gabarit par défaut repérés après le déploiement de l'itération 1 (titre de page générique, langue HTML incorrecte).
- **Hors périmètre** : le quiz, le choix du module, l'atelier, le fil d'Ariane (inchangé, reporté).
- **Critères d'acceptation** :
  - Étant donné la page déployée, quand on inspecte le `<title>`, alors il affiche un titre propre à l'application (plus « Create Next App »).
  - Étant donné la page déployée, quand on inspecte `<html lang="...">`, alors la langue est `fr`.
- **Hypothèse de l'équipe couverte** : aucune (pur polish, pas de logique métier nouvelle).
- **Codage estimé** : quelques minutes (très en dessous du plafond).
- **Fichiers prévus** : `frontend/src/app/layout.tsx`.
- **Tests unitaires prévus** : aucun (balisage pur, pas de logique métier).
- **Étapes ajoutées à la démo** : aucune (pas de nouveau parcours utilisateur).
- **Bilan** :
  - **Durée de codage réelle** : ~15 secondes entre `.iterations/2.debut` et `.iterations/2.fin` — très en dessous du plafond, aucune alarme déclenchée.
  - **Critères satisfaits** : les 2 — vérifié par `curl` en local : `<title>L'BURN — Mon parcours</title>` et `lang="fr"`.
  - **Reporté** : rien de nouveau ; le quiz réel, le choix du module, l'atelier et le fil d'Ariane restent dans « À venir » comme prévu par l'itération 1.
  - **Bloqué par le harnais** : rien (`npm test` passant, aucune borne sur `./scripts/verifier-deployabilite.sh`).
  - **Démo** : non modifiée, cette itération ne touchant pas au parcours utilisateur.
  - **Modifications** :
    - `frontend/src/app/layout.tsx` — remplace le titre/description par défaut de Next.js par ceux de l'application, et corrige `lang="en"` en `lang="fr"` (critères 1 et 2).

## Itération 3 : le quiz remplace le choix de persona pour calculer la suggestion

**Plan validé le 2026-11-18** (scope réduit par le développeur vu le temps restant).

- **Temps restant annoncé** : 20 minutes (demandé le 2026-11-18 à 17:56). Tour de test : valeur par défaut 10 minutes (non précisée). Capacité : 20 − 5 (publication) − 10 (tour de test) = **5 minutes de codage max** — scope réduit en conséquence (seulement énergie + stade, pas le besoin du moment).
- **Dans le périmètre** : écran *Évaluation de départ* (2 questions fermées : énergie, stade) pour les personas BURN'ette, calcul de la suggestion à partir du stade.
- **Hors périmètre** : la question « besoin du moment », le choix du module, l'atelier, le fil d'Ariane.
- **Critères d'acceptation** :
  - Étant donné un persona BURN'ette choisi, quand on arrive sur l'écran suivant, alors 2 questions (énergie, stade) s'affichent avant toute suggestion.
  - Étant donné les réponses au quiz, quand on valide, alors la suggestion affichée dépend du stade choisi (reconstruction → BURN TO BE ALIVE, remobilisation → BURN'ette is BACK).
  - Étant donné un persona non-BURN'ette (PO, professionnelle), quand on arrive, alors le message « pas de parcours personnel » s'affiche toujours sans quiz.
- **Hypothèse de l'équipe couverte** : « 0 contact équipe pour s'orienter » — pas mesurable ce coup-ci (pas de vrai tour de test vu le temps).
- **Codage estimé** : 5 minutes (plafond réduit).
- **Fichiers prévus** : `frontend/src/lib/suggestions.ts`, `frontend/src/lib/suggestions.test.ts`, `frontend/src/app/page.tsx`.
- **Tests unitaires prévus** : 1 à 3, sur la fonction pure stade → suggestion.
- **Étapes ajoutées à la démo** : aucune cette fois (budget trop serré pour y toucher aussi).
- **Bilan** :
  - **Durée de codage réelle** : ~46 secondes entre `.iterations/3.debut` et `.iterations/3.fin`, très en dessous du plafond réduit de 5 minutes, aucune alarme nécessaire.
  - **Critères satisfaits** : les 3 — vérifiés en local : l'écran *Évaluation de départ* s'affiche pour les personas BURN'ette avant la suggestion, la suggestion dépend du stade choisi (tests unitaires), et les personas PO/professionnelle gardent le message « pas de parcours personnel » sans quiz.
  - **Reporté** : la question « besoin du moment » du quiz (hors périmètre assumé dès le départ) ; le choix du module, l'atelier et le fil d'Ariane restent dans « À venir ».
  - **Bloqué par le harnais** : rien (`npm test` passant — 5 tests frontend dont 2 nouveaux —, aucune borne sur `./scripts/verifier-deployabilite.sh`).
  - **Démo** : non mise à jour (`e2e/demo.spec.ts` ne couvre donc pas encore le quiz) — à faire à la prochaine itération si le temps le permet.
  - **Modifications** :
    - `frontend/src/lib/suggestions.ts` — ajoute `suggererParcoursDepuisStade`, une fonction pure stade → suggestion, indépendante du persona (critères 1 et 2).
    - `frontend/src/lib/suggestions.test.ts` — 2 tests sur cette nouvelle fonction (critère 2).
    - `frontend/src/app/page.tsx` — ajoute l'écran *Évaluation de départ* (énergie, stade) entre le choix de persona et la suggestion, uniquement pour les personas BURN'ette ; les autres personas gardent le comportement précédent (critères 1 et 3).

## À venir

1. Choix du module parmi ceux du parcours suggéré + page du module (ressources, ateliers socles disponibles).
2. Inscription à un atelier socle depuis la page du module (ou report sans perdre le fil).
3. Fil d'Ariane simple (sans score ni pourcentage) + réévaluation courte suggérant le prochain petit pas.
4. La question « besoin du moment » du quiz, reportée de l'itération 3 faute de temps.
