import { Home } from "./views/home.js"
import { Photographer } from './views/media.js'
import { initPhotographersDB } from './factory/factory.js'

/**
 * DOM Loader
 */
document.addEventListener("DOMContentLoaded", async function () {

  const searchParams = new URLSearchParams(window.location.search);
  const photographer = searchParams.get('photographer');
  // Init the photographers database
  const photographers = await initPhotographersDB();

  if (photographer) {
    // If there is a query on the photgrapher display the photographer
    Photographer(photographers.getById(photographer));
  } else {
    // By default, load Home
    Home(photographers)
  }

  // Add Home to DOM for the button
  window.Home = () => {
    // Call the Home
    Home(photographers);
  }

});