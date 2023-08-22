// Total Orders
fetch("http://127.0.0.1:8000/api/admin/paid_orders").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        let count = 0;
        dataAll.forEach(element => count++);
        document.getElementById('totalOrders').innerHTML = count;
        let totalPrice = count === 0 ? 0 : dataAll.map(element=>+element.price).reduce((acc,ele)=> acc + ele);
        document.getElementById('totalPrice').innerHTML = '$' + totalPrice;
    }
)


// Total Users
fetch("http://127.0.0.1:8000/api/admin/all_users").then(
    (result) => result.json()
).then(
    (dataApi) => {
        let count = dataApi.data.count;
        document.getElementById('totalUsers').innerHTML = count;
    }
)


// Total Products
fetch("http://127.0.0.1:8000/api/admin/all_products").then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        let count = 0;
        dataAll.forEach(element => count++);
        document.getElementById('totalProduct').innerHTML = count;
    }
)



