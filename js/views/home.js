import { createPhotographersListHTML, createTagsListHTML } from '../components/photographer.js'
import { Photographer } from './media.js'

/**
 * Page builder for Home page
 */
 export function Home(photographers) {

  // Show Home view and hide other views
  document.querySelector('#Home').innerHTML = '';
  document.querySelector('#Home').style.display = 'block';
  document.querySelector('#Photographer').style.display = 'none';

  // Redefine the window location
  const url = new URL(window.location.protocol + window.location.hostname + ":" + window.location.port)
  window.history.pushState({}, '', url);

  // Build the html element for tags
  const tagsSection = document.createElement("nav");
  tagsSection.setAttribute("id", "tags");
  tagsSection.setAttribute("aria-label", "photographer categories");
  tagsSection.innerHTML = createTagsListHTML(photographers.getTags());
  // Nav goes in the header
  if (!document.querySelector('#tags')) {
    document.querySelector('header').appendChild(tagsSection);
  }

  // Build the html element for photographers
  const photographersSection = document.createElement("div");
  photographersSection.setAttribute("id", "photographers");
  photographersSection.innerHTML = createPhotographersListHTML(photographers.get());

  // Build the page
  const home = document.querySelector("#Home")
  home.innerHTML = "<h1 class='title'>Nos photographes</h2>"
  home.appendChild(photographersSection)

  // Add function for the link to the photographer page
  window.PhotographerLink = (id) => {
    Photographer(photographers.getById(id));
  }

  // Build the filtered photographers list and loop to add links
  photographersList(photographers, true);

}

/**
 * Build the filtered photographers list and loop to add links
 * @param {object} photographers 
 */
function photographersList(photographers, creation) {
  // Filter the photographers by selecting a tag
  let tags = []
  if (creation) {
    tags = document.querySelectorAll(".tag")
  } else {
    tags = document.querySelectorAll("main .tag")
  }
  tags.forEach(tag => {
    tag.addEventListener("click", (event) => {
      let activeTag = ''
      if (event.currentTarget.classList.contains("tag--active")) {
        document.querySelector("#photographers").innerHTML = createPhotographersListHTML(photographers.get());
      } else {
        // Build the section
        activeTag = event.currentTarget.innerHTML
        document.querySelector("#photographers").innerHTML = createPhotographersListHTML(photographers.getByTag(event.currentTarget.innerHTML));
      }
      // Add link to the photographer page
      document.querySelectorAll(".photographer__image").forEach(photographer => {
        photographer.addEventListener("click", (event) => {
          // Call the photographer view
          Photographer(photographers.getById(event.currentTarget.id))
        })
      })
      photographersList(photographers, false);
      document.querySelectorAll(".tag").forEach(elt => {
        if (activeTag === elt.innerHTML) {
          elt.setAttribute("class", "tag tag--active");
        } else {
          elt.setAttribute("class", "tag");
        }
      });
    })
  })
}