/**
 * HTML Builder for photographers list and inject it in the section
 * @param {list} photographersList - list of photographers
 * @return {string} - the html block
 */
 export function createPhotographersListHTML(photographersList) {
  let PhotographersListHTML = ''
  console.log(photographersList)
  for (const photographer of photographersList) {
    PhotographersListHTML = PhotographersListHTML + `
    <li class="photographer" id=${photographer.id}>
      <div class="photographer__image"><img
        src="img/${photographer.portrait}"
        alt="Photo of ${photographer.name}">
      </div>\n
      <h2 class="photographer__name">${photographer.name}</h2>\n
      <div class="photographer__city">${photographer.country}, ${photographer.city}</div>\n
      <div class="photographer__tagline">${photographer.tagline}</div>\n
      <div class="photographer__price">${photographer.price}€/jour</div>\n
      <div>${photographer.tags}</div>\n
    </li>
    `;
  }
  return '<ul class="photographers">' + PhotographersListHTML + `</ul>\n`
}

/**
 * HTML Builder for tags list and inject it in the section
 * @param {list} tagsList - list of tags
 * @return {string} - the html block
 */
export function createTagsListHTML(tagsList) {
  let tagsListHTML = ''
  tagsList.forEach(tag => {
    tagsListHTML = tagsListHTML + '<li class="tag">' + tag + '</li>'
  })
  return '<ul class="tags">' + tagsListHTML + `</ul>\n`
}


