let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let password = document.getElementById('password');
let conPassword = document.getElementById('conPassword');
let form = document.getElementById('submit');
let buttonSubmit = document.getElementById('buttonSubmit');




buttonSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    const formData = new FormData(form);

    fetch('http://127.0.0.1:8000/api/user/login', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // if (data.success) {
            //     // Do something else after successful login
            // } else {
            //     // status.textContent = 'Login failed. Please try again.';
            // }
        })
        .catch(error => {
            status.textContent = 'An error occurred. Please try again later.';
        });
});


new WOW().init();


