const products = JSON.parse(localStorage.getItem("products"));
const userData = JSON.parse(localStorage.getItem("userData"));



console.log(products)
let listItems = products.map(element => {element.title + "," + element.size + "," + element.color  + "," + element.discount });
let productss =[];

products.forEach(element => {
    productss.push({"product_id" : 2  ,"amount" : element.quantity })
});

let totalPrice = products.map(element =>element.discount).reduce((acc, ele) => acc + ele);

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