// Get Elements
let iconSearch = document.getElementById("iconSearch");
let bodyTable = document.getElementById("bodyTable");

// Call DATA From API
fetch("http://127.0.0.1:8000/api/admin/all_products").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        // Call Function DataShow [TARGET: Add Data In Dom]
        showProducts(dataAll)
        // ADD Count Users 
        document.getElementById("numberOfUsers").innerHTML = dataAll.count;
        // Search User
        document.getElementById("search").addEventListener("input", (e) => {
            searchProduct(dataAll, e.target.value);
        })
        // Cancel Seacrh
        iconSearch.addEventListener("click", (e) => {
            search.value = "";
            showProducts(dataAll)
        })
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
                        <td scope="col">${product.description}</td>
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
                        <td scope="col">
                        <ul>
                        ${product.size.map((size) => `
                        <li>${size}</li>
                        `
                        ).join(" ")}
                        </ul>
                        </td>
                        <td scope="col">
                        <ul>
                        ${product.color.map((color) => `
                        <li>${color.split("|")[1]}</li>
                        `
                        ).join(" ")}
                        </ul>
                        </td>
                `
        bodyTable.append(tr)
    });
}

// In Case User Writing In Input Search
function searchProduct(dataAll, value) {
    bodyTable.innerHTML = ''
    if (value === '') {
        showProducts(dataAll);
    } else {
        dataAll.forEach((product, index) => {
            if (product.name.toUpperCase().includes(value.toUpperCase())) {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                <td scope="col">${product.product_name}</td>
                <td scope="col">${product.category_name}</td>
                <td scope="col">${product.description}</td>
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
                <td scope="col">
                <ul>
                ${product.size.map((size) => `
                <li>${size}</li>
                `
                ).join(" ")}
                </ul>
                </td>
                <td scope="col">
                <ul>
                ${product.color.map((color) => `
                <li>${color.split("|")[1]}</li>
                `
                ).join(" ")}
                </ul>
                </td>
        `
                bodyTable.append(tr)
            }
        });
    }
}

