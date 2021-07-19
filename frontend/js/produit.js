import { formatPrice, APIURL, feedCart, getCart } from './functions.js';

document.addEventListener('DOMContentLoaded', function() {
    // Récupération de l'id produit en parsant l'url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const idProduit = urlSearchParams.get('produit')
    // Charger le produit
    getProduit(idProduit);
    feedCart();
    // Envoi du produit au panier
    document.querySelector('#cart').addEventListener('click', (event) => sendPanier(event, idProduit));
});
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
        
        // Récupération des options de couleur et ajout dans une liste radio
        product.colors.forEach( (color, index) => {
            const productColor = document.createElement("input");
            productColor.setAttribute('type','radio');
            productColor.setAttribute('id',color);
            productColor.setAttribute('name','couleur');
            productColor.setAttribute('value',color);
            if (index === 0) {
                productColor.setAttribute('checked',true);
            } 
            const colorLabel = document.createElement("label");
            colorLabel.setAttribute('for',color);
            colorLabel.innerHTML = color;
            document.querySelector('#choixCouleur').appendChild(productColor);
            document.querySelector('#choixCouleur').appendChild(colorLabel);
        });

    })
    .catch(function(err) {
        // Une erreur est survenue
    });
}

function sendPanier(event, idProduit) {
    // Permet d'empêcher la soumission du formulaire
    event.preventDefault();

    // Récupère le panier du localstorage
    let products = getCart();

    // Récupère la couleur à partir des boutons radio
    const color = document.querySelector('input[name="couleur"]:checked').value

    // Vérifie si la combinaison produit x couleur existe, si oui on augmente la quantité, sinon on crée une nouvelle entrée
    let product = products.filter(product => product.productId === idProduit && product.color === color);
    if (product.length === 1) {
        product = product[0];
        product.quantity++;
        products = products.filter(product => product.productId !== idProduit || product.color !== color);
    } else {
        product = {'productId' : idProduit, quantity : 1, color : color}
    }

    // On réalimente le localstorage avec le nouveau panier
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    feedCart();
    alert('Le produit a été ajouté au panier');
}

function removeProduct(idProduit){
    const color = document.querySelector('input[name="couleur"]:checked').value
    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.productId !== idProduit || product.color !== color);
    localStorage.setItem('products', JSON.stringify(products));
}