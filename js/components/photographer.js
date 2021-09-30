/**
 * HTML Builder for photographers list and inject it in the section
 * @param {list} photographersList - list of photographers
 * @return {string} - the html block
 */
 export function createPhotographersListHTML(photographersList) {
  let PhotographersListHTML = ''
  for (const photographer of photographersList) {
    let tagsList = ''
    photographer.tags.forEach( tag => {
      tagsList = tagsList + `
      <li class="tag">${tag}</li>
      `
    })
    PhotographersListHTML = PhotographersListHTML + `
    <li class="photographer">
      <div class="photographer__image" id=${photographer.id}><img
        src="img/${photographer.portrait}"
        alt="Photo of ${photographer.name}">
      </div>\n
      <h2 class="photographer__name">${photographer.name}</h2>\n
      <div class="photographer__city">${photographer.city}, ${photographer.country}</div>\n
      <div class="photographer__tagline">${photographer.tagline}</div>\n
      <div class="photographer__price">${photographer.price}€/jour</div>\n
      <ul class="tags">${tagsList}</ul>\n
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


