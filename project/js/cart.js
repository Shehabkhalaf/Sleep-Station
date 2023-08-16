let checkOutButton = document.getElementById("checkOut");
let footerTable = document.querySelectorAll(".tablefooternone");
// Storage Data
let listItems = getDataLocal();

// Get Data From Local Storage
function getDataLocal() {
    const products = JSON.parse(localStorage.getItem("products"));
    return products === null ? [] : products;
}

// Set Data In local Storage
function setDataLocal(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// Create All Products
function CreateProducts() {
    listItems.forEach((product) => createProduct(product));
}

// Create Product 
function createProduct(product) {
    let body = document.getElementById("body-table");
    // Create Element tr
    let tr = document.createElement("tr");
    // Add Attributes [Id]
    tr.setAttribute("id", product.id);
    tr.setAttribute("class", "mb-3");
    // Content Element
    tr.innerHTML = `
    <td>${product.title}, ${product.size}  ${product.color === "none" ? "" : ",color: "+product.color}</td>
    <td><input type="number" id="${product.id}" class="quantityNew" min="1" value="${product.quantity}"></td>
    <td class="priceproduct none" id="priceproduct">${product.discount}</td>
    <td><button id="${product.id}" class="remove">X</button></td>
`
    body.appendChild(tr);
    let footerTable = document.querySelectorAll(".footerNone");


    let quantityNew = document.querySelectorAll(".quantityNew")
    quantityNew.forEach(numberNew => {
        numberNew.addEventListener("change", (e) => {
            listItems.forEach(element => {
                if (element.id === +e.target.getAttribute("id")) {
                    element.quantity = +e.target.value;
                }
            })
            setDataLocal(listItems)
            let totalPrice = document.getElementById("totalPrice");
            let total = listItems.map(e => +e.quantity * +e.discount).reduce((acc, ele) => acc + ele);
            totalPrice.innerHTML = "EGP " + total;
            console.log(footerTable[1].querySelector(".totalPrice"))
            footerTable[1].querySelector(".totalPrice").innerHTML = "EGP " + (total + 60);
        })
    })

    // In Case Delete Element
    let remove = document.querySelectorAll(".remove");
    remove.forEach(item => {
        item.addEventListener("click", () => {
            listItems = listItems.filter(element => element.id !== +item.getAttribute("id"));
            [...body.children].forEach(element => {
                if (+element.getAttribute("id") === +item.getAttribute("id")) {
                    element.remove();
                }
            })
            setDataLocal(listItems);
            let totalPrice = document.getElementById("totalPrice");
            if (listItems.length === 0) {
                totalPrice.innerHTML = "EGP " + "0";
                footerTable.forEach(e => e.classList.add("tablefooternone"))
                checkOutButton.classList.add("checkNone");

            } else {
                let total = listItems.map(e => +e.quantity * +e.discount).reduce((acc, ele) => acc + ele);
                totalPrice.innerHTML = "EGP " + total;
                footerTable[1].querySelector(".totalPrice").innerHTML = "EGP " + (total + 60);
                checkOutButton.classList.remove("checkNone");
            }


        })
    })
}

CreateProducts()

let totalPrice = document.getElementById("totalPrice");
let total = listItems.map(e => +e.quantity * +e.discount);
total = total.length === 0 ? 0 : total.reduce((acc, ele) => acc + ele);
if (total > 0) {
    footerTable.forEach(e => console.log(e))
    footerTable.forEach(e => e.classList.remove("tablefooternone"));
    checkOutButton.classList.remove("checkNone");
    footerTable[1].querySelector(".totalPrice").innerHTML = "EGP " + (total + 60);
} else {
    checkOutButton.classList.add("checkNone");
    footerTable.forEach(e => e.classList.add("tablefooternone"))
}
totalPrice.innerHTML = "EGP " + total;