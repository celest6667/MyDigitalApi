# MyDigitalApi
# Rick & Morty — Explorateur

Application front-end en TypeScript vanilla permettant d'explorer les personnages de la série Rick & Morty.

## Lancer le projet
```bash
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173/`

## API utilisée

**Rick and Morty API** — [https://rickandmortyapi.com](https://rickandmortyapi.com)

Endpoint utilisé :
- `GET https://rickandmortyapi.com/api/character?page={n}` — Liste paginée des personnages

## Fonctionnalités

- Grille de personnages avec nom, statut, espèce, localisation et nombre d'épisodes
- Fiche détaillée en modale au clic sur une carte
- Pagination "Voir plus" pour charger les pages suivantes
- Tri côté client par nom (A→Z / Z→A) et par nombre d'épisodes
- Favoris persistants via localStorage avec vue filtrée
- Bandeau de statistiques (total affiché, nombre de favoris, moyenne d'épisodes)
- Thème clair / sombre
- Comparaison de deux personnages (Shift + clic)
- Skeletons de chargement
- Responsive mobile / desktop

## Structure des fichiers
```
src/
├── components/
│   ├── card.ts          # Création des cartes personnage
│   ├── compare.ts       # Logique de comparaison
│   ├── modal.ts         # Modale fiche détaillée
│   ├── skeleton.ts      # Skeletons de chargement
│   └── stats.ts         # Bandeau de statistiques
├── services/
│   └── api.ts           # Requêtes fetch vers l'API
├── types/
│   └── character.ts     # Interfaces TypeScript
├── utils/
│   ├── favorites.ts     # Gestion des favoris (localStorage)
│   └── theme.ts         # Toggle thème clair/sombre
├── main.ts              # Point d'entrée, orchestration
└── style.css            # Styles globaux
```

## Technologies

- HTML / CSS / TypeScript vanilla
- Vite (build tool)
- Aucune dépendance externe (fetch natif, localStorage natif)
