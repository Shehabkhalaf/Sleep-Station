let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let password = document.getElementById('password');
let conPassword = document.getElementById('conPassword');
let address = document.getElementById('address');
let form = document.getElementById('submit');




form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email',email.value);
    formData.append('phone', phone.value);
    formData.append('password', password.value);
    formData.append('address',address.value);



    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/user/register', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('تم تحميل الصورة بنجاح.');
        } else {
            console.log('فشل تحميل الصورة.');
        }
    };
    xhr.send(formData);
});


new WOW().init();

