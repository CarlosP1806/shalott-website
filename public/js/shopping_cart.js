const LOCAL_STORAGE_CART_KEY = 'shalott.cart';
const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
}

const cardContainer = document.querySelector('.cart__container');
function renderItems() {
  cardContainer.innerHTML = "";

  const cartCardTemplate = document.querySelector('#cart-card-template');
  cartItems.forEach(item => {
    const cartItem = document.importNode(cartCardTemplate.content, true);

    const cardElement = cartItem.querySelector('.cart-card');
    cardElement.id = item.productId;

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

cardContainer.addEventListener('click', event => {
  if (event.target.classList.contains('cart__button')) {
    const card = event.target.closest('.cart-card ');

    const itemIndex = cartItems.findIndex(item => item.productId === card.id);
    if (event.target.id === 'cart__add') {
      cartItems[itemIndex].productQuantity =
        parseInt(cartItems[itemIndex].productQuantity) + 1;
    } else {
      if (cartItems[itemIndex].productQuantity == 1) {
        cartItems.splice(itemIndex, 1);
      } else {
        cartItems[itemIndex].productQuantity =
          parseInt(cartItems[itemIndex].productQuantity) - 1;
      }
    }
  }

  saveCart()
  renderItems();
});


renderItems();