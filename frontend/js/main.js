document.addEventListener('DOMContentLoaded', function() {
    // Par défaut, chager la liste des produits
    GetProduits();
});

function GetProduits() {

    fetch('http://localhost:3000/api/furniture/')
    .then(function(response) {
        if (response.ok) {
        return response.json();
        }
    })
    .then(products => {
        // Print products
        console.log(products);
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
            productName.innerHTML = `<a href="components/produit.html?produit=${product._id}">${product.name}</a>`;
            productPrice.innerHTML = '<strong>' + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price) + '</strong>';
            productDescription.innerHTML = `${product.description}`;
            productImage.innerHTML = `<img src="${product.imageUrl}" alt="Image du produit" />`;
            // Add the items to the list
            document.querySelector('#listeProduits').appendChild(productId);
            document.querySelector('#' + `product-${product._id}`).appendChild(productName);
            document.querySelector('#' + `product-${product._id}`).appendChild(productPrice);
            document.querySelector('#' + `product-${product._id}`).appendChild(productDescription);
            document.querySelector('#' + `product-${product._id}`).appendChild(productImage);
        }
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
}