const LOCAL_STORAGE_CART_KEY = 'shalott.cart';
const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
}

const addToCartForm = document.querySelector('.display__form');
const addToCartBtn = document.querySelector('.display__btn');
addToCartForm.addEventListener('submit', event => {
  event.preventDefault();
  const itemQuantity = document.querySelector('#product-amount').value;
  const newItem = {
    productId: addToCartBtn.dataset.productId,
    productName: addToCartBtn.dataset.productName,
    productImage: addToCartBtn.dataset.productImage,
    productPrice: addToCartBtn.dataset.productPrice,
    productQuantity: itemQuantity,
    productSubtotal: itemQuantity * addToCartBtn.dataset.productPrice
  }
  cartItems.push(newItem);
  saveCart();
});