import { Home } from "./views/home.js"

/**
 * DOM Loader
 */
document.addEventListener("DOMContentLoaded", function () {

  document.querySelector(".logo").addEventListener("click", () => {
    Home()
  })

  // By default, load Home
  Home()

});



