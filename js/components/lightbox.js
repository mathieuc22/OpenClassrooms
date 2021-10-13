export function createLightBox(photoObject) {
  let lightboxHTML = '';
  lightboxHTML = `
  <div class="lightbox__card">
    <img
      src="img/photos/${photoObject.url}"
      alt="Photo ${photoObject.title}"
      loading="lazy"
      ></img>
    <div class="lightbox__title">${photoObject.title}</div>
    <div class="lightbox__close">Close</div>
    <div class="lightbox__previous">Previous</div>
    <div class="lightbox__next">Next</div>
  </div>
  `;
  return lightboxHTML;
}

export function displayLightBox(hide) {

  if (hide) {
    // display the modal
    document.querySelector('body').classList.remove('noscroll')
    document.querySelector('#LightBox').style.display = 'none';
  } else {
    // display the modal
    document.querySelector('body').classList.add('noscroll')
    document.querySelector('#LightBox').style.display = 'block';
  }
}


