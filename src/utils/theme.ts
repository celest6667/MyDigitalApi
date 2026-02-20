const CLE_THEME = "rick-morty-theme";

export function initialiserTheme(): void {
  const themeSauvegarde = localStorage.getItem(CLE_THEME);
  if (themeSauvegarde === "sombre") {
    document.documentElement.setAttribute("data-theme", "sombre");
    mettreAJourBouton(true);
  }
}

export function basculerTheme(): void {
  const estSombre = document.documentElement.getAttribute("data-theme") === "sombre";

  if (estSombre) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem(CLE_THEME, "clair");
  } else {
    document.documentElement.setAttribute("data-theme", "sombre");
    localStorage.setItem(CLE_THEME, "sombre");
  }

  mettreAJourBouton(!estSombre);
}

function mettreAJourBouton(sombre: boolean): void {
  const icone = document.querySelector(".icone-theme");
  if (icone) {
    icone.textContent = sombre ? "☀" : "☽";
  }
}