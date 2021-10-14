export function createLightBox(photoObject) {
  let lightboxHTML = '';
  lightboxHTML = `
  <div class="lightbox__card">
    <div class="lightbox__previous"><span class="fas fa-chevron-left" aria-hidden="true"></span></div>
    <figure class="lightbox__fig">
      <img
        class="lightbox__img"
        id="lightbox_${photoObject.id}"
        src="img/photos/${photoObject.url}"
        alt="Photo ${photoObject.title}"
        loading="lazy"
        ></img>
      <figcaption class="lightbox__title">${photoObject.title}</caption>
    </figure>
    <div class="lightbox__next"><span class="fas fa-chevron-right" aria-hidden="true"></span></div>
    <div class="lightbox__close"><span class="fas fa-times" aria-hidden="true"></span></div>
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
    document.querySelector('#LightBox').style.display = 'flex';
  }
}


