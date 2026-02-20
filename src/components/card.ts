import type { Personnage } from "../types/character";
import { estFavori } from "../utils/favorites";

export function creerCarte(personnage: Personnage): HTMLElement {
  const carte = document.createElement("article");
  carte.classList.add("carte-personnage");
  carte.dataset.id = String(personnage.id);
  carte.setAttribute("tabindex", "0");
  carte.setAttribute("role", "button");
  carte.setAttribute("aria-label", `Voir les détails de ${personnage.name}`);

  const favori = estFavori(personnage.id);

  carte.innerHTML = `
    <img class="carte-image" src="${personnage.image}" alt="${personnage.name}" loading="lazy" />
    <div class="carte-contenu">
      <h2 class="carte-nom">${personnage.name}</h2>
      <span class="carte-statut statut-${personnage.status.toLowerCase()}">
        <span class="indicateur-statut"></span>
        ${personnage.status}
      </span>
      <p class="carte-info">${personnage.species} · ${personnage.location.name}</p>
      <p class="carte-info">${personnage.episode.length} épisode(s)</p>
      <button class="btn-favori ${favori ? "btn-favori-actif" : ""}" data-id="${personnage.id}" aria-label="Ajouter aux favoris">★</button>
    </div>
  `;

  return carte;
}
