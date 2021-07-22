import {
  formatPrice,
  feedCart,
  getCart,
  getProducts,
  sendCart,
  deleteItem,
  updateQuantity,
  getProduct,
  totalPrice,
  sendOrder,
} from "./functions.js";

document.addEventListener("DOMContentLoaded", function () {
  // Récupération du nom de la page pour déclencher les bonnes fonctions
  const path = window.location.pathname;
  const page = path.split("/").pop();
  console.log(page);

  // Masque les sections avant le chargement des éléments
  document.querySelectorAll("section").forEach(section => { section.style.display = "none" });

  // Sélection des fonctions à exécuter en fonction de la page courante
  switch (page) {
    case "index.html":
      // Par défaut, chager la liste des produits
      getProduits();
      break;
    case "produit.html":
      // Récupération de l'id produit en parsant l'url
      const urlSearchParams = new URLSearchParams(window.location.search);
      const idProduit = urlSearchParams.get("produit");
      // Charger le produit
      getProduit(idProduit);
      // Envoi du produit au panier
      document
        .querySelector("#cart")
        .addEventListener("click", (event) => sendCart(event, idProduit));
      break;
    case "panier.html":
      // Par défaut, chager le panier
      displayCart();
      // Envoi de la commande
      document
        .querySelector("#contact")
        .addEventListener("submit", (event) => sendOrder(event));
      break;
  }

  // Notification du panier sur le header
  feedCart();

});

/**
 * Construction de la page d'accueil
 */
async function getProduits() {
  
  // Récupère le produit de l'API
  const products = await getProducts();

  setTimeout(() => {
    
    // Va chercher les infos tu top produit
    document.querySelector(".top-product__image").setAttribute("src", products[3].imageUrl);
    document.querySelector(".top-product__product").innerHTML= products[3].name;
    document.querySelector(".top-product__price").innerHTML= `<strong> ${formatPrice(products[3].price)} </strong>`;
    document.querySelector(".top-product__description").innerHTML= products[3].description;
  
    document.querySelector("#topProduct").style.display = 'flex';

    // Loop through the products
    for (const product of products) {
      // Create all products components for each product item
      const productId = document.createElement("li");
      const productImage = document.createElement("img");
      const productLink = document.createElement("a");
      const productName = document.createElement("div");
      const productPrice = document.createElement("div");
      // Add html content to all the product components
      productId.setAttribute("id", `product-${product._id}`);
      productId.setAttribute("class", "teddy fadein");
      productLink.setAttribute("id", `link-${product._id}`);
      productLink.setAttribute("class", "teddy__link");
      productLink.setAttribute("href", `/frontend/components/produit.html?produit=${product._id}`);
      productName.setAttribute("class", "teddy__title");
      productPrice.setAttribute("class", "teddy__price");
      productImage.setAttribute("class", "teddy__image");
      productImage.setAttribute("src", product.imageUrl);
      productImage.setAttribute("alt", `Image du produit ${product.name}`);
      productName.innerHTML = product.name;
      productPrice.innerHTML = `<strong> ${formatPrice(product.price)} </strong>`;
      // Add the items to the list
      document.querySelector("#listeProduits").appendChild(productId);
      document.querySelector(`#product-${product._id}`).appendChild(productImage);
      document.querySelector(`#product-${product._id}`).appendChild(productLink);
      document.querySelector(`#link-${product._id}`).appendChild(productName);
      document.querySelector(`#link-${product._id}`).appendChild(productPrice);
    }
    document.querySelectorAll("section").forEach(section => { section.removeAttribute('style') });
  }
  ,500);
  
}

/**
 * Construction de la page produit
 * @param {string} idProduit - L'id du produit.
 */
async function getProduit(idProduit) {
  // Récupère le produit de l'API
  const product = await getProduct(idProduit);

  // Print products
  console.log(product);
  // Changement du titre de la page
  document.title = product.name + " | Orinoco";

  setTimeout(() => {
    
    // Ajout des éléments du produit
    document.querySelector(".product__image").setAttribute("src",product.imageUrl);
    document.querySelector(".product__title").innerHTML = product.name;
    document.querySelector(".product__price").innerHTML = `<strong> ${formatPrice(product.price)} </strong>`;
    document.querySelector(".product__description").innerHTML = product.description;

    // Récupération des options de couleur et ajout dans une liste radio
    product.colors.forEach((color, index) => {
      const productColor = document.createElement("input");
      productColor.setAttribute("type", "radio");
      productColor.setAttribute("id", color.replace(/\s/g, ""));
      productColor.setAttribute("name", "couleur");
      productColor.setAttribute("value", color);
      if (index === 0) {
        productColor.setAttribute("checked", true);
      }
      const colorLabel = document.createElement("label");
      const colorSpan = document.createElement("span");
      colorLabel.setAttribute("id", `label-${color.replace(/\s/g, "")}`);
      colorLabel.setAttribute("for", color.replace(/\s/g, ""));
      colorSpan.innerHTML = color;
      document.querySelector("#choixCouleur").appendChild(colorLabel);
      document.querySelector(`#label-${color.replace(/\s/g, "")}`).appendChild(productColor);
      document.querySelector(`#label-${color.replace(/\s/g, "")}`).appendChild(colorSpan);
    })

    document.querySelectorAll("section").forEach(section => { section.removeAttribute('style') });

  }
  ,500);

}

/**
 * Construction de la page de panier d'achat
 */
async function displayCart() {

  // Récupère le panier du localstorage
  let items = getCart();

  // Pour chaque élément du panier on restitue une ligne avec le nom du produit, sa couleur, la quantité et le prix
  for (const item of items) {
    // Récupère le produit de l'API
    const product = await getProduct(item.productId);

    // Construit les éléments html
    const cartItem = document.createElement("li");
    const itemImage = document.createElement("img");
    const itemName = document.createElement("div");
    const itemQuantity = document.createElement("input");
    const itemPrice = document.createElement("div");
    const itemDelete = document.createElement("button");
    // Nouvel identifiant id + couleur
    const itemIdColor = `${item.productId}-${item.color.replace(/\s/g, "")}`

    // Définition des attributs des éléments html
    cartItem.setAttribute("id", `item-${itemIdColor}`);
    cartItem.setAttribute("class", "panier__item");
    itemImage.setAttribute("class", "panier__image");
    itemImage.setAttribute("src", product.imageUrl);
    itemImage.setAttribute("alt", `Image du produit ${product.name}`);
    itemName.setAttribute("class", "panier__name");
    itemName.innerHTML = `${product.name} - ${item.color}`;
    itemPrice.setAttribute("class", "panier__price");
    itemPrice.setAttribute("id",`price-${itemIdColor}`);
    itemPrice.innerHTML = formatPrice(product.price * item.quantity);
    itemQuantity.setAttribute("class", "panier__quantity");
    itemQuantity.setAttribute("id",`quantity-${itemIdColor}`);
    itemQuantity.setAttribute("type", "number");
    itemQuantity.setAttribute("min", 1);
    itemQuantity.setAttribute("value", item.quantity);
    itemDelete.setAttribute("class", "panier__delete far fa-trash-alt");
    itemDelete.setAttribute("id",`delete-${itemIdColor}`);
    
    // Construction de la ligne du panier
    document.querySelector("#listePanier").appendChild(cartItem);
    const itemElements = [itemImage, itemName, itemQuantity, itemPrice, itemDelete]
    itemElements.forEach( itemElement => {document.querySelector(`#item-${itemIdColor}`).appendChild(itemElement)});
    
    document
      .querySelector(
        `#delete-${itemIdColor}`
      )
      .addEventListener("click", (event) =>
        deleteItem(event, item.productId, item.color)
      );

    document
      .querySelector(
        `#quantity-${item.productId}-${item.color.replace(/\s/g, "")}`
      )
      .addEventListener("change", () =>
        updateQuantity(item.productId, item.color, product.price)
      );

    document.getElementById(
      "prixTotal"
    ).innerHTML = `Total : ${await totalPrice()}`;
    
  }

  document.querySelectorAll("section").forEach(section => { section.removeAttribute('style') });
}
