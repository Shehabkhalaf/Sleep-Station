// URL API
const urlApi = "json/da.json";

// Get Element
let sliderImages = document.getElementById("sliderImages");
let detailsContainer = document.getElementById("detailsContainer");


// Call Date
fetch(urlApi).then(
    (result) => result.json()
).then(
    (data) => {
        addProduct(data);
    }
)

// Add Products
function addProduct(data) {
    detailsContainer.innerHTML =  `
    <button class="buttonStyleBack" id="back-btnn"><i class="fa-solid fa-arrow-left"></i> Back To All
                Products</button>
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
                    <span id="chooseColor">${data.color.lenght > 0  ? data.color[0] : "white" }</span>
                </div>
                ${data.color.lenght > 0 ?
                `<ul class="mt-2 colors d-flex align-items-center">
                    ${data.color.map((colorType, index) => ` <li ${index===0 ? `class="active" `:""}
                        id="${colorType}"></li>
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
}

