import { createMediaListHTML, createPhotographerCard } from '../components/media.js'
import { initMediasDB } from '../factory/factory.js'

/**
 * Page builder for Photographer page
 * @param {object} photographer - photographer object
 * @return {string} - the html block
 */
 export function Photographer(photographer) {

  // Redefine the window location
  const url = new URL(window.location);
  url.searchParams.set('photographer', photographer.id);
  window.history.pushState({}, '', url);

  // Check the sort query param
  const searchParams = new URLSearchParams(window.location.search);
  let sort = searchParams.get('sort');
  if (!['title', 'date', 'like'].includes(sort)) {
    console.log(`${sort} is not a sort parameter`)
    sort = '';
  }

  // Suppression de la nav
  const nav = document.querySelector('nav');
  if (nav) {nav.parentNode.removeChild(nav);}

  // Display the photographer view
  document.querySelector('#Home').style.display = 'none';
  document.querySelector('#Photographer').innerHTML = '';
  document.querySelector('#Photographer').style.display = 'block';

  // Init the media database
  const medias = initMediasDB(photographer.id);

  // Build the photographer HTML section
  const photographerSection = document.createElement('div')
  photographerSection.setAttribute("class", "user");
  photographerSection.innerHTML = createPhotographerCard(photographer, medias.getLikes())

  // Inject the media HTML section with the list of photographers media
  const mediaSection = document.createElement('div')
  mediaSection.setAttribute("class", "gallery");
  mediaSection.innerHTML = createMediaListHTML(medias.get(sort))

  const Section = document.querySelector("#Photographer")
  Section.appendChild(photographerSection)
  Section.appendChild(mediaSection)

}