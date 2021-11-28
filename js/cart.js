// Product Data
const productsData = [
  {
    id: '0',
    name: 'XX99 MK II',
    price: '2999',
    img: './assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg',
  },
  {
    id: '1',
    name: 'XX99 MK I',
    price: '1750',
    img: './assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg',
  },
  {
    id: '2',
    name: 'XX59',
    price: '899',
    img: './assets/product-xx59-headphones/desktop/image-category-page-preview.jpg',
  },
  {
    id: '3',
    name: 'ZX9 SPEAKER',
    price: '4500',
    img: './assets/product-zx9-speaker/desktop/image-category-page-preview.jpg',
  },
  {
    id: '4',
    name: 'ZX7 SPEAKER',
    price: '3500',
    img: './assets/product-zx7-speaker/desktop/image-category-page-preview.jpg',
  },
  {
    id: '5',
    name: 'YX1 WIRELESS EARPHONES',
    price: '599',
    img: './assets/product-yx1-earphones/desktop/image-category-page-preview.jpg',
  },
];

//=======================================
// Handing Outputting Added Products on Cart Page
//=======================================

const container = document.getElementById('cart-contents-container');
const listWrapper = document.getElementById('cart-product-list');
const totalBtn = document.getElementById('total');
const shippingBtn = document.getElementById('shipping');
const grandTotalBtn = document.getElementById('grand-total');

if (localStorage && localStorage.length > 0) {
  // Obtaining the data from local storage and convert it into object
  const localStorageArray = Object.entries(localStorage);
  let totalPrice = 0;

  for (let i = 0; i < localStorageArray.length; i++) {
    const [addedItemId, addedItemQty] = localStorageArray[i];
    // Find the current product object by id
    const selectedProduct = productsData.filter((obj) => obj.id === addedItemId);

    if (selectedProduct.length > 0) {
      const { img, name, price } = selectedProduct[0];
      let productSubTotalPrice = parseInt(price) * parseInt(addedItemQty);
      totalPrice += productSubTotalPrice;
      const theItem = `<li class="cart-item-wrapper">
        <div class="featured-image" style="background-image: url(${img})"></div>
          <div class="details-wrapper">
            <div class="product-details">
              <span class="product-name">${name}</span>
              <span class="price">$ ${price}</span>
            </div>
        
            <!-- For the quantity field  -->
            <div class="qty-fields-wrapper">
              <button class="custom-site-btn qty-decrease"><i class="custom-icon minus">&#xe807;</i></button>
              <input class="qty-input" type="number" name="quantity" value="${addedItemQty}" data-product-id="${addedItemId}" />
              <button class="custom-site-btn qty-increase"><i class="custom-icon plus">&#xe806;</i></button>
            </div>
          </div>
        </li>`;

      listWrapper.insertAdjacentHTML('beforeend', theItem);
      productSubTotalPrice = 0;
    }
  }

  // for the prices update
  calcPrices(totalPrice);
} else {
  // Add the empty cart message
  container.innerHTML = `<h2 class="ty-panel-heading">No item added yet :(</h2>
  <p class="short-desc">Browse more to find our awesome products!</p>
  <a class="cta-button" href="/">Back to Shop Home</a>`;
}

//=======================================
// Handing Update Button on the Cart page
//=======================================
const updateButton = document.getElementById('update-button');
const qtyInputs = document.getElementsByClassName('qty-input');

if (updateButton) {
  updateButton.addEventListener('click', function () {
    let newTotalPrice = 0;
    for (let i = 0; i < qtyInputs.length; i++) {
      let newQty = parseInt(qtyInputs[i].value, 10);
      const productId = qtyInputs[i].dataset.productId;
      const productPrice = parseInt(productsData[productId].price, 10);
      let newSubTotalPrice = productPrice * newQty;
      newTotalPrice += newSubTotalPrice;
      newSubTotalPrice = 0;

      // Update the local story
      if (newQty == 0) {
        localStorage.removeItem(productId);
      } else {
        localStorage.setItem(productId, newQty);
      }
    }

    // For the price calculation
    calcPrices(newTotalPrice);
  });
}

//=======================================
// Handing calculation of prices and updating them accordingly
//=======================================
function calcPrices(totalPrice) {
  let shippingPrice = 50;
  let finalPrice = 0;

  if (totalPrice > 0) {
    finalPrice = totalPrice + shippingPrice;
  } else {
    shippingPrice = 0;
    finalPrice = totalPrice;
  }

  shippingBtn.innerText = '$ ' + shippingPrice;
  totalBtn.innerText = '$ ' + totalPrice;
  grandTotalBtn.innerText = '$ ' + finalPrice;
}

//=======================================
// Handing Confirm Button on the Cart page --> Show thank you message
//=======================================

const confirmButton = document.getElementById('confirm-button');

if (confirmButton) {
  confirmButton.addEventListener('click', function () {
    container.innerHTML = `<h2 class="ty-panel-heading">Thank you for your order</h2>
    <p class="short-desc">You will receive an email confirmation shortly.</p>
    <a class="cta-button" href="/">Back to home </a>`;

    // Reset the local storage
    localStorage.clear();
  });
}
