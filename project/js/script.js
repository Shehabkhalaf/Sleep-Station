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


let email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    message = document.getElementById("message"),
    name = document.getElementById("name");



document.getElementById('submitButton').addEventListener('click', () => {
    document.getElementById('form').addEventListener('submit', function (e) {
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('email', email.value);
        formData.append('phone', phone.value);
        formData.append('message', message.value);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/user/Contact_Us', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Done');
            } else {
                console.log('Failed');
            }
        };
        xhr.send(formData);
    });
})



new WOW().init();
