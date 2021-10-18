import { createMediaListHTML, createPhotographerCard } from '../components/media.js'
import { createLightBox, createLightBoxFig, displayLightBox } from '../components/lightbox.js'
import { createContactForm, displayContactForm } from '../components/contactform.js'
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
  url.searchParams.delete('tags');
  window.history.pushState({}, '', url);

  // Check the sort query param
  const searchParams = new URLSearchParams(window.location.search);
  let sort = searchParams.get('sort');
  if (!sort) {sort = 'likes'}
  if (!['title', 'date', 'likes'].includes(sort)) {
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
  mediaSection.innerHTML = `<div class="filter">
  <label for="sort">Trier par</label>
  <select id="sort" name="sort">
    <option value="likes">Popularité</option>
    <option value="date">Date</option>
    <option value="title">Titre</option>
  </select>
  </div>`

  const gallerySection = document.createElement('div')
  gallerySection.setAttribute("class", "gallery");
  gallerySection.setAttribute("id", "Gallery");
  gallerySection.innerHTML = createMediaListHTML(medias.get(sort))
  mediaSection.appendChild(gallerySection)

  const lightboxSection = document.createElement('div')
  lightboxSection.setAttribute("class", "lightbox");
  lightboxSection.setAttribute("id", "LightBox");

  const contactSection = document.createElement('div')
  contactSection.setAttribute("class", "contact");
  contactSection.setAttribute("id", "Contact");

  const Section = document.querySelector("#Photographer")
  Section.appendChild(photographerSection)
  Section.appendChild(mediaSection)
  Section.appendChild(lightboxSection)
  Section.appendChild(contactSection)

  // Call lightbox function for creation and display of the lightbox modal
  lightbox(medias);

  // Call contact form;
  contact(photographer.name);

  // Change the sort order
  document.querySelector("#sort").addEventListener('change', (event) => {
    document.querySelector('#Gallery').innerHTML = createMediaListHTML(medias.get(event.currentTarget.value));
    lightbox(medias);
    // Redefine the window location
    const url = new URL(window.location);
    url.searchParams.set('sort', event.currentTarget.value);
    window.history.pushState({}, '', url);
  });

}

/**
 * Creation and display of the lightbox modal
 * @param {object} medias - media database
 */
function lightbox(medias) {
  // Add lightbox modal on each photo
  const lightboxSection = document.querySelector('#LightBox')
  document.querySelectorAll(".gallery__media").forEach(media => {
    media.addEventListener('click', (event) => {
      lightboxSection.innerHTML = createLightBox();
      const figure = document.querySelector(".lightbox__fig")
      figure.innerHTML = createLightBoxFig(medias.getById(media.id.split('_')[1]));
      // Hide action on the lightbox
      document.querySelector(".lightbox__close").addEventListener('click', (event) => {
        displayLightBox(true);
      })
      // Next and previous click event to replace img src, id and title
      document.querySelector(".lightbox__next").addEventListener('click', (event) => {
        const imgElt = document.querySelector(".lightbox__img")
        let nextSibling = document.querySelector(`#media_${imgElt.id.split('_')[1]}`).nextElementSibling
        if (nextSibling) {
          let nextId = nextSibling.id.split('_')[1]
          figure.innerHTML = createLightBoxFig(medias.getById(nextId));
        }
      })
      document.querySelector(".lightbox__previous").addEventListener('click', (event) => {
        const imgElt = document.querySelector(".lightbox__img")
        let previousSibling = document.querySelector(`#media_${imgElt.id.split('_')[1]}`).previousElementSibling
        if (previousSibling) {
          let prevId = previousSibling.id.split('_')[1]
          figure.innerHTML = createLightBoxFig(medias.getById(prevId));        }
      })
      displayLightBox();
    })
  })
}

/**
 * Creation and display of the contact form modal
 * @param {string} photographer - media database
 */
function contact(photographer) {
  const contactSection = document.querySelector('#Contact')
  // Add contact modal to contact button
  const contactButton = document.querySelector('.user__contact')
  contactButton.addEventListener('click', (event) => {
    contactSection.innerHTML = createContactForm(photographer);
    // Hide action on the modal
    document.querySelector(".contact__close").addEventListener('click', (event) => {
      displayContactForm(true);
    })
    displayContactForm();
  })
}