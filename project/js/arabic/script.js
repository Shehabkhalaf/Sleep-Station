// URL API
const SEND_MESSAGE = 'http://127.0.0.1:8000/api/user/Contact_Us';


// GET Elements 
let email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    message = document.getElementById("message"),
    name = document.getElementById("name");


// Send Message 
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('message', message.value);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', SEND_MESSAGE, true);
    xhr.send(formData);
    swal("تم ارسال رسالتك", "سيتم الرد عليك في أقرب وقت ممكن", "success");
    name.value = ''
    email.value = ''
    phone.value = ''
    message.value = ''

});


// WOW JS 
new WOW().init();



// Play Counter Animation And Scroll Down
let btnn = document.querySelector(".scroll");
let section = document.querySelector(".about");
let y = document.querySelectorAll(".num");

let started = !1;
let start = !1;

function startCount(y) {
    let goal = y.dataset.goal;
    let count = setInterval(() => {
        y.textContent++;
        if (y.textContent == goal) {
            clearInterval(count);
        }
    }, 3000 / goal);
}


window.onscroll = function () {
    if (window.scrollY >= section.offsetTop - 500) {
        if (!start) {
            y.forEach((num) => startCount(num));
        }
        start = !0;
    }

    if (window.scrollY >= 400) {
        btnn.style.display = "block";
    } else {
        btnn.style.display = "none";
    }

    btnn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

};


// USER SIGNIN OR NOT
const status = JSON.parse(localStorage.getItem("sign_done"));

// IN CASE NOT SIGN
const header1 = `
<div class="container">
    <div class="logo">
        <a href="./home_arabic.html">
            <img src="./images/logo/logo.png" alt="">
        </a>
    </div>
    <div class="btn-group mb-3 smallNone" role="group">
        <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="./images/language-icon/egypt.png"> AR
        </button>
        <ul class="dropdown-menu">
            <li class="arabic"> <a href="./home_arabic.html"><img src="./images/language-icon/egypt.png">
                    AR</a></li>
            <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                    EN</a></li>
        </ul>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="./home_arabic.html">الرئيسية</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./products_arabic.html">منتجات</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./contact_arabic.html">تواصل معنا</a>
            </li>
        </ul>
        <div class="btn-group mb-3 bigNone" role="group">
            <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="./images/language-icon/egypt.png"> AR
            </button>
            <ul class="dropdown-menu">
                <li class="arabic"> <a href="./home_arabic.html"><img src="./images/language-icon/egypt.png">
                        AR</a></li>
                <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                        EN</a></li>
            </ul>
        </div>
        <a href="./cart_arabic.html" class="icon" id="cartIcon">
            <span class="count" id="count">0</span>
            <i class="fa-solid fa-cart-plus"></i>
        </a>
        <a href="./signup.html" class="signup">تسجيل الدخول</a>
    </div>
</div>
`
// IN CASE  SIGN
const header2 = `
<div class="container">
    <div class="logo">
        <a href="./home_arabic.html">
            <img src="./images/logo/logo.png" alt="">
        </a>
    </div>
    <div class="btn-group mb-3 smallNone" role="group">
        <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="./images/language-icon/egypt.png"> AR
        </button>
        <ul class="dropdown-menu">
            <li class="arabic"> <a href="./home_arabic.html"><img src="./images/language-icon/egypt.png">
                    AR</a></li>
            <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                    EN</a></li>
        </ul>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="./home_arabic.html">الرئيسية</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./products_arabic.html">منتجات</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./contact_arabic.html">تواصل معنا</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./profile_user_arabic.html">حسابي</a>
            </li>
        </ul>
        <div class="btn-group mb-3 bigNone" role="group">
            <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="./images/language-icon/egypt.png"> AR
            </button>
            <ul class="dropdown-menu">
                <li class="arabic"> <a href="./home_arabic.html"><img src="./images/language-icon/egypt.png">
                        AR</a></li>
                <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                        EN</a></li>
            </ul>
        </div>
        <a href="./cart_arabic.html" class="icon" id="cartIcon">
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


// Get Products For Count 
let products = JSON.parse(localStorage.getItem("products"));

//Define Count 
document.getElementById("count").innerHTML = products === null ? 0 : products.length;