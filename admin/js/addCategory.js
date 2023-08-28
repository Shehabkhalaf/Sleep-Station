// URL API
const GET_DATA_CATEGORY = 'http://127.0.0.1:8000/api/admin/all_categories';
const ADD_CATEGORY = 'http://127.0.0.1:8000/api/admin/add_category';
const DELETE_CATEGORY = 'http://127.0.0.1:8000/api/admin/delete_category';



// GET Elements
let nameCategory = document.getElementById("nameCategory");
let nameCategoryArabic = document.getElementById("nameCategoryArabic");
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
}


// Show Categories
function showCategories(data) {
    bodyTable.innerHTML = ''
    // Add Categories In Dom
    data.forEach((user, index) => {
        let tr = document.createElement("tr");
        tr.setAttribute('id', user.category_id);
        tr.innerHTML = `
                        <td scope="col">${user.category_name}</td>
                        <td scope="col">${user.arabic_category_name}</td>
                        <td scope="col">${user.num_of_products}</td>
                        <td scope="col">
                        <button class="deleteColor delete me-2" data-colorId=${user.category_id}>delete</button>
                        </td>
                `
        bodyTable.append(tr)
    });

    document.querySelectorAll(".deleteColor").forEach(button => {
        button.addEventListener('click', (e) => {
            swal({
                title: "Are you sure you want to delete this category?",
                text: "This decision will lead to the deletion of products also related to this category",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("This category and all related products have been deleted", {
                            icon: "success",
                        });
                        document.getElementById(button.getAttribute("data-colorId")).remove();
                        const formData = new FormData();
                        formData.append('id', button.getAttribute("data-colorId"));
                        const xhr = new XMLHttpRequest();
                        xhr.open('POST', DELETE_CATEGORY, true);
                        xhr.send(formData);
                        callData();
                    } else {
                        swal("The deletion command has been undone");
                    }
                });
        })
    })
}


// Call Function calData
callData();


// Send DATA To API
submit.addEventListener('submit', function (e) {
    if (nameCategory.value.trim()) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', nameCategory.value);
        formData.append('arabic_title', nameCategoryArabic.value);
        formData.append('status', "active");
        const xhr = new XMLHttpRequest();
        xhr.open('POST', ADD_CATEGORY, true);
        xhr.send(formData);
        swal("A new category has been added successfully", "", "success");
        callData();
        nameCategory.value = '';
        nameCategoryArabic.value = '';
    }
});


// const log = JSON.parse(localStorage.getItem("log"));

// if(log !== true) {
//     window.location.href = 'index.html'
// }

