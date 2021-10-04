/**
 * HTML Builder for photographers list and inject it in the section
 * @param {list} photographersList - list of photographers
 * @return {string} - the html block
 */
export function createPhotographersListHTML(photographersList) {
  let PhotographersListHTML = '';
  for (const photographer of photographersList) {
    const tagsList = createTagsListHTML(photographer.tags);
    PhotographersListHTML =
      PhotographersListHTML +
      `
    <li class="photographer">
      <div role="link" onclick="PhotographerLink(${photographer.id})" onkeydown="PhotographerLink(${photographer.id})" tabindex="0" class="photographer__image" id=${photographer.id}>
        <img
          src="img/resized_${photographer.portrait}"
          alt="Photo of ${photographer.name}"
          >
        <h2 class="photographer__name">${photographer.name}</h2>\n
      </div>\n
      <div class="photographer__city">${photographer.city}, ${photographer.country}</div>\n
      <div class="photographer__tagline">${photographer.tagline}</div>\n
      <div class="photographer__price">${photographer.price}€/jour</div>\n
      ${tagsList}\n
    </li>
    `;
  }
  return '<ul class="photographers">' + PhotographersListHTML + `</ul>\n`;
}

/**
 * HTML Builder for tags list and inject it in the section
 * @param {list} tagsList - list of tags
 * @return {string} - the html block
 */
export function createTagsListHTML(tagsList) {
  let tagsListHTML = '';
  tagsList.forEach((tag) => {
    tagsListHTML =
      tagsListHTML +
      `
    <span class="tag" role="link" aria-label="${tag}">${tag}</span>
    `;
  });
  return '<div tabindex="0" class="tags">' + tagsListHTML + `</div>\n`;
}
