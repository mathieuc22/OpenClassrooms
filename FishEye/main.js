import './style.css'

import { Home } from "./js/views/home.js"
import { Photographer } from './js/views/media.js'
import { initPhotographersDB } from './js/factory/factory.js'

/**
 * DOM Loader
 */
document.addEventListener("DOMContentLoaded", function () {

  // If photographer queryparam exists load the photographer page
  const searchParams = new URLSearchParams(window.location.search);
  const photographer = searchParams.get('photographer');
  // Init the photographers database
  const photographers = initPhotographersDB();

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
    let url = new URL(window.location.protocol + window.location.hostname + ":" + window.location.port)
    window.history.pushState({}, '', url);
    Home(photographers);
  }

});