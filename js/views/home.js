import { createPhotographersListHTML, createTagsListHTML } from '../components/photographer.js'
import { initPhotographersDB } from '../factory/factory.js'
import { Photographer } from './photographer.js'

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
  const tagsSection = document.createElement("div");
  tagsSection.setAttribute("id", "tags");
  tagsSection.innerHTML = createTagsListHTML(photographers.getTags())

  // Build the html element for photographers
  const photographersSection = document.createElement("div");
  photographersSection.setAttribute("id", "photographers");
  photographersSection.innerHTML = createPhotographersListHTML(photographers.get());

  // Build the page
  const home = document.querySelector("#Home")
  home.appendChild(tagsSection)
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