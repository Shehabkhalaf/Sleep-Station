


let nameCategory = document.getElementById("nameCategory");

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
});




// fetch("http://127.0.0.1:8000/api/admin/all_categories").then(
//     (result) => result.json()
// ).then(
//     (dataApi) => {
//         dataAll = dataApi.data;
//         console.log(dataApi)
//     }
// )