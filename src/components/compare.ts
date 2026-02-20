import type { Personnage } from "../types/character";

let selection: Personnage[] = [];
let onChangement: (() => void) | null = null;

export function surChangementSelection(callback: () => void): void {
  onChangement = callback;
}

export function obtenirSelection(): Personnage[] {
  return selection;
}

export function basculerSelection(personnage: Personnage): boolean {
  const index = selection.findIndex((p) => p.id === personnage.id);

  if (index !== -1) {
    selection.splice(index, 1);
  } else if (selection.length < 2) {
    selection.push(personnage);
  } else {
    return false;
  }

  if (onChangement) onChangement();
  return true;
}

export function estSelectionne(id: number): boolean {
  return selection.some((p) => p.id === id);
}

export function afficherComparaison(): void {
  if (selection.length !== 2) return;

  const comparaison = document.getElementById("comparaison")!;
  const corps = document.getElementById("comparaison-corps")!;
  const [a, b] = selection;

  comparaison.style.display = "flex";

  corps.innerHTML = `
    <div class="comparaison-grille">
      <div class="comparaison-colonne">
        <img src="${a.image}" alt="${a.name}" class="comparaison-image" />
        <h3>${a.name}</h3>
      </div>
      <div class="comparaison-vs">VS</div>
      <div class="comparaison-colonne">
        <img src="${b.image}" alt="${b.name}" class="comparaison-image" />
        <h3>${b.name}</h3>
      </div>
    </div>
    <table class="comparaison-tableau">
      <tbody>
        ${ligneComparaison("Statut", a.status, b.status)}
        ${ligneComparaison("Espèce", a.species, b.species)}
        ${ligneComparaison("Genre", a.gender, b.gender)}
        ${ligneComparaison("Origine", a.origin.name, b.origin.name)}
        ${ligneComparaison("Localisation", a.location.name, b.location.name)}
        ${ligneComparaison("Épisodes", String(a.episode.length), String(b.episode.length))}
      </tbody>
    </table>
  `;

  comparaison.querySelector(".comparaison-fermer")!.addEventListener("click", fermerComparaison);
  comparaison.addEventListener("click", (e) => {
    if (e.target === comparaison) fermerComparaison();
  });
  document.addEventListener("keydown", gererEscapeComparaison);
}

function ligneComparaison(label: string, valA: string, valB: string): string {
  const match = valA === valB;
  return `
    <tr>
      <td class="comparaison-valeur ${match ? "comparaison-match" : ""}">${valA}</td>
      <td class="comparaison-label">${label}</td>
      <td class="comparaison-valeur ${match ? "comparaison-match" : ""}">${valB}</td>
    </tr>
  `;
}

function fermerComparaison(): void {
  const comparaison = document.getElementById("comparaison")!;
  comparaison.style.display = "none";
  document.removeEventListener("keydown", gererEscapeComparaison);
}

function gererEscapeComparaison(e: KeyboardEvent): void {
  if (e.key === "Escape") fermerComparaison();
}
