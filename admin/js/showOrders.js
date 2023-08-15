// Get Elements
let iconSearch = document.getElementById("iconSearch");
let bodyTable = document.getElementById("bodyTable");

// Call DATA From API
fetch("http://127.0.0.1:8000/api/admin/paid_orders").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        // Call Function DataShow [TARGET: Add Data In Dom]
        showOrders(dataAll)
        // ADD Count Orders 
        document.getElementById("numberOfUsers").innerHTML = dataAll.count;
        // Search Order
        document.getElementById("search").addEventListener("input", (e) => {
            searchOrders(dataAll, e.target.value);
        })

        // Cancel Seacrh
        iconSearch.addEventListener("click", (e) => {
            search.value = "";
            showOrders(dataAll)
        })
    }
)



// // Show Orders
function showOrders(data) {
    bodyTable.innerHTML = ''
    // Add Order In Dom
    data.forEach((order, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                        <td scope="col">${order.order_id}</td>
                        <td scope="col">${order.user}</td>
                        <td scope="col">
                        <ul>
                        ${product.price.map((price) => `
                        <li>${price}</li>
                        `
                        ).join(" ")}
                        </ul>
                        </td>
                        <td scope="col">${order.price}</td>
                        <td scope="col">${order.ordered_at}</td>
                `
        bodyTable.append(tr)
    });
}

// In Case User Writing In Input Search
function searchOrders(dataAll, value) {
    bodyTable.innerHTML = ''
    if (value === '') {
        showOrders(dataAll);
    } else {
        dataAll.users.forEach((user, index) => {
            if (user.name.toUpperCase().includes(value.toUpperCase())) {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                            <td scope="col">${user.name}</td>
                            <td scope="col">${user.email}</td>
                            <td scope="col">${user.phone}</td>
                            <td scope="col">${user.address}</td>
                    `
                bodyTable.append(tr)
            }
        });
    }
}

