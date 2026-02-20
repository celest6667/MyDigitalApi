import type { ReponseAPI } from "../types/character";

const URL_BASE = "https://rickandmortyapi.com/api/character";

export async function chargerPersonnages(page: number = 1): Promise<ReponseAPI> {
  const reponse = await fetch(`${URL_BASE}?page=${page}`);

  if (!reponse.ok) {
    throw new Error(`Erreur HTTP : ${reponse.status}`);
  }

  const donnees: ReponseAPI = await reponse.json();
  return donnees;
}
