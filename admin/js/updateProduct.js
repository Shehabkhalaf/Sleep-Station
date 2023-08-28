// URL API
const ADD_PRODUCT = 'http://127.0.0.1:8000/api/admin/add_product';
const GET_DATA_CATEGORY = 'http://127.0.0.1:8000/api/admin/all_categories';
const Get_PRODUCT = 'http://127.0.0.1:8000/api/admin/show_product/'


// Get Elements Form 
let productName = document.getElementById("productname"),
    productnameArabic = document.getElementById("productnameArabic"),
    description = document.getElementById("description"),
    descriptionArabic = document.getElementById("descriptionArabic"),
    price = document.getElementById("price"),
    submit = document.getElementById("submit"),
    fileInput = document.querySelector('input[type="url"]'),
    draggableList = document.getElementById("draggable-list"),
    size = document.getElementById("size"),
    discount = document.getElementById("discount"),
    tablePrice = document.getElementById("tablePrice"),
    andSizeAndPrice = document.getElementById("andSizeAndPrice"),
    colors = document.getElementById("colors"),
    colorName = document.getElementById("colorName"),
    colorNameArabic = document.getElementById("colorNameArabic"),
    addColor = document.getElementById("addColor"),
    addImage = document.getElementById("addImage"),
    stock = document.getElementById("stock"),
    categories = document.getElementById("categories"),
    colorInput = document.getElementById("color"),
    inputSearch = document.getElementById("searchProduct"),
    buttonSearch = document.getElementById("buttonSearch");



// ADD Categories
buttonSearch.addEventListener('click', () => {
    fetch(`${Get_PRODUCT}${inputSearch.value}`).then(
        (result) => result.json()
    ).then(
        (dataApi) => {
            if (dataApi.status === 200) {
                showProduct(dataApi.data);
            }
        }
    )
})


function showProduct(data) {
    productName.value = data.product_name;
    productnameArabic.value = data.arabic_name;
    descriptionArabic.value = data.arabic_description;
    description.value = data.description;
}









let categoryValue;

categories.addEventListener("change", (e) => {
    categoryValue = e.target.value;
});

let listColor = [];
let listColorArabic = [];


addColor.addEventListener('click', function (e) {
    if (colorName.value.trim() && colorInput.value.trim() && colorNameArabic.value.trim()) {
        listColor.push(colorName.value + " | " + colorInput.value);
        listColorArabic.push(colorNameArabic.value + " | " + colorInput.value);

        let tr = document.createElement("tr");
        tr.setAttribute("id", countIndex);
        tr.innerHTML = `
                    <td scope="col">${colorName.value}</td>
                    <td scope="col">${colorNameArabic.value}</td>
                    <td scope="col"  style="background-color:${colorInput.value};"></td>
                    <td scope="col">
                        <button class="deleteColor delete me-2" data-colorId=${countIndex}>delete</button>
                    </td>
            `
        colors.append(tr)
        countIndex++;
        document.querySelectorAll('.deleteColor').forEach((element, index) => {
            element.addEventListener('click', () => {
                document.getElementById(element.getAttribute("data-colorId")).remove();
                listColor = listColor.filter((value, i) => i !== index);
                listColorArabic = listColorArabic.filter((value, i) => i !== index);
            })
        })
        colorName.value = '';
        colorNameArabic.value = '';
    }
})


let listSize = [];
let listPrice = [];
let listDiscount = [];

let countIndex = 0;

andSizeAndPrice.addEventListener('click', function (e) {
    if (price.value.trim() && size.value.trim() && discount.value.trim()) {
        listSize.push(size.value);
        listPrice.push(price.value);
        listDiscount.push(discount.value);

        let tr = document.createElement("tr");
        tr.setAttribute("id", countIndex);
        tr.innerHTML = `
                    <td scope="col">${size.value}</td>
                    <td scope="col">${price.value}</td>
                    <td scope="col">${discount.value}</td>
                    <td scope="col">
                        <button class="delete deletePrice me-2" data-id=${countIndex}>delete</button>
                    </td>
            `
        tablePrice.append(tr)
        countIndex++;
        document.querySelectorAll('.deletePrice').forEach((element, index) => {
            element.addEventListener('click', () => {
                document.getElementById(element.getAttribute("data-id")).remove();
                listSize = listSize.filter((value, i) => i !== index);
                listPrice = listPrice.filter((value, i) => i !== index);
                listDiscount = listDiscount.filter((value, i) => i !== index);
            })
        })

        size.value = '';
        price.value = '';
        discount.value = '';
    }
})


addImage.addEventListener('click', function (e) {
    // Add To List
    if (fileInput.value.trim()) {
        listImages.push(fileInput.value);
        fileInput.value = '';
        draggableList.innerHTML = ''
        createList();
    }
})



// ADD Categories
fetch(GET_DATA_CATEGORY).then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        categories.innerHTML = `
        <option selected>Categories</option>
        ${dataAll.map((category) => `
        <option value=${category.category_id}>${category.category_name}</option>
        `
        ).join(" ")}
    `
    }
)




// Send DATA
document.getElementById('submitButton').addEventListener('click', () => {
    submit.addEventListener('submit', function (e) {
        const formData = new FormData();
        formData.append('title', productName.value);
        formData.append('description', description.value);
        formData.append('arabic_title', productnameArabic.value);
        formData.append('arabic_description', descriptionArabic.value);
        formData.append('discount', JSON.stringify(listDiscount));
        formData.append('price', JSON.stringify(listPrice));
        formData.append('size', JSON.stringify(listSize));
        formData.append('stock', stock.value);
        formData.append('color', JSON.stringify(listColor));
        formData.append('arabic_color', JSON.stringify(listColorArabic));
        formData.append('category_id', categoryValue);
        formData.append('images', JSON.stringify(listImages));
        const xhr = new XMLHttpRequest();
        xhr.open('POST', ADD_PRODUCT, true);
        xhr.send(formData);
    });
})



const listImages = [];


// Storage List Items
let listItems = [];



createList();

// Insert Items in draggable List in Dom
function createList() {
    listImages
        .map(element => ({ value: element, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(element => element.value)
        .forEach((person, index) => {
            // Create Element li
            let li = document.createElement("li");
            // Set Attribute in li
            li.setAttribute("data-index", index);

            li.innerHTML = `
            <span class="number" > ${index + 1}</span>
                <div class="draggable" draggable="true">
                <img src=${person} alt="" width="150" height='150px'>
                </div>
        `
            // Push li in List items
            listItems.push(li);
            // Add li in draggable List
            draggableList.appendChild(li)
        });
}







