const productsLocal = JSON.parse(localStorage.getItem("products"));
const userData = JSON.parse(localStorage.getItem("userData"));



function Product(id, mount) {
    this.product_id = id;
    this.amount = mount;
}

let listItems = productsLocal.map(element => element.title + "," + element.size + "," + element.color + "," + element.discount);
let productss = [];

productsLocal.forEach(element => {
    var product = new Product(element.productId , element.quantity);
    productss.push(product);
});

let totalPrice = productsLocal.map(element => element.discount).reduce((acc, ele) => +acc + +ele);


let checkInput = document.querySelectorAll('input[type="radio"]');
let choose = 'cash';

checkInput.forEach(element => {
    element.addEventListener("change", (e) => {
        choose = e.target.value;
    })
});


let data = {
    token: userData.token,
    order_details: JSON.stringify(listItems),
    products: productss,
    total_price: totalPrice,
    paid_method: choose
};



let buttonCheckOut = document.getElementById("checkoutFinal");

buttonCheckOut.addEventListener("click", (e) => {

    var jsonData = JSON.stringify(data);
    fetch('http://127.0.0.1:8000/api/user/make_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${userData.token}`
        },
        body: jsonData
    }).then(response => response.json())
        .then(data => {
            if (data.status) {
                window.location.href = 'products.html'
            }
        })
        .catch(error => {
            console.log(error);
        });

})

