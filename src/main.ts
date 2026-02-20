import "./style.css";
import {
  basculerSelection,
  obtenirSelection,
  estSelectionne,
  afficherComparaison,
  surChangementSelection,
} from "./components/compare";
import { initialiserTheme, basculerTheme } from "./utils/theme";
import { ouvrirModale } from "./components/modal";
import type { Personnage } from "./types/character";
import { chargerPersonnages } from "./services/api";
import { creerCarte } from "./components/card";
import { creerSkeleton } from "./components/skeleton";
import { basculerFavori, obtenirFavoris } from "./utils/favorites";

let personnages: Personnage[] = [];
let pageActuelle: number = 1;
let pagesTotales: number = 1;
let triActuel: string = "nom-az";
let vueFavoris: boolean = false;

const grille = document.getElementById("grille-personnages")!;
const zoneChargement = document.getElementById("zone-chargement")!;
const zoneErreur = document.getElementById("zone-erreur")!;
const btnVoirPlus = document.getElementById("btn-voir-plus") as HTMLButtonElement;
const btnReessayer = document.getElementById("btn-reessayer") as HTMLButtonElement;
const selectTri = document.getElementById("tri") as HTMLSelectElement;
const btnTous = document.getElementById("btn-tous") as HTMLButtonElement;
const btnFavoris = document.getElementById("btn-favoris") as HTMLButtonElement;
const bandeauStats = document.getElementById("bandeau-stats")!;
const btnTheme = document.getElementById("btn-theme") as HTMLButtonElement;
const btnComparer = document.getElementById("btn-comparer") as HTMLButtonElement;

function afficherChargement(): void {
  zoneChargement.innerHTML = creerSkeleton(8);
  zoneErreur.style.display = "none";
  btnVoirPlus.style.display = "none";
}

function masquerChargement(): void {
  zoneChargement.innerHTML = "";
}

function afficherErreur(): void {
  masquerChargement();
  zoneErreur.style.display = "flex";
  btnVoirPlus.style.display = "none";
}

function trierPersonnages(liste: Personnage[]): Personnage[] {
  const copie = [...liste];
  switch (triActuel) {
    case "nom-az":
      return copie.sort((a, b) => a.name.localeCompare(b.name));
    case "nom-za":
      return copie.sort((a, b) => b.name.localeCompare(a.name));
    case "episodes-desc":
      return copie.sort((a, b) => b.episode.length - a.episode.length);
    case "episodes-asc":
      return copie.sort((a, b) => a.episode.length - b.episode.length);
    default:
      return copie;
  }
}

function mettreAJourStats(): void {
  const favoris = obtenirFavoris();
  const totalAffiche = personnages.length;
  const nbFavoris = favoris.length;
  const moyenneEpisodes =
    personnages.length > 0
      ? (personnages.reduce((acc, p) => acc + p.episode.length, 0) / personnages.length).toFixed(1)
      : "0";

  bandeauStats.innerHTML = `
    <span>Affichés : <strong>${totalAffiche}</strong></span>
    <span>Favoris : <strong>${nbFavoris}</strong></span>
    <span>Moy. épisodes : <strong>${moyenneEpisodes}</strong></span>
  `;
}

function mettreAJourBoutonComparer(): void {
  const selection = obtenirSelection();
  btnComparer.textContent = `Comparer (${selection.length}/2)`;
  btnComparer.disabled = selection.length !== 2;
}

function afficherPersonnages(): void {
  let liste = vueFavoris ? personnages.filter((p) => obtenirFavoris().includes(p.id)) : personnages;

  liste = trierPersonnages(liste);

  grille.innerHTML = "";
  liste.forEach((personnage) => {
    grille.appendChild(creerCarte(personnage));
  });

  mettreAJourStats();
  mettreAJourBoutonComparer();

  btnVoirPlus.style.display = !vueFavoris && pageActuelle < pagesTotales ? "block" : "none";
}

async function chargerPage(): Promise<void> {
  afficherChargement();
  try {
    const donnees = await chargerPersonnages(pageActuelle);
    pagesTotales = donnees.info.pages;
    personnages = [...personnages, ...donnees.results];
    masquerChargement();
    afficherPersonnages();
  } catch (erreur) {
    console.error(erreur);
    afficherErreur();
  }
}

btnTheme.addEventListener("click", basculerTheme);

btnVoirPlus.addEventListener("click", () => {
  pageActuelle++;
  chargerPage();
});

btnReessayer.addEventListener("click", () => {
  chargerPage();
});

selectTri.addEventListener("change", () => {
  triActuel = selectTri.value;
  afficherPersonnages();
});

btnTous.addEventListener("click", () => {
  vueFavoris = false;
  btnTous.classList.add("actif");
  btnFavoris.classList.remove("actif");
  afficherPersonnages();
});

btnFavoris.addEventListener("click", () => {
  vueFavoris = true;
  btnFavoris.classList.add("actif");
  btnTous.classList.remove("actif");
  afficherPersonnages();
});

btnComparer.addEventListener("click", afficherComparaison);

surChangementSelection(() => {
  mettreAJourBoutonComparer();
  document.querySelectorAll(".carte-personnage").forEach((carte) => {
    const id = Number((carte as HTMLElement).dataset.id);
    carte.classList.toggle("carte-selectionnee", estSelectionne(id));
  });
});

grille.addEventListener("click", (e) => {
  const cible = e.target as HTMLElement;

  if (cible.classList.contains("btn-favori")) {
    const id = Number(cible.dataset.id);
    const estMaintenant = basculerFavori(id);
    cible.classList.toggle("btn-favori-actif", estMaintenant);
    mettreAJourStats();
    return;
  }

  const carte = cible.closest(".carte-personnage") as HTMLElement;
  if (!carte) return;

  const id = Number(carte.dataset.id);
  const personnage = personnages.find((p) => p.id === id);
  if (!personnage) return;

  if (e.shiftKey) {
    basculerSelection(personnage);
    return;
  }

  ouvrirModale(personnage);
});

grille.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cible = e.target as HTMLElement;
    if (cible.classList.contains("carte-personnage")) {
      cible.click();
    }
  }
});

initialiserTheme();
chargerPage();
