import { createTagsListHTML } from '../components/photographer.js';

/**
 * HTML Builder for media list and inject it in the section
 * @param {list} mediaList - list of tags
 * @return {string} - the html block
 */
export function createMediaListHTML(mediaList) {
  let mediaListHTML = '';
  mediaList.forEach((media) => {
    let mediaHTML;
    if (media.type === 'image') {
      mediaHTML = `<img
        src="img/photos/resized_${media.url}"
        alt="Photo ${media.title}"
        loading="lazy"
        ></img>`;
    } else {
      mediaHTML = `
      <video controls>
      <source src="img/photos/${media.url}"
      type="video/mp4"></video>`;
    }
    mediaListHTML =
      mediaListHTML +
      `
    <figure class="gallery__media" id=${media.id}>
      ${mediaHTML}
      <figcaption class="gallery__caption">
        <div>${media.title}</div>\n
        <div>${media.likes} <img src="assets/like.svg"></div>\n
      </figcaption>
    </figure>\n
    `;
  });
  return mediaListHTML;
}

export function createPhotographerCard(photographerObject, photographerLikes) {
  const tagsList = createTagsListHTML(photographerObject.tags);
  let cardHTML = `
    <div class="user__info">
      <h1 class="user__name">${photographerObject.name}</h1>\n
      <div class="user__city">${photographerObject.country}, ${photographerObject.city}</div>\n
      <div class="user__tagline">${photographerObject.tagline}</div>\n
      ${tagsList}
      <button class="user__contact button">Contactez-moi</button>
    </div>
    <div class="user__image">
      <img
        src="img/resized_${photographerObject.portrait}"
        alt="Photo of ${photographerObject.name}"
      >
    </div>
    <div class="user__box">
      <div class="user__likes">
        ${photographerLikes} <img src="assets/like.svg">
      </div>
      <div class="user__price">
        ${photographerObject.price}€ / jour
      </div>
    </div>
    `;
  return cardHTML;
}
