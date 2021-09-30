import { createPhotographersListHTML, createTagsListHTML } from '../components/photographer.js'
import { initPhotographersDB } from '../factory/factory.js'
import { Photographer } from './media.js'

/**
 * Page builder for Home page
 */
 export async function Home() {

  // Show Home view and hide other views
  document.querySelector('#Home').innerHTML = '';
  document.querySelector('#Home').style.display = 'block';
  document.querySelector('#Photographer').style.display = 'none';

  // Init the photographers database
  const photographers = await initPhotographersDB();

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

  // Add link to the photographer page
  document.querySelectorAll("#tags li").forEach(tag => {
    tag.addEventListener("click", (event) => {
      // Build the section
      photographersSection.innerHTML = createPhotographersListHTML(photographers.getByTag(event.currentTarget.innerHTML));
      // Filter the photographers by selecting a tag
      document.querySelectorAll("#photographers li").forEach(tag => {
        tag.addEventListener("click", (event) => {
          // Call the photographer view
          Photographer(photographers.getById(event.currentTarget.id))
        })
      })
    })
  })

  // Filter the photographers by selecting a tag
  document.querySelectorAll("#photographers li").forEach(tag => {
    tag.addEventListener("click", (event) => {
      // Call the photographer view
      Photographer(photographers.getById(event.currentTarget.id))
    })
  })

}