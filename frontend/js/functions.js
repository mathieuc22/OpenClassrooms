// Constante de l'URL de l'API
export const APIURL='http://localhost:3000/api/teddies/';

// Formatage du prix en euros avec les décimales
export function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price/100);
}

export function getCart() {
    // Initie le tableau des produits du panier
    let products = [];

    // Parse le local storage
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }

    return products;
}

export function feedCart() {

    const products = getCart();

    let nbElements = 0;
    for (const product of products) {
        nbElements += product.quantity;
    }

    document.getElementById('nbItems').innerHTML = nbElements;
}