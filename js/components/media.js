/**
 * HTML Builder for media list and inject it in the section
 * @param {list} mediaList - list of tags
 * @return {string} - the html block
 */
 export function createMediaListHTML(mediaList) {
  let mediaListHTML = ''
  mediaList.forEach(media => {
    let mediaHTML
    if (media.type === 'image') {
      mediaHTML = `<img
        src="media/${media.url}"
        alt="Photo ${media.title}"
        height="200" ></img>`
    } else {
      mediaHTML = `
      <video controls height="200">
      <source src="/media/${media.url}"
      type="video/mp4"></video>`
    }
    mediaListHTML = mediaListHTML + `
    <li id=${media.id}>
      ${mediaHTML}
      <div>${media.title}</div>\n
      <div>${media.likes}</div>\n
    </li>
    `});
  return '<ul>' + mediaListHTML + `</ul>\n`
}

export function createPhotographerCard(photographerObject) {
  let cardHTML = `
    <div>${photographerObject.name}</div>\n
    <div>${photographerObject.country}, ${photographerObject.city}</div>\n
    <div>${photographerObject.tagline}</div>\n
    <div>${photographerObject.tags}</div>\n
    <button class="button">Contactez-moi</button>
    `;
  return '<div>' + cardHTML + `</div>\n`

}