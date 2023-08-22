// Total Orders
fetch("http://127.0.0.1:8000/api/admin/paid_orders").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        let count = 0;
        dataAll.forEach(element => count++);
        document.getElementById('totalOrders').innerHTML = count;
        let totalPrice = count === 0 ? 0 : dataAll.map(element=>+element.price).reduce((acc,ele)=> acc + ele);
        document.getElementById('totalPrice').innerHTML = '$' + totalPrice;
    }
)


// Total Users
fetch("http://127.0.0.1:8000/api/admin/all_users").then(
    (result) => result.json()
).then(
    (dataApi) => {
        let count = dataApi.data.count;
        document.getElementById('totalUsers').innerHTML = count;
    }
)


// Total Products
fetch("http://127.0.0.1:8000/api/admin/all_products").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        let count = 0;
        dataAll.forEach(element => count++);
        document.getElementById('totalProduct').innerHTML = count;
    }
)


let bodyTable = document.getElementById("bodyTable");


fetch("http://127.0.0.1:8000/api/admin/all_products").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        // Call Function DataShow [TARGET: Add Data In Dom]
        let dataReverse = dataAll.reverse();
        dataReverse = dataReverse.map((element,index) => {
            if(index < 4) {
                return element;
            }
        })
        console.log(dataReverse)
        showProducts(dataReverse)
    }
)



// // Show Products
function showProducts(data) {
    bodyTable.innerHTML = ''
    // Add Product In Dom
    data.forEach((product, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                        <td scope="col">${product.product_name}</td>
                        <td scope="col">${product.category_name}</td>
                        <td scope="col">${product.stock}</td>
                        <td scope="col">
                        <ul>
                        ${product.price.map((price) => `
                        <li>${price}</li>
                        `
                        ).join(" ")}
                        </ul>
                        </td>
                        <td scope="col">
                        <ul>
                        ${product.discount.map((discount) => `
                        <li>${discount}</li>
                        `
        ).join(" ")}
                        </ul>
                        </td>
                `
        bodyTable.append(tr)
    });
}
