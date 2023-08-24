const log = JSON.parse(localStorage.getItem("log"));

if(log !== true) {
    window.location.href = 'index.html'
}

// Get Elements
let promo = document.getElementById("promo");
let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let discount = document.getElementById("discount");
let bodyTable = document.getElementById("bodyTable");

// Create Function Call DATA from Api
function callData() {
    // Call DATA From Api
    fetch("http://127.0.0.1:8000/api/admin/all_offers").then(
        (result) => result.json()
    ).then(
        (dataApi) => {
            dataAll = dataApi.data;
            showPromoCode(dataAll)
        }
    )


    // Show Offers
    function showPromoCode(data) {
        bodyTable.innerHTML = ''
        // Add Product In Dom
        data.forEach((user, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                        <td scope="col">${user.promocode}</td>
                        <td scope="col">${user.discount}</td>
                        <td scope="col">${user.started_at}</td>
                        <td scope="col">${user.expired_at}</td>
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
    formData.append('promocode', promo.value);
    formData.append('started_at', startDate.value);
    formData.append('expired_at', endDate.value);
    formData.append('discount', discount.value);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/admin/add_offer', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Done');
        } else {
            console.log('faild');
        }
    };
    xhr.send(formData);
    callData();
});