// Call Data
let nameCategory = document.getElementById("nameCategory");
let bodyTable = document.getElementById("tableBody");
let submit = document.getElementById("submit");


// Create Function Call DATA from Api
function callData() {
    // Call DATA From Api
    fetch("http://127.0.0.1:8000/api/admin/all_categories").then(
        (result) => result.json()
    ).then(
        (dataApi) => {
            dataAll = dataApi.data;
            showCategories(dataAll)
        }
    )


    // Show Offers
    function showCategories(data) {
        bodyTable.innerHTML = ''
        // Add Product In Dom
        data.forEach((user, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                        <td scope="col">${user.category_name}</td>
                        <td scope="col">${user.nam_of_products}</td>
                `
            bodyTable.append(tr)
        });
    }

}

// Call Function calData
callData();


// Send DATA To API
submit.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', nameCategory.value);
    formData.append('status', "active");


    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/admin/add_category', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('تم تحميل الصورة بنجاح.');
        } else {
            console.log('فشل تحميل الصورة.');
        }
    };
    xhr.send(formData);
    callData();
});



