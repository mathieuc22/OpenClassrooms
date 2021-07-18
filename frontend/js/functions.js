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

export async function feedPrice() {

    //Récupération du panier depuis localstorage
    const items = getCart();
    
    let totalPrice = 0;
    for (const item of items) {
        // Récupère le produit de l'API
        const product = await getProduct(item.productId);
        // On ajoute le prix au total du panier
        totalPrice += product.price * item.quantity;
    }

    document.getElementById('prixTotal').innerHTML = `Total : ${formatPrice(totalPrice)}`;
}

export function deleteItem(event, itemId, itemColor) {
    // Permet d'empêcher la soumission du formulaire
    event.preventDefault();

    // Récupère le panier du localstorage
    let products = getCart();

    // On filtre pour enlever l'élément sélectionné
    products = products.filter(product => product.productId !== itemId || product.color !== itemColor);

    // On réalimente le localstorage avec le nouveau panier
    localStorage.setItem('products', JSON.stringify(products));
    feedCart();

    document.querySelector(`#item-${itemId}-${itemColor.replace(/\s/g, '')}`).remove();
}

export function updateQuantity(itemId, itemColor, itemPrice) {

    // Récupère le panier du localstorage
    let products = getCart();

    // Vérifie si la combinaison produit x couleur existe, si oui on augmente la quantité, sinon on crée une nouvelle entrée
    let product = products.filter(product => product.productId === itemId && product.color === itemColor);
    if (product.length === 1) {
        product = product[0];
        product.quantity = parseInt(document.querySelector(`#quantity-${itemId}-${itemColor.replace(/\s/g, '')}`).value);
        products = products.filter(product => product.productId !== itemId || product.color !== itemColor);
    }

    // On réalimente le localstorage avec le nouveau panier
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    feedCart();
    feedPrice();
    
    // Mise à jour du prix
    document.querySelector(`#price-${itemId}-${itemColor.replace(/\s/g, '')}`).innerHTML = formatPrice(itemPrice * product.quantity);
    
}

export async function getProduct(productId) {
    // Récupération du produit depuis l'API
    const response = await fetch(APIURL + productId)
    const product = await response.json();
    return product;
}