const products = JSON.parse(localStorage.getItem("products"));


console.log(products)
let listItems = products.map(element => {element.title , element.size , element.color , element.discount })


console.log(JSON.stringify(listItems))