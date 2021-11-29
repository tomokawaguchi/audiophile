//=======================================
// Handing Local Storage Logic
//=======================================

const addProductBtn = document.getElementById('add-product-btn');
const contentWrapper = document.querySelector('.content-wrapper');

// Updating product quantity
if (addProductBtn) {
  addProductBtn.addEventListener('click', function (e) {
    const productId = e.target.dataset.productId;
    let enteredQty = parseInt(e.target.previousElementSibling.querySelector('.qty-input').value, 10);

    if (productId && enteredQty > 0) {
      // Obtain current qty stored
      let currentQty = localStorage.getItem(productId);
      currentQty = currentQty != null ? parseInt(currentQty, 10) : 0;
      // Add to the existing qty
      currentQty += enteredQty;

      // Store the selected product --> "product ID : selected quantity"
      localStorage.setItem(productId, currentQty);
    }

    // Display message for users
    handleMessage();
  });
}

//=======================================
// Handing Showcasing/removing a message when item(s) added to the cart
//=======================================

function handleMessage() {
  const message = document.createElement('p');
  const text = document.createTextNode('Your item(s) added!');
  message.classList.add('add-message');
  message.appendChild(text);
  contentWrapper.appendChild(message);

  // remove the message in 2.5s
  setTimeout(function () {
    message.remove();
  }, 2500);
}

//=======================================
// Handing Increase/Decrease Button
// (Keep below this below the Outputting Added Products on Cart Page Logic)
//=======================================

const increaseBtn = document.getElementsByClassName('qty-increase');
const decreaseBtn = document.getElementsByClassName('qty-decrease');
const qtyInput = document.getElementsByClassName('qty-input');

// For the increase btn - max 100 qty is allowed
if (increaseBtn) {
  for (let i = 0; i < increaseBtn.length; i++) {
    increaseBtn[i].addEventListener('click', function (e) {
      let qtyValue = parseInt(qtyInput[i].value, 10);
      qtyValue = isNaN(qtyValue) ? 0 : qtyValue;
      qtyValue++;
      qtyValue = qtyValue > 100 ? 100 : qtyValue;
      qtyInput[i].value = qtyValue;
    });
  }
}

// For the increase btn - negative qty value is not allowed
if (decreaseBtn) {
  for (let i = 0; i < decreaseBtn.length; i++) {
    decreaseBtn[i].addEventListener('click', function () {
      let qtyValue = parseInt(qtyInput[i].value, 10);
      qtyValue = isNaN(qtyValue) ? 1 : qtyValue;
      qtyValue--;
      qtyValue = qtyValue < 1 ? 1 : qtyValue;
      qtyInput[i].value = qtyValue;
    });
  }
}
