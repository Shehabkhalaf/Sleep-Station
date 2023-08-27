
// URL API
const GET_ALL_ORDERS = `http://127.0.0.1:8000/api/user/all_orders`;

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
                <li class="arabic"><a href="./profile_orders_arabic.html"><img src="./images/language-icon/egypt.png">
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
                <li class="arabic"><a href="./profile_orders_arabic.html"><img src="./images/language-icon/egypt.png">
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

// Get Data from Local Storage
let dataUser = JSON.parse(localStorage.getItem("userData"));
let products = JSON.parse(localStorage.getItem("products"));

document.getElementById("count").innerHTML = products === null ? 0 : products.length;

// Call DATA From Api
fetch(GET_ALL_ORDERS , {
    method: 'Get',
    headers: {
        'Authorization': `Bearer ${dataUser.token}`
    }
}).then(res => res.json())
    .then(data => {
        let dataAll = data.data;
        dataAll.forEach(data => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                        <th>${data.order_id}</th>
                        <td>
                            <ul>
                                ${data.order_details.map((order, index) => ` <li>
                                ${order}
                            </li>
                            `).join(" ")}
                            </ul>
                        </td>
                        <td>${data.price}</td>
`
            document.getElementById("tableBody").append(tr)
        })
    })