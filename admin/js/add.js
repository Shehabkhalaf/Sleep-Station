// Get Elements Form 
let productName = document.getElementById("productname"),
    description = document.getElementById("description"),
    price = document.getElementById("price"),
    submit = document.getElementById("submit"),
    fileInput = document.querySelector('input[type="file"]'),
    draggableList = document.getElementById("draggable-list"),
    size = document.getElementById("size"),
    discount = document.getElementById("discount"),
    tablePrice = document.getElementById("tablePrice"),
    andSizeAndPrice = document.getElementById("andSizeAndPrice"),
    colors = document.getElementById("colors"),
    stock = document.getElementById("stock"),
    categories = document.getElementById("categories"),
    colorInput = document.getElementById("color");

let categoryValue;
categories.addEventListener("change", (e) => {
    categoryValue = e.target.value;
});

let listColor = [];

colorInput.addEventListener('change', (e) => {

    let para = document.createElement("p");
    para.setAttribute('class', 'color');
    para.style.backgroundColor = e.target.value;
    colors.appendChild(para);
    listColor.push(e.target.value)
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

        console.log(listSize)
        console.log(listPrice)
        console.log(listDiscount)


        let tr = document.createElement("tr");
        tr.setAttribute("id", countIndex);
        tr.innerHTML = `
                    <td scope="col">${size.value}</td>
                    <td scope="col">${price.value}</td>
                    <td scope="col">${discount.value}</td>
                    <td scope="col">
                        <button class="delete me-2" data-id=${countIndex}>delete</button>
                    </td>
            `
        tablePrice.append(tr)
        countIndex++;
        document.querySelectorAll('.delete').forEach((element, index) => {
            element.addEventListener('click', () => {
                document.getElementById(element.getAttribute("data-id")).remove();
                listSize = listSize.filter((value, i) => i !== index);
                listPrice = listPrice.filter((value, i) => i !== index);
                listDiscount = listDiscount.filter((value, i) => i !== index);

            })
        })
    }
})


fileInput.addEventListener("change", (e) => {
    console.log(e.target.value)
    // Add To List
    listImages.push(fileInput.files[0]);
    e.target.value = '';
    draggableList.innerHTML = ''
    createList();
    console.log(listImages)
})

// Add Event Listner




const listImages = [];


// Storage List Items
let listItems = [];

let dragStartIndex;


createList();

// Insert Items in draggable List in Dom
function createList() {
    listImages
        .map(element => ({ value: element , sort: Math.random() }))
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
                <img src=${ URL.createObjectURL(person)} alt="" width="150" height='150px'>
                </div>
        `
            // Push li in List items
            listItems.push(li);
            // Add li in draggable List
            draggableList.appendChild(li)
        });
    addEventListeners();
}


function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
    this.classList.add("over");
}

function dragOver(e) {
    e.preventDefault();
}

function dragLeave() {
    this.classList.remove("over");

}


function dragDrop() {
    let dragEndIndex = +this.getAttribute("data-index");
    console.log(dragStartIndex);
    console.log(dragEndIndex);
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function swapItems(dragStartIndex, dragEndIndex) {
    const itemOne = listItems[dragStartIndex].querySelector(".draggable");
    const itemTwo = listItems[dragEndIndex].querySelector(".draggable");
    listItems[dragStartIndex].appendChild(itemTwo);
    listItems[dragEndIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".draggable").innerText.trim();
        if (personName !== listImages[index]) {
            listItem.classList.add("wrong");
        } else {
            listItem.classList.add("right");
            listItem.classList.remove("wrong");
        }
    })
}


function addEventListeners() {
    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}






document.getElementById('submitButton').addEventListener('click', () => {
    submit.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', productName.value);
        formData.append('description', description.value);
        formData.append('discount', listDiscount);
        formData.append('price', listPrice);
        formData.append('size', listSize);
        formData.append('stock', stock.value);
        formData.append('color', listColor);
        formData.append('category_id', categoryValue);
        formData.append('image', listImages);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/admin/add_product', true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.log('فشل تحميل الصورة.');
            }
        };
        xhr.send(formData);
    });
})


// category_id
