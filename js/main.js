import { Home } from "./views/home.js"

/**
 * DOM Loader
 */
document.addEventListener("DOMContentLoaded", function () {

  // By default, load Home
  Home()

});

window.Home = () => {
  Home();
}