// Get Product_id and Category_id From LocalStorage
const productDetails = JSON.parse(localStorage.getItem('productDetails'));
// const productId = +productDetails.product_id;
const categoryId = +productDetails.category_id;

/*****************/
const urlString = new URL(window.location.href);
const urlParams = urlString.searchParams;
const productId = +urlParams.get('id');
/*****************/

if (!productId) {
  location.href = 'products_arabic.html';
}

// URL API
const GET_DATA_PRODUCT = `http://127.0.0.1:8000/api/user/show_product/${productId}?lang=ar`;
const GET_ALL_PRODUCTS = 'http://127.0.0.1:8000/api/user/products';

// IN CASE NOT SIGN
const header1 = `
<div class="container">
    <div class="logo">
        <a href="./home_arabic.html">
            <img src="./images/logo/logo.png" alt="">
        </a>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./home_arabic.html">الرئيسية</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="./products_arabic.html">منتجات</a>
            </li>
            <li class="nav-item">
                <a class="nav-link " href="./contact_arabic.html">تواصل معنا</a>
            </li>
        </ul>
        <a href="./cart_arabic.html" class="icon" id="cartIcon">
            <span class="count" id="count">0</span>
            <i class="fa-solid fa-cart-plus"></i>
        </a>
        <a href="./signup.html" class="signup">تسجيل الدخول</a>
    </div>
</div>
`;
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
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./home_arabic.html">الرئيسية</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="./products_arabic.html">منتجات</a>
            </li>
            <li class="nav-item">
                <a class="nav-link " href="./contact_arabic.html">تواصل معنا</a>
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
        </div>
        <a href="./cart_arabic.html" class="icon" id="cartIcon">
            <span class="count" id="count">0</span>
            <i class="fa-solid fa-cart-plus"></i>
        </a>
    </div>
</div>
`;

if (status !== true) {
  document.getElementById('nav').innerHTML = header1;
} else {
  document.getElementById('nav').innerHTML = header2;
}

if (status !== true) {
  document.getElementById('nav').innerHTML = header1;
} else {
  document.getElementById('nav').innerHTML = header2;
}

// Get Data From Local Storage
function getDataLocal() {
  const products = JSON.parse(localStorage.getItem('products'));
  return products === null ? [] : products;
}

// Set Data In local Storage
function setDataLocal(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Storage Data
let listItems = getDataLocal();

// Get Element
let sliderImages = document.getElementById('sliderImages');
let detailsContainer = document.getElementById('detailsContainer');
let boxesProducts = document.getElementById('boxes');

// Call Date
fetch(GET_DATA_PRODUCT)
  .then((result) => result.json())
  .then((data) => {
    addProduct(data.data);
  })
  .catch((err) => (location.href = 'products_arabic.html'));

// Add Products

function addProduct(data) {
  sliderImages.innerHTML = `
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
            ${data.image
              .map(
                (img, index) => ` <div ${
                  index === 0
                    ? `class="carousel-item active" `
                    : 'class=carousel-item'
                }>
                <img src="${img}" class="d-block" alt="..." />
            </div>
            `
              )
              .join(' ')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;

  let countColor = 0;
  data.color.forEach((e) => countColor++);
  detailsContainer.innerHTML = `
            <a href="./products_arabic.html" class="buttonStyleBack" id="back-btnn"><i class="fa-solid fa-arrow-right"></i>العودة إلى جميع المنتجات</a>
            <h2 class="mt-5">${data.product_name}</h2>
            <p class="price" id="discountP">ج.م ${
              data.discount[0]
            } <del id="priceDel">ج.م
                    ${data.price[0]}</del></p>
            <div class="description">${data.description}</div>
            <div class="form">
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <div class="qty">
                            <label for="">كمية</label>
                            <input type="number" min="1" id="quantity" value="1">
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="select">
                            <label for="">حجم</label>
                            <select class="form-select" id="selected" aria-label="Default select example">
                                ${data.size
                                  .map(
                                    (
                                      sizetype,
                                      index
                                    ) => `<option value="${index}">${sizetype}
                                </option>
                                `
                                  )
                                  .join(' ')}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="color mt-2 d-flex">
                    <span>لون:</span>
                    <span id="chooseColor">${
                      countColor > 0 ? data.color[0].split('|')[0] : 'أبيض'
                    }</span>
                </div>
                ${
                  countColor > 0
                    ? `<ul class="mt-2 colors d-flex align-items-center">
                    ${data.color
                      .map(
                        (colorType, index) => ` <li ${
                          index === 0 ? `class="active" ` : ''
                        }
                        id="${
                          colorType.split('|')[0]
                        }" style="background-color: ${
                          colorType.split('|')[1]
                        } ;"></li>
                    `
                      )
                      .join(' ')}
                </ul>`
                    : ''
                }
            </div>
            <button class="buttonStyle add-card mt-5" id="addCardd">أضف إلى السلة <i
                    class="fa-solid fa-cart-shopping"></i></button>
            <div class="icon">
                <img src="images/icon.avif" class="img-size img-fluid">
            </div>
    
    `;

  // Change Price
  let quantity = document.getElementById('quantity');
  quantity.addEventListener('change', (number) => {
    if (number.target.value > 0) {
      document.getElementById('discountP').innerHTML =
        'ج.م ' +
        +number.target.value * data.discount[0] +
        `<del id="priceDel">ح.م ${+number.target.value * data.price[0]}</del>`;
    }
  });

  let selected = document.getElementById('selected');
  selected.addEventListener('change', (select) => {
    document.getElementById('discountP').innerHTML =
      'ج.م ' +
      +quantity.value * data.discount[+selected.value] +
      `<del id="priceDel">ج.م ${
        +quantity.value * data.price[+selected.value]
      }</del>`;
  });

  // Choose Colors
  let itemsColor = document.querySelectorAll('ul.colors li');
  let colorChoose = 'white'; // Defualt Color
  itemsColor.forEach((itemColor) => {
    itemColor.addEventListener('click', () => {
      itemsColor.forEach((item) => item.classList.remove('active'));
      itemColor.classList.add('active');
      document.getElementById('chooseColor').innerHTML = itemColor.id;
      colorChoose = itemColor.id;
    });
  });

  // Add To Card
  let addCardd = document.getElementById('addCardd');
  addCardd.addEventListener('click', () => {
    addToCard(
      data.product_name,
      data.size[+selected.value],
      data.discount[+selected.value],
      +quantity.value,
      colorChoose
    );
  });
}

// ADD To Cart
function addToCard(title, size, discount, quantity, color = 'white') {
  let id = listItems.length === 0 ? 0 : listItems[listItems.length - 1].id + 1;
  // Create Object Task Store Text and Place
  const newPrduct = { productId, title, size, discount, quantity, id, color };
  listItems = getDataLocal();
  listItems.push(newPrduct);
  // Add Object In Local Storage
  setDataLocal(listItems);
  document.getElementById('count').innerHTML = listItems.length;
}

// Call Date
fetch(GET_ALL_PRODUCTS)
  .then((result) => result.json())
  .then((dataApi) => {
    let dataAll = dataApi.data;
    showProducts(dataAll);
  });

// Show Products
function showProducts(data) {
  boxesProducts.innerHTML = '';
  // Add Product In Dom
  data.forEach((product) => {
    if (product.category_id === categoryId) {
      if (product.products.length > 1) {
        document.getElementById('relatedProducts').innerHTML = 'منتجات ذات صله';
        addProducts(product);
      }
    }
  });
}

// Add Product
function addProducts(product) {
  product.products.forEach((element) => {
    if (element.product_id !== productId) {
      // create div
      let div = document.createElement('div');
      // Add class
      div.setAttribute('class', 'col-lg-4 col-md-6 mb-3');
      div.setAttribute('data-id', element.product_id);
      div.innerHTML = `
                <div class="box" data-product="box" data-category=${element.category_id} data-productId=${element.product_id}>
                    <div class="overflow-hidden">
                        <div class="image overflow-hidden" id="card" data-id="${element.id}">
                            <img src=${element.images[0]} class="card-img-top">
                        </div>
                        <div class="card-body">
                            <div class="title mb-2">
                                <h5>${element.product_name}</h5>
                            </div>
                            <div class="buttons">
                                <p class="price d-flex"><span class="me-1">ج.م</span><span>${element.price[0]}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
      boxesProducts.appendChild(div);
      // Storage [category_id , product_id ] In LocalStorage untill Call product Details
      let allBoxes = document.querySelectorAll('[data-product="box"]');
      allBoxes.forEach((element) => {
        element.addEventListener('click', (e) => {
          let category_id = element.getAttribute('data-category');
          let product_id = element.getAttribute('data-productId');
          // Set Data From Local Storage
          localStorage.setItem(
            'productDetails',
            JSON.stringify({ category_id: category_id, product_id: product_id })
          );
          // Go To Location Product Details
          location.href = 'product.html';
        });
      });
    }
  });
}

// Get Products For Count
let products = JSON.parse(localStorage.getItem('products'));

//Define Count
document.getElementById('count').innerHTML =
  products === null ? 0 : products.length;
