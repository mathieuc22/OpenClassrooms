document.addEventListener('DOMContentLoaded', function() {
    // Récupération de l'id produit en parsant l'url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const idProduit = urlSearchParams.get('produit')
    // Charger le produit
    getProduit(idProduit);
});

import { formatPrice, APIURL } from './functions.js';

function getProduit(idProduit) {

    fetch(APIURL + idProduit)
    .then(function(response) {
        if (response.ok) {
        return response.json();
        }
    })
    .then(product => {
        // Print products
        console.log(product);
        // Changement du titre de la page
        document.title = product.name + ' | Orinoco';

        // Ajout d'un container pour le produit
        const productCard = document.createElement("section");
        productCard.setAttribute("id", "carteProduit");
        document.querySelector('main').appendChild(productCard);

        // Ajout d'un titre
        const productTitle = document.createElement("h1");
        productTitle.innerHTML = product.name;
        document.querySelector('#carteProduit').appendChild(productTitle);

        // Ajout du prix
        const productPrice = document.createElement("div");
        productPrice.innerHTML = `<strong> ${formatPrice(product.price)} </strong>`;
        document.querySelector('#carteProduit').appendChild(productPrice);

        // Ajout de la description
        const productDescription = document.createElement("div");
        productDescription.innerHTML = product.description;
        document.querySelector('#carteProduit').appendChild(productDescription);
        
        // Ajout de l'image
        const productImage = document.createElement("div");
        productImage.innerHTML = `<img src="${product.imageUrl}" alt="Image du produit" />`;
        document.querySelector('#carteProduit').appendChild(productImage);
        
        // Récupération des options de couleur et ajout dans une liste
        const productColors = document.createElement("div");
        productColors.setAttribute("id", "choixCouleurs");
        productColors.innerHTML = "Couleurs :";
        document.querySelector('#carteProduit').appendChild(productColors);
        const colorsList = document.createElement("ul");
        colorsList.setAttribute("id", "listeCouleurs");
        document.querySelector('#choixCouleurs').appendChild(colorsList);
        for (const color of product.colors) {
            const productColor = document.createElement("li");
            productColor.innerHTML = color;
            document.querySelector('#listeCouleurs').appendChild(productColor);

        }


    })
    .catch(function(err) {
        // Une erreur est survenue
    });
}
