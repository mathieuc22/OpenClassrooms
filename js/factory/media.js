/**
 * Factory creator for media database
 */
 export function MediaDatabase() {
  let list = []
  function add(objectFromJSON) {
    list.push({
      id: objectFromJSON.id || 0,
      photographerId: objectFromJSON.photographerId || 0,
      title: objectFromJSON.title || '',
      image: objectFromJSON.image || '',
      tags: objectFromJSON.tags || '',
      likes: objectFromJSON.likes || 0,
      date: objectFromJSON.date || '',
      price: objectFromJSON.price || 0,
    });
  }
  function get(){
    return [...list];
  }
  function getById(mediaId) {
    return list.find( media => media.id === parseInt(mediaId));
  }
  function getByTag(tag) {
    return list.filter( media => media.tags.includes(tag));
  }
  function getTags() {
    let tags = []
    list.forEach(media => tags = [...tags, ...media.tags])
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
    getByTag,
    getTags
  }
}