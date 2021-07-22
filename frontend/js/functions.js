// Constante de l'URL de l'API
//const APIURL = "http://localhost:3000/api/teddies/";
const APIURL = "https://shrouded-meadow-70236.herokuapp.com/api/teddies/";

/**
 * Formatage du prix en euros avec les décimales
 * @param {number} price - Le montant à convertir.
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
}

/**
 * Récupération du panier depuis le localstorage
 */
export function getCart() {
  // Initie le tableau des produits du panier
  let products = [];
  // Parse le local storage
  if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
  }
  return products;
}

/**
 * Récupération des produits depuis l'API
 */
export async function getProducts() {
  try {
    const response = await fetch(APIURL);
    const products = await response.json();
    return products;
  } catch (err) {
    // Print products
    console.log(`Erreur : ${err}`);
    // Une erreur est survenue
    document.querySelectorAll("section").forEach(section => { section.style.display = "none" });
    const noProduct = document.createElement("div");
    noProduct.innerHTML = "Aucune référence n'a été trouvée";
    document.querySelector("main").appendChild(noProduct);
  }
}

/**
 * Récupération du produit depuis l'API
 * @param {string} productId - L'id du produit.
 */
export async function getProduct(productId) {
  try {
    const response = await fetch(APIURL + productId);
    const product = await response.json();
    return product;
  } catch (err) {
    // Print products
    console.log(`Erreur : ${err}`);
    // Une erreur est survenue
    document.querySelectorAll("section").forEach(section => { section.style.display = "none" });
    const noProduct = document.createElement("div");
    document.querySelector("main").appendChild(noProduct);
    noProduct.innerHTML = "Aucune référence n'a été trouvée";
  }
}

export function feedCart() {
  //Récupération du panier depuis localstorage
  const products = getCart();

  let nbElements = 0;
  for (const product of products) {
    nbElements += product.quantity;
  }

  document.getElementById("nbItems").innerHTML = nbElements;
}

// Récupération du prix total du panier
export async function totalPrice() {
  //Récupération du panier depuis localstorage
  const items = getCart();

  let totalPrice = 0;
  for (const item of items) {
    // Récupère le produit de l'API
    const product = await getProduct(item.productId);
    // On ajoute le prix au total du panier
    totalPrice += product.price * item.quantity;
  }

  return formatPrice(totalPrice);
}

export async function deleteItem(event, itemId, itemColor) {
  // Permet d'empêcher la soumission du formulaire
  event.preventDefault();

  // Récupère le panier du localstorage
  let products = getCart();

  // On filtre pour enlever l'élément sélectionné
  products = products.filter(
    (product) => product.productId !== itemId || product.color !== itemColor
  );

  // On réalimente le localstorage avec le nouveau panier
  localStorage.setItem("products", JSON.stringify(products));

  // Alimente la panier de l'en-tête
  feedCart();

  // Suppression de la ligne
  document
    .querySelector(`#item-${itemId}-${itemColor.replace(/\s/g, "")}`)
    .remove();

  // Mise à jour du prix total
  document.getElementById(
    "prixTotal"
  ).innerHTML = `Total : ${await totalPrice()}`;
}

export async function updateQuantity(itemId, itemColor, itemPrice) {
  // Récupère le panier du localstorage
  let products = getCart();

  // Vérifie si la combinaison produit x couleur existe, si oui on augmente la quantité, sinon on crée une nouvelle entrée
  let product = products.filter(
    (product) => product.productId === itemId && product.color === itemColor
  );
  if (product.length === 1) {
    product = product[0];
    product.quantity = parseInt(
      document.querySelector(
        `#quantity-${itemId}-${itemColor.replace(/\s/g, "")}`
      ).value
    );
    products = products.filter(
      (product) => product.productId !== itemId || product.color !== itemColor
    );
  }

  // On réalimente le localstorage avec le nouveau panier
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  // Alimente la panier de l'en-tête
  feedCart();

  // Mise à jour du prix de la ligne et du prix total
  document.querySelector(
    `#price-${itemId}-${itemColor.replace(/\s/g, "")}`
  ).innerHTML = formatPrice(itemPrice * product.quantity);
  document.getElementById(
    "prixTotal"
  ).innerHTML = `Total : ${await totalPrice()}`;
}

/**
 * Déclenchement de la commande
 * @param {event} event - Evenement de soumission du formulaire.
 */
export async function sendOrder(event) {
  // Permet d'empêcher la soumission du formulaire
  event.preventDefault();

  // Récupère le panier du localstorage
  let cart = getCart();
  let products = [];
  cart.forEach((item) => products.push(item.productId));

  // Récupération des éléments du formulaire
  const contactForm = new FormData(event.target);
  let contact = {};
  contactForm.forEach((value, key) => (contact[key] = value));

  // Récupération du montant total du panier
  let price = await totalPrice();

  fetch(APIURL + "order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then((order) => {
      window.open(`${window.location.href.replace('panier','confirmation')}?name=${contact.firstName}&price=${price}&order=${order.orderId}`, '_self'); 
    });
}

export function sendCart(event, idProduit) {
  // Permet d'empêcher la soumission du formulaire
  event.preventDefault();

  // Récupère le panier du localstorage
  let products = getCart();

  // Récupère la couleur à partir des boutons radio
  const color = document.querySelector('input[name="couleur"]:checked').value;

  // Vérifie si la combinaison produit x couleur existe, si oui on augmente la quantité, sinon on crée une nouvelle entrée
  let product = products.filter(
    (product) => product.productId === idProduit && product.color === color
  );
  if (product.length === 1) {
    product = product[0];
    product.quantity++;
    products = products.filter(
      (product) => product.productId !== idProduit || product.color !== color
    );
  } else {
    product = { productId: idProduit, quantity: 1, color: color };
  }

  // On réalimente le localstorage avec le nouveau panier
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  feedCart();
  alert("Le produit a été ajouté au panier");
}
