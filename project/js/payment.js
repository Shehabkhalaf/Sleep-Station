const products = JSON.parse(localStorage.getItem("products"));



let listItems = products.map(element => {element.title , element.size , element.color , element.discount })


console.log(JSON.stringify(listItems))