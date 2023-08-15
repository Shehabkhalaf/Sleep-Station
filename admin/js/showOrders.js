// Get Elements
let iconSearch = document.getElementById("iconSearch");
let bodyTable = document.getElementById("bodyTable");

// Call DATA From API
fetch("http://127.0.0.1:8000/api/admin/delivered_orders").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        // Call Function DataShow [TARGET: Add Data In Dom]
        showUsers(dataAll)
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
function showUsers(data) {
    bodyTable.innerHTML = ''
    // Add Product In Dom
    data.users.forEach((order, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                        <td scope="col">${order.name}</td>
                        <td scope="col">${order.email}</td>
                        <td scope="col">${order.phone}</td>
                        <td scope="col">${order.address}</td>
                        <td scope="col">${order.address}</td>
                `
        bodyTable.append(tr)
    });
}

// In Case User Writing In Input Search
function searchProduct(dataAll, value) {
    bodyTable.innerHTML = ''
    if (value === '') {
        showUsers(dataAll);
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

