import { Home } from "./views/home.js"
import { Photographer } from "./views/media.js";
import { initPhotographersDB } from './factory/factory.js'

/**
 * DOM Loader
 */
document.addEventListener("DOMContentLoaded", async function () {

  // By default, load Home
  //Home()


  // Init the photographers database
  const photographers = await initPhotographersDB();
  Photographer(photographers.getById("243"));

});

window.Home = () => {
  Home();
}