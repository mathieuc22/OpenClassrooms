import {
  formatPrice,
  APIURL,
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

async function getProduits() {
  // Récupère le produit de l'API
  const products = await getProducts();

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
    productId.setAttribute("class", "teddy");
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
}

async function getProduit(idProduit) {
  // Récupère le produit de l'API
  const product = await getProduct(idProduit);

  // Print products
  console.log(product);
  // Changement du titre de la page
  document.title = product.name + " | Orinoco";

  // Ajout de l'image
  //const productImage = document.createElement("div");
  //productImage.innerHTML = `<img src="${product.imageUrl}" alt="Image du produit ${product.name}" />`;
  //productImage.setAttribute("class", "product__image");
  //document.querySelector("#carteProduit").appendChild(productImage);
  document.querySelector(".product__image").setAttribute("src",product.imageUrl);

  // Ajout d'un titre
  //const productTitle = document.createElement("h1");
  //productTitle.innerHTML = product.name;
  // productTitle.setAttribute("class", "product__title");
  // document.querySelector("#carteProduit").appendChild(productTitle);
  document.querySelector(".product__title").innerHTML = product.name;

  // Ajout du prix
  // const productPrice = document.createElement("div");
  // productPrice.innerHTML = `<strong> ${formatPrice(
  //   product.price
  // )} </strong>`;
  // productPrice.setAttribute("class", "product__price");
  // document.querySelector("#carteProduit").appendChild(productPrice);
  document.querySelector(".product__price").innerHTML = `<strong> ${formatPrice(
    product.price
  )} </strong>`;

  // Ajout de la description
  // const productDescription = document.createElement("div");
  // productDescription.innerHTML = product.description;
  // productDescription.setAttribute("class", "product__description");
  // document.querySelector("#carteProduit").appendChild(productDescription);
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
  });
}

async function displayCart() {
  // Récupère le panier du localstorage
  let items = getCart();

  // Pour chaque élément du panier on restitue une ligne avec le nom du produit, sa couleur, la quantité et le prix
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

    cartItem.setAttribute(
      "id",
      `item-${item.productId}-${item.color.replace(/\s/g, "")}`
    );
    cartItem.setAttribute("class", "panier__item")
    itemName.innerHTML = product.name;
    itemPrice.setAttribute(
      "id",
      `price-${item.productId}-${item.color.replace(/\s/g, "")}`
    );
    itemPrice.innerHTML = formatPrice(product.price * item.quantity);
    itemQuantity.setAttribute(
      "id",
      `quantity-${item.productId}-${item.color.replace(/\s/g, "")}`
    );
    itemQuantity.setAttribute("type", "number");
    itemQuantity.setAttribute("min", 1);
    itemQuantity.setAttribute("value", item.quantity);
    itemColor.innerHTML = item.color;
    itemDelete.innerHTML = "Supprimer";
    itemDelete.setAttribute(
      "id",
      `delete-${item.productId}-${item.color.replace(/\s/g, "")}`
    );

    document.querySelector("#listePanier").appendChild(cartItem);
    document
      .querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, "")}`)
      .appendChild(itemName);
    document
      .querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, "")}`)
      .appendChild(itemColor);
    document
      .querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, "")}`)
      .appendChild(itemQuantity);
    document
      .querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, "")}`)
      .appendChild(itemPrice);
    document
      .querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, "")}`)
      .appendChild(itemDelete);
    document
      .querySelector(
        `#delete-${item.productId}-${item.color.replace(/\s/g, "")}`
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
}
