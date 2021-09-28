/**
 * HTML Builder for media list and inject it in the section
 * @param {list} mediaList - list of tags
 * @return {string} - the html block
 */
 export function createMediaListHTML(mediaList) {
  let mediaListHTML = ''
  mediaList.forEach(media => {
    mediaListHTML = mediaListHTML + '<li>' + media.title + '</li>'
  })
  return '<ul>' + mediaListHTML + `</ul>\n`
}