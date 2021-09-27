// file reference
const requestURL = 'FishEyeData.json';

document.addEventListener("DOMContentLoaded", async function () {

  const section = document.querySelector('section');
  const DB = await getPhotographers();

  // Build the html list and inject it in the section
  let html = ''
  for (const photographer of DB) {
    console.log(typeof(photographer))
    html = html + `
    <li>
      <img
        src="img/${photographer.portrait}"
        alt="Photo of ${photographer.name}"
        height="200" >
      ${photographer.name} - ${photographer.country}/${photographer.city}\n
    </li>
    `;
  }
  section.innerHTML = '<h1>Photographers</h1>\n<ul>' + html + '</ul>'

});

/**
 * Photographers DB creation
 */
async function getPhotographers() {
  // Get objects from the JSON
  const response = await fetch(requestURL)
  const json = await response.json();
  // Build the photographers DB
  let DB = []
  json.photographers.forEach(element => {
    DB.push(element)
  });
  return DB
}

/**
 * Factory creator for photographers
 * @param {object} objectFromJSON - un objet du fichier JSON.
 */
function createPhotographer(objectFromJSON) {
  return {
    name: object.name || '',
    id: object.id || 0,
    city: object.city || '',
    country: object.country || '',
    tags: object.tags || [],
    tagline: object.tagline || '',
    price: object.price || 0,
    portrait: object.portrait || '',
  };
}