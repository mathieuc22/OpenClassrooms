export function createContactForm(photographer) {
  let contactFormHTML;
  contactFormHTML = `
    <form action="" method="get" class="contact__form">
      <h1 class="contact__title">Contactez-moi ${photographer}</h1>
      <div class="contact__close"><span class="fas fa-times" aria-hidden="true"></span></div>

      <div class="contact__field">
        <label for="surname">Prénom</label>
        <input type="text" name="surname" id="surname" required>
      </div>
      <div class="contact__field">
        <label for="name">Nom</label>
        <input type="text" name="name" id="name" required>
      </div>
      <div class="contact__field">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
      </div>
      <div class="contact__field">
        <label for="message">Votre message</label>
        <textarea name="message" id="message" rows="3" required></textarea>
      </div>
      <div class="contact__submit">
        <input type="submit" value="Envoyer" class="button">
      </div>
    </form>

  `;
  return contactFormHTML;
}

export function displayContactForm(hide) {

  if (hide) {
    // display the modal
    document.querySelector('body').classList.remove('noscroll')
    document.querySelector('#Contact').style.display = 'none';
  } else {
    // display the modal
    document.querySelector('body').classList.add('noscroll')
    document.querySelector('#Contact').style.display = 'flex';
  }
}
