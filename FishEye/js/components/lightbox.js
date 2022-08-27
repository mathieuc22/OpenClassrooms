export function createLightBox() {
  let lightboxHTML;
  lightboxHTML = `
  <div class="lightbox__card">
    <div class="lightbox__previous"><span class="fas fa-chevron-left" aria-hidden="true"></span></div>
    <figure class="lightbox__fig">
    </figure>
    <div class="lightbox__next"><span class="fas fa-chevron-right" aria-hidden="true"></span></div>
    <div class="lightbox__close"><span class="fas fa-times" aria-hidden="true"></span></div>
  </div>
  `;
  return lightboxHTML;
}

export function createLightBoxFig(photoObject) {
  let figureHTML;
  let mediaHTML;
  if (photoObject.type === 'image') {
    mediaHTML = `<img
        class="lightbox__img"
        id="lightbox_${photoObject.id}"
        src="img/photos/${photoObject.url}"
        alt="Photo ${photoObject.title}"
      ></img>`;
  } else {
    mediaHTML = `
    <video controls
      class="lightbox__img"
      id="lightbox_${photoObject.id}">
      <source 
        src="img/photos/${photoObject.url}"
        type="video/mp4"
        >
    </video>`;
  }
  figureHTML = `
      ${mediaHTML}
      <figcaption class="lightbox__title">${photoObject.title}</caption>
  `;
  return figureHTML;
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


