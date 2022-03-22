const LOCAL_STORAGE_CART_KEY = 'shalott.cart';
const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
}

const cardContainer = document.querySelector('.cart__container');
function renderItems() {
  cardContainer.innerHTML = "";
  const cartCardTemplate = document.querySelector('#cart-card-template');

  let totalProducts = 0;
  let totalPrice = 0;

  cartItems.forEach(item => {
    const cartItem = document.importNode(cartCardTemplate.content, true);

    const cardElement = cartItem.querySelector('.cart-card');
    cardElement.id = item.productId;

    const cartImage = cartItem.querySelector('.cart__image');
    cartImage.src = item.productImage;

    const cartLink = cartItem.querySelector('.cart__link');
    cartLink.href = `/catalogo/producto/${item.productSlug}`;

    const cartName = cartItem.querySelector('.cart__name');
    cartName.textContent = item.productName;

    const cartPrice = cartItem.querySelector('.cart__price');
    cartPrice.textContent = parseFloat(item.productPrice).toFixed(2);

    const cartQuantity = cartItem.querySelector('.cart__quantity');
    cartQuantity.textContent = item.productQuantity;

    const cartSubtotal = cartItem.querySelector('.cart__subtotal');
    cartSubtotal.textContent = 
      parseFloat(item.productQuantity * item.productPrice).toFixed(2);

    cardContainer.append(cartItem);

    totalProducts += parseInt(item.productQuantity);
    totalPrice += item.productQuantity * item.productPrice;
  });

  if(totalProducts == 0) {
    const cartWrapper = document.querySelector('.cart-wrapper');
    cartWrapper.innerHTML = "";

    // Show cart empty message
    const emptyMessageContainer = document.createElement('div');
    emptyMessageContainer.classList.add('cart-empty-message');
    const message = document.createElement('p');
    message.textContent = 'El carrito está vacío' ;
    emptyMessageContainer.appendChild(message);
    const button = document.createElement('a');
    button.classList.add('empty-message__btn');
    button.textContent = "Ir a tienda";
    button.href = "/catalogo";
    emptyMessageContainer.appendChild(button);

    cartWrapper.appendChild(emptyMessageContainer);
  }

  document.querySelector('#total-products').textContent = totalProducts;
  document.querySelector('#total-price').textContent = totalPrice.toFixed(2);
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