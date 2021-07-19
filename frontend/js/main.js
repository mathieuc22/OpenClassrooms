import { formatPrice, APIURL, feedCart, getProducts } from './functions.js';

document.addEventListener('DOMContentLoaded', function() {
    // Par défaut, chager la liste des produits
    getProduits();
    feedCart();
});

async function getProduits() {

    // Récupère le produit de l'API
    const products = await getProducts();

    // Add a list for the products
    const productList = document.createElement("ul");
    productList.setAttribute("id", "listeProduits");
    document.querySelector('main').appendChild(productList);

    // Loop through the products
    for (const product of products) {
        // Create all products components for each product item
        const productId = document.createElement("li");
        const productName = document.createElement("div");
        const productPrice = document.createElement("div");
        const productDescription = document.createElement("div");
        const productImage = document.createElement("div");
        // Add html content to all the product components
        productId.setAttribute("id", `product-${product._id}`);
        productName.innerHTML = `<a href="/frontend/components/produit.html?produit=${product._id}">${product.name}</a>`;
        productPrice.innerHTML = `<strong> ${formatPrice(product.price)} </strong>`;
        productDescription.innerHTML = `${product.description}`;
        productImage.innerHTML = `<img src="${product.imageUrl}" alt="Image du produit" />`;
        // Add the items to the list
        document.querySelector('#listeProduits').appendChild(productId);
        document.querySelector(`#product-${product._id}`).appendChild(productName);
        document.querySelector(`#product-${product._id}`).appendChild(productPrice);
        document.querySelector(`#product-${product._id}`).appendChild(productDescription);
        document.querySelector(`#product-${product._id}`).appendChild(productImage);
    }
}