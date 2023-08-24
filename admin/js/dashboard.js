// Total Orders
fetch("http://127.0.0.1:8000/api/admin/paid_orders").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        let count = 0;
        dataAll.forEach(element => count++);
        document.getElementById('totalOrders').innerHTML = count;
        let totalPrice = count === 0 ? 0 : dataAll.map(element => +element.price).reduce((acc, ele) => acc + ele);
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
        dataReverse = dataReverse.map((element, index) => {
            if (index < 4) {
                return element;
            }
        })
        console.log(dataReverse)
        showProducts(dataReverse)
    }
)



// Show Products
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


fetch("http://127.0.0.1:8000/api/admin/cash_orders").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        let listOrders = document.getElementById("listOrders");

        dataAll.forEach(element => {
            let div = document.createElement('div');
            div.setAttribute("class", "order" );
            div.setAttribute("id", element.id );

            div.innerHTML =
                `  
                <div>
                    <h4>User information</h4>
                    <p class="show">${element.user}</p>
                </div>
                <h4>Order Details</h4>
                <div class="row show">
                ${element.details.map((ele, index) => {
                    let arr = ele.splice(',');
                    `
                    <div class="col-lg-4 mt-3 mt-md-0">
                        <div>
                            <h3>Order : ${index + 1}</h3>
                            <p class="mb-1">Product Name : <span>${arr[0]}</span></p>
                            <p class="mb-1">Product Size : <span>${arr[1]}</span></p>
                            <p class="mb-1">Product  Color : <span>${arr[2]}</span></p>
                            <p class="mb-1">Product  Total : <span>${arr[3]}</span></p>
                            <p class="mb-1">Product Quantity : <span>${arr[4]}</span></p>
                        </div>
                    </div>
                    `
                }).join(" ")}
                </div>
                <div class="buttons mt-2 d-block ms-auto" style="width: fit-content;">
                    <button class="accept" data-idAccept=${element.id} >Accept</button>
                    <button class="rejected" data-idRejected=${element.id}>rejected</button>
                </div>
            `
        });
        document.querySelectorAll('.accept').forEach(element=>{
            element.addEventListener('click',()=>{
                let id = element.getAttribute("data-idAccept");
                const formData = new FormData();
                formData.append('id', id);
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://127.0.0.1:8000/api/admin/accept_order', true);
                xhr.send(formData);
                document.getElementById(id).remove();
            })
        })
    }
)