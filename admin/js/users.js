

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://127.0.0.1:8000/api/admin/all_users', true);
xhr.onload = function () {
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
    }
};
xhr.send();