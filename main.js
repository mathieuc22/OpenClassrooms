// file reference
const requestURL = 'FishEyeData.json';

document.addEventListener("DOMContentLoaded", async function () {

  const section = document.querySelector('section');
  const photographers = await getPhotographers();

  // Build the html element for tags
  const tags = photographers.getTags()
  let htmlTAGS = ''
  tags.forEach(tag => {
    htmlTAGS = htmlTAGS + '<li>#' + tag + '</li>'
  })
  htmlTAGS = '<ul>' + htmlTAGS + `</ul>\n`

  // Build the html list and inject it in the section
  let htmlLIST = ''
  for (const photographer of photographers.get()) {
    htmlLIST = htmlLIST + `
    <li>
      <img
        src="img/${photographer.portrait}"
        alt="Photo of ${photographer.name}"
        height="200" >
      <div>${photographer.name}</div>\n
      <div>${photographer.country}, ${photographer.city}</div>\n
      <div>${photographer.tagline}</div>\n
      <div>${photographer.price}€/jour</div>\n
      <div>${photographer.tags}</div>\n
    </li>
    `;
  }
  htmlLIST = '<ul>' + htmlLIST + `</ul>\n`

  section.innerHTML = htmlTAGS + htmlLIST

});

/**
 * Photographers DB creation
 */
async function getPhotographers() {
  // Get objects from the JSON
  const response = await fetch(requestURL)
  const json = await response.json();
  // Build the photographers DB
  const db = Database()
  json.photographers.forEach(element => {
    db.add(element);
  });
  return db
}

/**
 * Factory creator for photographers database
 */
function Database() {
  let list = []
  function add(objectFromJSON) {
    list.push({
      name: objectFromJSON.name || '',
      id: objectFromJSON.id || 0,
      city: objectFromJSON.city || '',
      country: objectFromJSON.country || '',
      tags: objectFromJSON.tags || [],
      tagline: objectFromJSON.tagline || '',
      price: objectFromJSON.price || 0,
      portrait: objectFromJSON.portrait || '',
    });
  }
  function get(){
    return [...list];
  }
  function getByName(photographerName) {
    return list.find( photographer => photographer.name === photographerName);
  }
  function getByTag(tag) {
    return list.filter( photographer => photographer.tags.includes(tag));
  }
  function getTags() {
    let tags = []
    list.forEach(photographer => tags = [...tags, ...photographer.tags])
    return [...new Set([...tags])];
  }
  function clear(){
    list = [];
  }
  return {
    add,
    clear,
    get,
    getByName,
    getByTag,
    getTags
  }
}