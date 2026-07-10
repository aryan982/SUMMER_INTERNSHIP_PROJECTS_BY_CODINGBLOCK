let products = [];

function searchProduct() {

    let search = document.getElementById("search").value;

    if (search == "") {
        alert("Please Enter Product Name");
        return;
    }

    let url = "https://dummyjson.com/products/search?q=" + search;

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        products = data.products;

        showProducts(products);

    });

}

function showProducts(list) {

    let box = document.getElementById("products");

    box.innerHTML = "";

    for (let i = 0; i < list.length; i++) {

       box.innerHTML +=
        "<div class='card'>" +
        "<img src='" + list[i].thumbnail + "'>" +
        "<h3>" + list[i].title + "</h3>" +
        "<p class='price'>Price : $" + list[i].price + "</p>" +
        "<p class='rating'>⭐ " + list[i].rating + "</p>" +
        "</div>";

    }

}

function sortProduct() {

    let value = document.getElementById("sort").value;

    if (value == "low") {
        products.sort(function(a, b) {
            return a.price - b.price;
        });

    }

    else if (value == "high") {
        products.sort(function(a, b) {
            return b.price - a.price;
        });

    }

    else if (value == "rating") {
        products.sort(function(a, b) {
            return b.rating - a.rating;
        });

    }
    showProducts(products);
}