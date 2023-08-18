const products = JSON.parse(localStorage.getItem("products"));
const userData = JSON.parse(localStorage.getItem("userData"));



function Product(id, mount) {
    this.product_id = id;
    this.amount = mount;
}

let listItems = products.map(element => element.title + "," + element.size + "," + element.color  + "," + element.discount );
let productss =[];

products.forEach(element => {
    var product = new Product(3,  element.quantity);
    productss.push(product);
});

let totalPrice = products.map(element =>element.discount).reduce((acc, ele) => +acc + +ele);

console.log(JSON.stringify(listItems))



const formData = new FormData();
formData.append('token', userData.token);
formData.append('order_details', JSON.stringify(listItems))
formData.append('products', productss)
formData.append('total_price', totalPrice)
formData.append('paid_method', "cash")

fetch('http://127.0.0.1:8000/api/user/make_order', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${userData.token}`
    },
    body: formData
})
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            localStorage.setItem("userData", JSON.stringify(data.data));
            window.location.href = 'products.html'
        }
    })
    .catch(error => {
        console.log(error);
    });