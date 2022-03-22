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
    cartSubtotal.textContent = item.productQuantity * item.productPrice;

    cardContainer.append(cartItem);
  });
}

renderItems();