

let iconSearch = document.getElementById("iconSearch");
let bodyTable = document.getElementById("bodyTable");


fetch("http://127.0.0.1:8000/api/admin/all_users").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        showUsers(dataAll)
        document.getElementById("numberOfUsers").innerHTML = dataAll.count;
        document.getElementById("search").addEventListener("input", (e) => {
            searchProduct(dataAll, e.target.value);
        })

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
    data.users.forEach((user, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                        <td scope="col">${user.name}</td>
                        <td scope="col">${user.email}</td>
                        <td scope="col">${user.phone}</td>
                        <td scope="col">${user.address}</td>
                `
        bodyTable.append(tr)
    });
}


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

