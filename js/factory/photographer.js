
/**
 * Factory creator for photographers database
 */
 export function PhotographerDatabase() {
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
