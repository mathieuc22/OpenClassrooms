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
  let url = new URL(window.location);
  let tagsSearchParams = []
  if (url.searchParams.get('tags')) {
    tagsSearchParams = url.searchParams.get('tags').split(',')
  } else {
    url = new URL(window.location.protocol + window.location.hostname + ":" + window.location.port)
    window.history.pushState({}, '', url);
  }

  // Build the html element for tags, before check if we need to destroy existing one
  if (document.querySelector('nav')) {
    document.querySelector('nav').parentElement.removeChild(document.querySelector('nav'))
  }
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
  if (!tagsSearchParams.length) {
    photographersSection.innerHTML = createPhotographersListHTML(photographers.get());
  } else {
    photographersSection.innerHTML = createPhotographersListHTML(photographers.getByTags(tagsSearchParams));
  }

  // Build the page
  const home = document.querySelector("#Home")
  home.innerHTML = "<h1 class='title'>Nos photographes</h2>"
  home.appendChild(photographersSection)

  // Add function for the link to the photographer page
  window.PhotographerLink = (id) => {
    Photographer(photographers.getById(id));
  }

  // Build the filtered photographers list and loop to add links
  photographersList(photographers, url, true);

  // Set the active class to the selected tags
  setActiveTags();

}

/**
 * Build the filtered photographers list and loop to add links
 * @param {Object} photographers - The photographer factory result
 * @param {url} url
 * @param {boolean} creation
 */
function photographersList(photographers, url, creation) {
  // Loop through all tags or exclude nav tags already with an event
  let tags = []
  if (creation) {
    tags = document.querySelectorAll(".tag")
  } else {
    tags = document.querySelectorAll("main .tag")
  }
  // loop through tags to add a click event
  tags.forEach(tag => {
    tag.addEventListener("click", (event) => {
      // Get the searchparams or initiate an array
      let tagsSearchParams = []
      if (url.searchParams.get('tags')) {
        tagsSearchParams = url.searchParams.get('tags').split(',')
      }
      // If tag is active, remove it otherwise add active class and add this to list
      if (event.currentTarget.classList.contains("tag--active")) {
        event.currentTarget.classList.remove("tag--active")
        tagsSearchParams.splice(tagsSearchParams.indexOf(event.currentTarget.innerHTML),1)
      } else {
        event.currentTarget.classList.add("tag--active")
        tagsSearchParams.push(event.currentTarget.innerHTML)
      }
      // Redefine the search params and if the list is empty remove the search param tags
      if (tagsSearchParams.length) {
        url.searchParams.set('tags', tagsSearchParams.join(','));
      } else {
        url.searchParams.delete('tags')
      }
      // Redefine the window location
      window.history.pushState({}, '', url);
      // Build the photographer list
      document.querySelector("#photographers").innerHTML = createPhotographersListHTML(photographers.getByTags(tagsSearchParams));
      // Add link to the photographer page
      document.querySelectorAll(".photographer__image").forEach(photographer => {
        photographer.addEventListener("click", (event) => {
          // Call the photographer view
          Photographer(photographers.getById(event.currentTarget.id))
        })
      })
      // Call again the function in order to add event for tags under each photographer
      photographersList(photographers, url, false);
      // Set the active class to the selected tags
      setActiveTags();
    })
  })
}

/***
 * Set the active class to the selected tags
 */
function setActiveTags() {
  const url = new URL(window.location);
  document.querySelectorAll(".tag").forEach(elt => {
    if (url.searchParams.get('tags') && url.searchParams.get('tags').split(',').includes(elt.innerHTML)) {
      elt.setAttribute("class", "tag tag--active");
    } else {
      elt.setAttribute("class", "tag");
    }
  });
}