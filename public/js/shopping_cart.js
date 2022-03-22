const LOCAL_STORAGE_CART_KEY = 'shalott.cart';
const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
}

function renderItems() {
  const cardContainer = document.querySelector('.cart__container');
  const cartCardTemplate = document.querySelector('#cart-card-template');
  cartItems.forEach(item => {
    const cartItem = document.importNode(cartCardTemplate.content, true);

    const cartImage = cartItem.querySelector('.cart__image');
    cartImage.src = item.productImage;

    const cartName = cartItem.querySelector('.cart__name');
    cartName.textContent = item.productName;

    const cartPrice = cartItem.querySelector('.cart__price');
    cartPrice.textContent = item.productPrice;

    const cartQuantity = cartItem.querySelector('.cart__quantity');
    cartQuantity.textContent = item.productQuantity;

    const cartSubtotal = cartItem.querySelector('.cart__subtotal');
    cartSubtotal.textContent = item.productSubtotal;

    cardContainer.append(cartItem);
  });
}

const url = window.location.href;
if (url.split('/')[url.split('/').length - 1] === 'carrito') {
  renderItems();
} else {
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
}