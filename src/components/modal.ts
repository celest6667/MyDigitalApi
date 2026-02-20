import type { Personnage } from "../types/character";

export function ouvrirModale(personnage: Personnage): void {
  const modale = document.getElementById("modale")!;

  modale.style.display = "flex";
  modale.innerHTML = `
    <div class="modale-contenu" role="dialog" aria-label="Détails de ${personnage.name}">
      <button class="modale-fermer" aria-label="Fermer">✕</button>
      <img class="modale-image" src="${personnage.image}" alt="${personnage.name}" />
      <div class="modale-corps">
        <h2>${personnage.name}</h2>
        <p class="modale-detail">Statut <strong>${personnage.status}</strong></p>
        <p class="modale-detail">Espèce <strong>${personnage.species}</strong></p>
        ${personnage.type ? `<p class="modale-detail">Type <strong>${personnage.type}</strong></p>` : ""}
        <p class="modale-detail">Genre <strong>${personnage.gender}</strong></p>
        <p class="modale-detail">Origine <strong>${personnage.origin.name}</strong></p>
        <p class="modale-detail">Localisation <strong>${personnage.location.name}</strong></p>
        <p class="modale-detail">Épisodes <strong>${personnage.episode.length}</strong></p>
        <p class="modale-detail">Créé le <strong>${new Date(personnage.created).toLocaleDateString("fr-FR")}</strong></p>
      </div>
    </div>
  `;

  modale.querySelector(".modale-fermer")!.addEventListener("click", fermerModale);
  modale.addEventListener("click", (e) => {
    if (e.target === modale) fermerModale();
  });
  document.addEventListener("keydown", gererEscape);
}

function fermerModale(): void {
  const modale = document.getElementById("modale")!;
  modale.style.display = "none";
  modale.innerHTML = "";
  document.removeEventListener("keydown", gererEscape);
}

function gererEscape(e: KeyboardEvent): void {
  if (e.key === "Escape") fermerModale();
}
