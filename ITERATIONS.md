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
- **Bilan** : _à remplir en fin d'itération (durée de codage réelle, dépassement éventuel, fait, reporté, modifications fichier par fichier)_

## À venir

1. Le vrai quiz d'évaluation (énergie, stade, besoin du moment) remplace les données en dur et calcule la suggestion.
2. Choix du module parmi ceux du parcours suggéré + page du module (ressources, ateliers socles disponibles).
3. Inscription à un atelier socle depuis la page du module (ou report sans perdre le fil).
4. Fil d'Ariane simple (sans score ni pourcentage) + réévaluation courte suggérant le prochain petit pas.
