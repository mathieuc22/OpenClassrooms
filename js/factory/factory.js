import { PhotographerDatabase } from "./photographer.js"
import { MediaDatabase } from "./media.js"

// file reference
const requestURL = 'FishEyeData.json';

/**
 * Media DB creation
 */
 export async function initMediasDB(photographerId) {
  // Get objects from the JSON
  const response = await fetch(requestURL)
  const json = await response.json();
  // Build the photographers DB
  const db = MediaDatabase()
  json.media.forEach(element => {
    if (element.photographerId === photographerId) {
      db.add(element);
    }
  });
  return db
}

/**
 * Photographers DB creation
 */
 export async function initPhotographersDB() {
  // Get objects from the JSON
  const response = await fetch(requestURL)
  const json = await response.json();
  // Build the photographers DB
  const db = PhotographerDatabase()
  json.photographers.forEach(element => {
    db.add(element);
  });
  return db
}