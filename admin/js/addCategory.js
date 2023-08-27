// URL API
const GET_DATA_CATEGORY = 'http://127.0.0.1:8000/api/admin/all_categories';
const ADD_CATEGORY = 'http://127.0.0.1:8000/api/admin/add_category';



// GET Elements
let nameCategory = document.getElementById("nameCategory");
let bodyTable = document.getElementById("tableBody");
let submit = document.getElementById("submit");


// Create Function Call DATA from Api
function callData() {
    // Call DATA From Api
    fetch(GET_DATA_CATEGORY).then(
        (result) => result.json()
    ).then(
        (dataApi) => {
            // Call function  Show Categories
            showCategories(dataApi.data)
        }
    )


    // Show Categories
    function showCategories(data) {
        bodyTable.innerHTML = ''
        // Add Categories In Dom
        data.forEach((user, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                        <td scope="col">${user.category_name}</td>
                        <td scope="col">${user.num_of_products}</td>
                        <td scope="col">
                        <button class="deleteColor delete me-2" data-colorId=${user.category_id}>delete</button>
                        </td>
                `
            bodyTable.append(tr)
        });
    }

}

// Call Function calData
callData();


// Send DATA To API
submit.addEventListener('submit', function (e) {
    if (nameCategory.value.trim()) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', nameCategory.value);
        formData.append('status', "active");
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/admin/add_category', true);
        xhr.send(formData);
        callData();
        nameCategory.value = '';
    }
});


// const log = JSON.parse(localStorage.getItem("log"));

// if(log !== true) {
//     window.location.href = 'index.html'
// }

