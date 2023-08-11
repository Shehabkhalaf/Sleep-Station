

let email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    message = document.getElementById("message"),
    name = document.getElementById("name");



document.getElementById('submitButton').addEventListener('click', () => {
    document.getElementById('form').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('email', email.value);
        formData.append('phone', phone.value);
        formData.append('message', message.value);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/user/Contact_Us', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('تم تحميل الصورة بنجاح.');
            } else {
                console.log('فشل تحميل الصورة.');
            }
        };
        xhr.send(formData);
    });
})
