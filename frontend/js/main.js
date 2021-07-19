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

  // Add a list for the products
  const productList = document.createElement("ul");
  productList.setAttribute("id", "listeProduits");
  document.querySelector("main").appendChild(productList);

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
    document.querySelector("#listeProduits").appendChild(productId);
    document.querySelector(`#product-${product._id}`).appendChild(productName);
    document.querySelector(`#product-${product._id}`).appendChild(productPrice);
    document
      .querySelector(`#product-${product._id}`)
      .appendChild(productDescription);
    document.querySelector(`#product-${product._id}`).appendChild(productImage);
  }
}

function getProduit(idProduit) {
  fetch(APIURL + idProduit)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then((product) => {
      // Print products
      console.log(product);
      // Changement du titre de la page
      document.title = product.name + " | Orinoco";

      // Ajout d'un container pour le produit
      const productCard = document.createElement("section");
      productCard.setAttribute("id", "carteProduit");
      document.querySelector("main").appendChild(productCard);

      // Ajout d'un titre
      const productTitle = document.createElement("h1");
      productTitle.innerHTML = product.name;
      document.querySelector("#carteProduit").appendChild(productTitle);

      // Ajout du prix
      const productPrice = document.createElement("div");
      productPrice.innerHTML = `<strong> ${formatPrice(
        product.price
      )} </strong>`;
      document.querySelector("#carteProduit").appendChild(productPrice);

      // Ajout de la description
      const productDescription = document.createElement("div");
      productDescription.innerHTML = product.description;
      document.querySelector("#carteProduit").appendChild(productDescription);

      // Ajout de l'image
      const productImage = document.createElement("div");
      productImage.innerHTML = `<img src="${product.imageUrl}" alt="Image du produit" />`;
      document.querySelector("#carteProduit").appendChild(productImage);

      // Récupération des options de couleur et ajout dans une liste radio
      product.colors.forEach((color, index) => {
        const productColor = document.createElement("input");
        productColor.setAttribute("type", "radio");
        productColor.setAttribute("id", color);
        productColor.setAttribute("name", "couleur");
        productColor.setAttribute("value", color);
        if (index === 0) {
          productColor.setAttribute("checked", true);
        }
        const colorLabel = document.createElement("label");
        colorLabel.setAttribute("for", color);
        colorLabel.innerHTML = color;
        document.querySelector("#choixCouleur").appendChild(productColor);
        document.querySelector("#choixCouleur").appendChild(colorLabel);
      });
    })
    .catch(function (err) {
      // Une erreur est survenue
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
      .appendChild(itemQuantity);
    document
      .querySelector(`#item-${item.productId}-${item.color.replace(/\s/g, "")}`)
      .appendChild(itemColor);
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
