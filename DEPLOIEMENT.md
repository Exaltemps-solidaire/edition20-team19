# Déploiement

Application pour l'association **L'BURN** (Les BURN'ettes) : aide une BURN'ette à
identifier le parcours et le module qui correspondent à son stade de reconstruction.
Version actuelle : sélection d'un persona de démonstration puis affichage d'une
suggestion de parcours, données en dur (pas encore de vrai quiz).

## Services

- `frontend/` : Next.js en export statique, servi par nginx. **C'est le service exposé publiquement** (port 80 du conteneur, 8080 sur la VM). Répond `/health` et `/sante` (fichiers statiques).
- `api/` : service Node sans dépendance, port 8081. Ne sert pour l'instant que `/health` et `/sante` ; aucune route métier n'est encore appelée par le front (la suggestion est calculée côté client, en dur).

## Services externes

Aucun pour cette version : pas de base de données, pas d'appel LLM, pas d'e-mail ni de paiement.

## Connu comme fragile ou inachevé

- La suggestion de parcours est entièrement en dur (`frontend/src/lib/suggestions.ts`) : pas de vrai quiz d'énergie/stade, pas d'appel à l'API.
- Le front n'appelle pas encore l'API : la route `/api/v1/...` reste à brancher dès qu'une vraie logique métier doit vivre côté serveur.
- Pas de persistance : rien ne survit à un rechargement de page.

## Contact

- Équipe : Équipe 19 (hackathon eXaltemps Solidaire).
- Association : L'BURN (Les BURN'ettes) — contact nominatif à préciser par l'équipe.
