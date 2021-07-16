// Constante de l'URL de l'API
export const APIURL='http://localhost:3000/api/teddies/';

// Formatage du prix en euros avec les décimales
export function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price/100);
}
