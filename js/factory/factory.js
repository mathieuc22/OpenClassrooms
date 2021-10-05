import { PhotographerDatabase } from "./photographer.js"
import { MediaDatabase } from "./media.js"

import json from "../../assets/FishEyeData.json"

// file reference
const requestURL = 'FishEyeData.json';

/**
 * Media DB creation
 */
 export function initMediasDB(photographerId) {
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
 export function initPhotographersDB() {
  // Build the photographers DB
  const db = PhotographerDatabase()
  json.photographers.forEach(element => {
    db.add(element);
  });
  return db
}