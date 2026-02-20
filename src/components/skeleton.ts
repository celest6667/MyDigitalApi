export function creerSkeleton(nombre: number = 8): string {
  return Array(nombre)
    .fill("")
    .map(() => `
      <article class="carte-personnage skeleton">
        <div class="skeleton-image"></div>
        <div class="carte-contenu">
          <div class="skeleton-ligne skeleton-titre"></div>
          <div class="skeleton-ligne skeleton-texte"></div>
          <div class="skeleton-ligne skeleton-texte court"></div>
        </div>
      </article>
    `)
    .join("");
}