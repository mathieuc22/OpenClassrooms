import { formatPrice, APIURL, feedCart, getCart } from './functions.js';

document.addEventListener('DOMContentLoaded', function() {
    // Par défaut, chager le panier
    getPanier();
    feedCart();
});

function getPanier() {

    // Récupère le panier du localstorage
    let items = getCart();

    for (const item of items) {

        const cartItem = document.createElement("li");
        const itemName = document.createElement("div");
        const itemQuantity = document.createElement("div");
        const itemColor = document.createElement("div");
        const itemPrice = document.createElement("div");

        fetch(APIURL + item.productId)
        .then(function(response) {
            if (response.ok) {
            return response.json();
            }
        })
        .then(product => {
            // Print products
            console.log(product);
            // Get product name and price
            itemName.innerHTML = product.name;
            itemPrice.innerHTML = formatPrice(product.price * item.quantity);
        })
        .catch(function(err) {
            // Une erreur est survenue
        });

        cartItem.setAttribute("id", `item-${item.productId}-${item.color.replace(/\s/g, '')}`);
        itemQuantity.innerHTML = item.quantity;
        itemColor.innerHTML = item.color;
        document.querySelector('#listePanier').appendChild(cartItem);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemName);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemQuantity);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemColor);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemPrice);
    }
}