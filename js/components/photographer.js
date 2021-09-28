/**
 * HTML Builder for photographers list and inject it in the section
 * @param {list} photographersList - list of photographers
 * @return {string} - the html block
 */
 export function createPhotographersListHTML(photographersList) {
  let PhotographersListHTML = ''
  for (const photographer of photographersList) {
    PhotographersListHTML = PhotographersListHTML + `
    <li id=${photographer.id}>
      <img
        src="img/${photographer.portrait}"
        alt="Photo of ${photographer.name}"
        height="200" >
      <div>${photographer.name}</div>\n
      <div>${photographer.country}, ${photographer.city}</div>\n
      <div>${photographer.tagline}</div>\n
      <div>${photographer.price}€/jour</div>\n
      <div>${photographer.tags}</div>\n
    </li>
    `;
  }
  return '<ul>' + PhotographersListHTML + `</ul>\n`
}

/**
 * HTML Builder for tags list and inject it in the section
 * @param {list} tagsList - list of tags
 * @return {string} - the html block
 */
export function createTagsListHTML(tagsList) {
  let tagsListHTML = ''
  tagsList.forEach(tag => {
    tagsListHTML = tagsListHTML + '<li>' + tag + '</li>'
  })
  return '<ul>' + tagsListHTML + `</ul>\n`
}


