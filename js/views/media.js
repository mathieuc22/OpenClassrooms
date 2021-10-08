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
  if (!sort) {sort = 'like'}
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
  mediaSection.innerHTML = `<label for="sort">Trier par</label>
  <select id="sort" name="sort">
    <option value="like">Popularité</option>
    <option value="date">Date</option>
    <option value="title">Titre</option>
  </select>`

  const gallerySection = document.createElement('div')
  gallerySection.setAttribute("class", "gallery");
  gallerySection.setAttribute("id", "Gallery");
  gallerySection.innerHTML = createMediaListHTML(medias.get(sort))
  mediaSection.appendChild(gallerySection)

  const Section = document.querySelector("#Photographer")
  Section.appendChild(photographerSection)
  Section.appendChild(mediaSection)

  document.querySelector("#sort").addEventListener('change', (event) => {
    document.querySelector('#Gallery').innerHTML = createMediaListHTML(medias.get(event.currentTarget.value));
    // Redefine the window location
    const url = new URL(window.location);
    url.searchParams.set('sort', event.currentTarget.value);
    window.history.pushState({}, '', url);
  });

}