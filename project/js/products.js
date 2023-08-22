// URL API
const urlApi = "http://127.0.0.1:8000/api/user/products";

// Get Elements 
let categories = document.getElementById("categories");
let boxesProducts = document.getElementById("boxes");
let iconSearch = document.getElementById("iconSearch");


let productsLocal = JSON.parse(localStorage.getItem("products"));

document.getElementById("count").innerHTML = productsLocal === null ? 0 : productsLocal.length;



// Call Date
fetch(urlApi).then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        showCategories(dataAll);
        showProducts(dataAll)

        document.getElementById("apply").addEventListener("click", () => {
            choose.length === 0 ? showProducts(dataAll) : showProducts(dataAll, choose);
        })

        document.getElementById("search").addEventListener("input", (e) => {
            searchProduct(dataAll, e.target.value);
        })

        iconSearch.addEventListener("click", (e) => {
            search.value = "";
            showProducts(dataAll)
        })
    }
)


let choose = []


// Show Categories
function showCategories(data) {
    // Create Div 
    data.forEach((element, index) => {
        let div = document.createElement("div");
        div.setAttribute('class', "form-check")
        div.setAttribute('category_id', element.category_id)
        div.innerHTML = `
        <input class="form-check-input" type="checkbox" value=${element.category_name} id=${index}>
        <label class="form-check-label" for=${index}>
        ${element.category_name}
        </label> 
        `
        categories.appendChild(div)
    });

    let checkInput = document.querySelectorAll('input[type="checkbox"]');


    checkInput.forEach(element => {
        element.addEventListener("change", (e) => {
            if (choose.length === 0) {
                choose.push(e.target.value)
            } else {
                var check = choose.filter(ele => ele !== e.target.value);
                choose.length === check.length ? choose.push(e.target.value) : choose = check;
            }
        })
    });

}

// Show Products
function showProducts(data, choose = "") {
    boxesProducts.innerHTML = ''
    // Add Product In Dom
    data.forEach((product, index) => {
        if (choose === '') {
            addProduct(product);
        } else {
            choose.forEach(target => {
                if (product.category_name === target) {
                    addProduct(product);
                }
            })
        }
    });
}

// Add Product
function addProduct(product) {
    product.products.forEach(element => {
        // create div
        let div = document.createElement("div");
        // Add class
        div.setAttribute('class', "col-lg-5 mb-3")
        div.setAttribute('data-id', element.product_id)
        div.innerHTML = `
                <div class="box" data-product="box" data-category=${element.category_id} data-productId=${element.product_id}>
                    <div class="overflow-hidden">
                        <div class="image overflow-hidden" id="card" data-id="${element.id}">
                            <img src=${element.images[0]} class="card-img-top">
                        </div>
                        <div class="card-body">
                            <div class="title mb-2">
                                <h5>${element.product_name}</h5>
                            </div>
                            <div class="buttons">
                                <p class="price d-flex"><span class="me-1">EGP</span><span>${element.price[0]}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                `
        boxesProducts.appendChild(div)

        // Storage [category_id , product_id ] In LocalStorage untill Call product Details
        let allBoxes = document.querySelectorAll('[data-product="box"]');
        allBoxes.forEach(element => {
            element.addEventListener("click", (e) => {
                let category_id = element.getAttribute("data-category");
                let product_id = element.getAttribute("data-productId");
                // Set Data From Local Storage
                localStorage.setItem("productDetails", JSON.stringify({ 'category_id': category_id, "product_id": product_id }));
                // Go To Location Product Details
                location.href = 'product.html'
            })
        })
    })
}


// Search Product
function searchProduct(dataAll, value) {
    boxesProducts.innerHTML = ''
    if (value === '') {
        showProducts(dataAll);
    } else {
        dataAll.forEach((product, index) => {
            product.products.forEach(element => {
                if (element.product_name.toUpperCase().includes(value.toUpperCase())) {
                    // create div
                    let div = document.createElement("div");
                    // Add class
                    div.setAttribute('class', "col-lg-6 mb-3")
                    div.setAttribute('data-id', element.product_id)
                    div.innerHTML = `
                    <div class="box">
                        <div class="card overflow-hidden">
                            <div class="image overflow-hidden" id="card" data-id="${element.id}">
                                <img src=${element.images[0]} class="card-img-top">
                            </div>
                            <div class="card-body">
                                <div class="title mb-4">
                                    <h5>${element.product_name}</h5>
                                </div>
                                <div class="buttons d-flex justify-content-between align-items-center">
                                    <button type="button" id="addCard" data-id="${element.id}"
                                        class="btn btn-primary buttonStyle">Add to Card
                                    </button>
                                    <p class="price d-flex"><span class="me-1">EGP</span><span>${element.price[0]}</span></p>
                                </div>
                            </div>
                        </div>
                    <div>
                    `
                    boxesProducts.appendChild(div)
                }
            })
        })
    }
}


