import { formatPrice, APIURL, feedCart, getCart, deleteItem ,updateQuantity, getProduct, totalPrice } from './functions.js';

// Prévoir un switch case pour le main.js
document.addEventListener('DOMContentLoaded', function() {
    // Par défaut, chager le panier
    displayCart();
    feedCart();
});

async function displayCart() {

    // Récupère le panier du localstorage
    let items = getCart();

    for (const item of items) {

        // Récupère le produit de l'API
        const product = await getProduct(item.productId);

        // Construit les éléments html
        const cartItem = document.createElement("li");
        const itemName = document.createElement("div");
        const itemQuantity = document.createElement("input");
        const itemColor = document.createElement("div");
        const itemPrice = document.createElement("div");
        const itemDelete = document.createElement("button");

        cartItem.setAttribute("id", `item-${item.productId}-${item.color.replace(/\s/g, '')}`);
        itemName.innerHTML = product.name;
        itemPrice.setAttribute("id", `price-${item.productId}-${item.color.replace(/\s/g, '')}`);
        itemPrice.innerHTML = formatPrice(product.price * item.quantity);
        itemQuantity.setAttribute("id", `quantity-${item.productId}-${item.color.replace(/\s/g, '')}`);
        itemQuantity.setAttribute("type", "number");
        itemQuantity.setAttribute("min", 1);
        itemQuantity.setAttribute("value",item.quantity);
        itemColor.innerHTML = item.color;
        itemDelete.innerHTML = 'Supprimer';
        itemDelete.setAttribute("id", `delete-${item.productId}-${item.color.replace(/\s/g, '')}`);

        document.querySelector('#listePanier').appendChild(cartItem);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemName);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemQuantity);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemColor);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemPrice);
        document.querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, '')}`).appendChild(itemDelete);
        document.querySelector(`#delete-${item.productId}-${item.color.replace(/\s/g, '')}`).addEventListener('click', (event) => deleteItem(event, item.productId, item.color));
        document.querySelector(`#quantity-${item.productId}-${item.color.replace(/\s/g, '')}`).addEventListener('change', () => updateQuantity(item.productId, item.color, product.price));
        document.getElementById('prixTotal').innerHTML = `Total : ${await totalPrice()}`;
    }
}