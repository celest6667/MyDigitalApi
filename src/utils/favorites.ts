const CLE_FAVORIS = "rick-morty-favoris";

export function obtenirFavoris(): number[] {
  const donnees = localStorage.getItem(CLE_FAVORIS);
  return donnees ? JSON.parse(donnees) : [];
}

export function estFavori(id: number): boolean {
  return obtenirFavoris().includes(id);
}

export function basculerFavori(id: number): boolean {
  const favoris = obtenirFavoris();
  const index = favoris.indexOf(id);

  if (index === -1) {
    favoris.push(id);
  } else {
    favoris.splice(index, 1);
  }

  localStorage.setItem(CLE_FAVORIS, JSON.stringify(favoris));
  return index === -1; 
}