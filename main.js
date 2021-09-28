// file reference
const requestURL = 'FishEyeData.json';

document.addEventListener("DOMContentLoaded", function () {

  // By default, load Home
  Home()

});

async function Home() {
  // Show compose view and hide other views
  document.querySelector('#Home').style.display = 'block';
  document.querySelector('#Photographer').style.display = 'none';

  // Init the photographers database
  const photographers = await initPhotographersDB();

  // Build the html element for tags
  const tagsSection = document.createElement("div");
  tagsSection.setAttribute("id", "tags");
  tagsSection.innerHTML = createTagsListHTML(photographers.getTags())

  // Build the html element for photographers
  const photographersSection = document.createElement("div");
  photographersSection.setAttribute("id", "photographers");
  photographersSection.innerHTML = createPhotographersListHTML(photographers.get());

  // Build the page
  const home = document.querySelector("#Home")
  home.appendChild(tagsSection)
  home.appendChild(photographersSection)

  // Add link to the photographer page
  document.querySelectorAll("#tags li").forEach(tag => {
    tag.addEventListener("click", (event) => {
      // Build the section
      photographersSection.innerHTML = createPhotographersListHTML(photographers.getByTag(event.currentTarget.innerHTML));
    })
  })

  // Filter the photographers by selecting a tag
  document.querySelectorAll("#photographers li").forEach(tag => {
    tag.addEventListener("click", (event) => {
      // Build the section
      Photographer(photographers.getById(event.currentTarget.id))
    })
  })

}

function Photographer(photographer) {
  // Show compose view and hide other views
  document.querySelector('#Home').style.display = 'none';
  document.querySelector('#Photographer').style.display = 'block';

  const photographerSection = document.createElement('div')
  photographerSection.innerHTML = photographer.name

  const Section = document.querySelector("#Photographer")
  Section.appendChild(photographerSection)


}

/**
 * Photographers DB creation
 */
async function initPhotographersDB() {
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
 * Build the html list and inject it in the section
 * @param {list} photographersList - list of photographers
 * @return {string} - the html block
 */
 function createPhotographersListHTML(photographersList) {
  let PhotographersListHTML = ''
  for (const photographer of photographersList) {
    PhotographersListHTML = PhotographersListHTML + `
    <li id=${photographer.id}>
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
  return '<ul>' + PhotographersListHTML + `</ul>\n`
}

/**
 * Build the html TAGS list and inject it in the section
 * @param {list} tagsList - list of tags
 * @return {string} - the html block
 */
function createTagsListHTML(tagsList) {
  let tagsListHTML = ''
  tagsList.forEach(tag => {
    tagsListHTML = tagsListHTML + '<li>' + tag + '</li>'
  })
  return '<ul>' + tagsListHTML + `</ul>\n`
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
  function getById(photographerId) {
    return list.find( photographer => photographer.id === parseInt(photographerId));
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
    getById,
    getByName,
    getByTag,
    getTags
  }
}