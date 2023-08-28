
// URL API
const UPDATE_DATA = 'http://127.0.0.1:8000/api/user/update';

// USER SIGNIN OR NOT
const status = JSON.parse(localStorage.getItem("sign_done"));

// IN CASE NOT SIGN
const header1 = `
<div class="container">
    <div class="logo">
        <a href="./index.html">
            <img src="./images/logo/logo.png" alt="">
        </a>
    </div>
    <div class="btn-group mb-3 smallNone" role="group">
        <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="./images/language-icon/united-states-of-america.png"> EN
        </button>
        <ul class="dropdown-menu">
            <li class="arabic"><a href="./homeArabic.html"><img src="./images/language-icon/egypt.png">
                    AR</a> </li>
            <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                    EN</a> </li>
        </ul>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="./products.html">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./contact.html">Contact Us</a>
            </li>
        </ul>
        <div class="btn-group mb-3 bigNone" role="group">
            <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="./images/language-icon/united-states-of-america.png"> EN
            </button>
            <ul class="dropdown-menu">
                <li class="arabic"><a href="./profile_updata_arabic"><img src="./images/language-icon/egypt.png">
                        AR</a> </li>
                <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                        EN</a> </li>
            </ul>
        </div>
        <a href="./cart.html" class="icon" id="cartIcon">
            <span class="count" id="count">0</span>
            <i class="fa-solid fa-cart-plus"></i>
        </a>
        <a href="./signup.html" class="signup">Sign Up</a>
    </div>
</div>
`
// IN CASE  SIGN
const header2 = `
<div class="container">
    <div class="logo">
        <a href="./products.html">
            <img src="./images/logo/logo.png" alt="">
        </a>
    </div>
    <div class="btn-group mb-3 smallNone" role="group">
        <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="./images/language-icon/united-states-of-america.png"> EN
        </button>
        <ul class="dropdown-menu">
            <li class="arabic"><a href="./homeArabic.html"><img src="./images/language-icon/egypt.png">
                    AR</a> </li>
            <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                    EN</a> </li>
        </ul>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./products.html">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./contact.html">Contact Us</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="./profileUser.html">My Account</a>
            </li>
        </ul>
        <div class="btn-group mb-3 bigNone" role="group">
            <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="./images/language-icon/united-states-of-america.png"> EN
            </button>
            <ul class="dropdown-menu">
                <li class="arabic"><a href="./profile_updata_arabic.html"><img src="./images/language-icon/egypt.png">
                        AR</a> </li>
                <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                        EN</a> </li>
            </ul>
        </div>
        <a href="./cart.html" class="icon" id="cartIcon">
            <span class="count" id="count">0</span>
            <i class="fa-solid fa-cart-plus"></i>
        </a>
    </div>
</div>
`

if (status !== true) {
    document.getElementById('nav').innerHTML = header1;
} else {
    document.getElementById('nav').innerHTML = header2;
}


// WOW Js
new WOW().init();

// Get Elements
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let locationInput = document.getElementById("location");
let phoneInput = document.getElementById("phone");


// Get DATA From localstorage
let products = JSON.parse(localStorage.getItem("products"));
let dataUser = JSON.parse(localStorage.getItem("userData"));


document.getElementById("count").innerHTML = products === null ? 0 : products.length;

nameInput.value = dataUser.name;
emailInput.value = dataUser.email;
locationInput.value = dataUser.address;
phoneInput.value = dataUser.phone;


document.getElementById("updateData").addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('token', dataUser.token);
    formData.append('name', nameInput.value);
    formData.append('phone', phoneInput.value)
    formData.append('address', locationInput.value)
    fetch(UPDATE_DATA, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${dataUser.token}`
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 201) {
                let token = dataUser.token;
                localStorage.setItem("userData", JSON.stringify({ token , ...data.data}));
                window.location.reload();
            }
        })
        .catch(error => {
            console.log(error);
        });
})

