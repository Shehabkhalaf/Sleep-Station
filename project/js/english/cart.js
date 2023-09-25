// URL API
const GET_ALL_OFFERS = 'http://127.0.0.1:8000/api/admin/all_offers';

let checkOutButton = document.getElementById('checkOut');
let footerTable = document.querySelectorAll('.tablefooternone');

let promoCode = 0;

// Storage Data
let listItems = getDataLocal();

// Get Data From Local Storage
function getDataLocal() {
  const products = JSON.parse(localStorage.getItem('products'));
  return products === null ? [] : products;
}

// Set Data In local Storage
function setDataLocal(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Create All Products
function CreateProducts() {
  listItems.forEach((product) => createProduct(product));
}

// Create Product
function createProduct(product) {
  let body = document.getElementById('body-table');
  // Create Element tr
  let tr = document.createElement('tr');
  // Add Attributes [Id]
  tr.setAttribute('id', product.id);
  tr.setAttribute('class', 'mb-3');
  // Content Element
  tr.innerHTML = `
    <td>${product.title}, ${product.size}  ${
    product.color === 'none' ? '' : ',color: ' + product.color
  }</td>
    <td><input type="number" id="${
      product.id
    }" class="quantityNew" min="1" value="${product.quantity}"></td>
    <td class="priceproduct none" id="priceproduct">${product.discount}</td>
    <td><button id="${product.id}" class="remove">X</button></td>
`;
  body.appendChild(tr);
  let footerTable = document.querySelectorAll('.footerNone');

  let quantityNew = document.querySelectorAll('.quantityNew');
  quantityNew.forEach((numberNew) => {
    numberNew.addEventListener('change', (e) => {
      let total = listItems
        .map((e) => +e.quantity * +e.discount)
        .reduce((acc, ele) => acc + ele);
      listItems.forEach((element) => {
        if (element.id === +e.target.getAttribute('id')) {
          element.quantity = +e.target.value;
        }
      });
      setDataLocal(listItems);
      let totalPrice = document.getElementById('subtotal');
      totalPrice.innerHTML = 'EGP ' + total;
      document.getElementById('totalPrice').innerHTML =
        'EGP ' + (total + 60 - promoCode);
    });
  });

  // In Case Delete Element
  let remove = document.querySelectorAll('.remove');
  remove.forEach((item) => {
    item.addEventListener('click', () => {
      listItems = listItems.filter(
        (element) => element.id !== +item.getAttribute('id')
      );
      [...body.children].forEach((element) => {
        if (+element.getAttribute('id') === +item.getAttribute('id')) {
          element.remove();
        }
      });
      setDataLocal(listItems);
      let totalPrice = document.getElementById('subtotal');
      if (listItems.length === 0) {
        totalPrice.innerHTML = 'EGP ' + '0';
        footerTable.forEach((e) => e.classList.add('tablefooternone'));
        checkOutButton.classList.add('checkNone');
      } else {
        let total = listItems
          .map((e) => +e.quantity * +e.discount)
          .reduce((acc, ele) => acc + ele);
        totalPrice.innerHTML = 'EGP ' + total;
        document.getElementById('totalPrice').innerHTML =
          'EGP ' + (total + 60 - promoCode);
        checkOutButton.classList.remove('checkNone');
      }
    });
  });
}

CreateProducts();

let totalPrice = document.getElementById('subtotal');
let total = listItems.map((e) => +e.quantity * +e.discount);
total = total.length === 0 ? 0 : total.reduce((acc, ele) => acc + ele);
if (total > 0) {
  footerTable.forEach((e) => e.classList.remove('tablefooternone'));
  checkOutButton.classList.remove('checkNone');
  document.getElementById('totalPrice').innerHTML =
    'EGP ' + (total + 60 - promoCode);
} else {
  checkOutButton.classList.add('checkNone');
  footerTable.forEach((e) => e.classList.add('tablefooternone'));
}
totalPrice.innerHTML = 'EGP ' + total;

/*********************************** Handle Promocode ***********************************/
const promocode = document.getElementById('inputPassword2');
const applyPromocode = document.getElementById('apply-promo');
const promoMsg = document.querySelector('.promo');

applyPromocode.addEventListener('click', handlePromo);

function handlePromo() {
  promoValue = promocode.value;
  applyPromocode.disabled = false;

  const status = JSON.parse(localStorage.getItem('sign_done'));

  if (status !== true) {
    swal('You must be logged in to be able to complete the purchase');
    return;
  }

  if (listItems.length == 0) {
    applyPromocode.disabled = true;
    return;
  }

  if (promoValue === '') {
    return;
  } else {
    fetch(GET_ALL_OFFERS)
      .then((result) => result.json())
      .then((data) => {
        let check = 0;
        data.data.forEach((element) => {
          if (element.promocode === promoValue) {
            if (Date.now() < new Date(element.expired_at) - 0) {
              promoCode = +element.discount;
              promoMsg.innerHTML = '';
              document.getElementById('totalPrice').innerHTML =
                'EGP ' + (total + 60 - promoCode);
              promoMsg.style.color = 'black';
              promoMsg.innerHTML = `
                <p>You have used <span>${element.promocode}</span> promocode with discount:</p>
                <span>${element.discount}%</span>
                `;
              applyPromocode.disabled = true;

              listItems.forEach((product) => {
                product.promoValue = element.discount;
                product.promoName = element.promocode;
              });
              setDataLocal(listItems);
            } else {
              promoMsg.style.color = 'red';
              promoMsg.innerHTML = 'This code has expired';
            }
            check++;
          }
        });

        if (check === 0) {
          promoMsg.style.color = 'red';
          promoMsg.innerHTML = 'This code does not exist';
        }
      });
  }
}
/*********************************** Handle Promocode ***********************************/

document.getElementById('checkOut').addEventListener('click', (e) => {
  const status = JSON.parse(localStorage.getItem('sign_done'));
  if (status !== true) {
    e.preventDefault();
    swal('You must be logged in to be able to complete the purchase');
  }
});
