const URL = 'http://127.0.0.1:8000';
// Get Product_id and Category_id From LocalStorage
const productDetails = JSON.parse(localStorage.getItem("productDetails"));
const productId = +productDetails.product_id;
const categoryId = +productDetails.category_id;

// URL API
const urlApi = `http://127.0.0.1:8000/api/user/show_product/${productId}`;
const urlApiAllData = "http://127.0.0.1:8000/api/user/products";






// Get Element
let sliderImages = document.getElementById("sliderImages");
let detailsContainer = document.getElementById("detailsContainer");
let boxesProducts = document.getElementById("boxes");


// Call Date
fetch(urlApi).then(
    (result) => result.json()
).then(
    (data) => {
        console.log(data.data);
        let x = data.data.color
        console.log(x) 
        addProduct(data.data);
    }
)

// Add Products

function addProduct(data) {
    sliderImages.innerHTML = `
        ${data.image.map((img, index) => ` <div ${index === 0 ? `class="carousel-item active" ` : "carousel-item"}>
            <img src=${URL}${data.img} class="d-block" alt="...">
        </div>
        `).join(" ")}
    `
    detailsContainer.innerHTML = `
            <a href="./products.html" class="buttonStyleBack" id="back-btnn"><i class="fa-solid fa-arrow-left"></i> Back To All Products</a>
            <h2 class="mt-5">${data.product_name}</h2>
            <p class="price" id="discountP">EGP ${data.discount[0]} <del id="priceDel">EGP
                    ${data.price[0]}</del></p>
            <div class="description">${data.description}</div>
            <div class="form">
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <div class="qty">
                            <label for="">Quantity</label>
                            <input type="number" min="1" id="quantity" value="1">
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="select">
                            <label for="">size</label>
                            <select class="form-select" id="selected" aria-label="Default select example">
                                ${data.size.map((sizetype, index) => `<option value="${index}">${sizetype}
                                </option>
                                `).join(" ")}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="color mt-2 d-flex">
                    <span>color:</span>
                    <span id="chooseColor">${data.color.lenght > 0 ? data.color[0] : "white"}</span>
                </div>
                ${data.color.lenght > 0 ?
            `<ul class="mt-2 colors d-flex align-items-center">
                    ${data.color.map((colorType, index) => ` <li ${index === 0 ? `class="active" ` : ""}
                        id="${colorType.split("|")[1]}" style="background-color: ${colorType.split("|")[0]} ;"></li>
                    `).join(" ")}
                </ul>`
            : ""}
            </div>
            <button class="buttonStyle add-card mt-5" id="addCardd">Add To Cart <i
                    class="fa-solid fa-cart-shopping"></i></button>
            <div class="icon">
                <img src="images/icon.avif" class="img-size img-fluid">
            </div>
    
    `

    // Change Price 
    let quantity = document.getElementById("quantity");
    quantity.addEventListener("change", (number) => {
        if (number.target.value > 0) {
            document.getElementById("discountP").innerHTML = "EGP " + (+number.target.value * data.discount[0]) + `<del id="priceDel">EGP ${+number.target.value * data.price[0]}</del>`;
        }
    })

    let selected = document.getElementById("selected");
    selected.addEventListener("change", (select) => {
        console.log(+selected.value)
        console.log(+quantity.value)
        document.getElementById("discountP").innerHTML = "EGP " + (+quantity.value * data.discount[+selected.value]) + `<del id="priceDel">EGP ${+quantity.value * data.price[+selected.value]}</del>`;
    })
}


// Call Date
fetch(urlApiAllData).then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        showProducts(dataAll)
    }
)

// Show Products
function showProducts(data) {
    boxesProducts.innerHTML = ''
    // Add Product In Dom
    data.forEach((product) => {
        if (product.category_id === categoryId) {
            addProducts(product);
        }
    });
}


// // Add Product
function addProducts(product) {
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
                            <img src=${URL}${element.images[0]} class="card-img-top">
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





