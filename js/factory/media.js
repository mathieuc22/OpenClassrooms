/**
 * Media method
 */
const Media = function (attributes) {

  if (attributes.image) {
    this.type = 'image'
    this.url = attributes.image
  } else {
    this.type = 'video'
    this.url = attributes.video
  }

  this.id = attributes.id || 0;
  this.photographerId = attributes.photographerId || 0;
  this.title = attributes.title || '';
  this.tags = attributes.tags || '';
  this.likes = attributes.likes || 0;
  this.date = attributes.date || '';
  this.price = attributes.price || 0;

}

/**
 * Factory creator for media database
 */
export function MediaDatabase() {
  let list = []
  function add(objectFromJSON) {
    const element = new Media(objectFromJSON);
    list.push(element);
  }
  function get(sortParam){
    switch (sortParam) {
      case 'title':
        return [...list].sort((a,b) =>  (a.title > b.title ? 1 : -1));
        break;
      case 'likes':
        return [...list].sort((a,b) =>  (b.likes - a.likes));
        break;
      case 'date':
        return [...list].sort((a,b) =>  (a.date > b.date ? -1 : 1));
        break;
      default:
        return [...list];
    }
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