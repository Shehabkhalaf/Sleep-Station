let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let password = document.getElementById('password');
let conPassword = document.getElementById('conPassword');
let address = document.getElementById('address');
let form = document.getElementById('submit');






form.addEventListener('submit', () => {
    const formData = new FormData(form);

    fetch('http://127.0.0.1:8000/api/user/register', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 201) {
                localStorage.setItem("data", JSON.stringify(data.data))
                location.href = "./products.html"
            }
        })
        .catch(error => {
            console.log(error);
        });

})