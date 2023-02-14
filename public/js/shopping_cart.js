const LOCAL_STORAGE_CART_KEY = 'shalott.cart';
const MAX_CART_ITEMS = 5;

const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

const cardContainer = document.querySelector('.cart__container');
const checkoutForm = document.querySelector('.order__btn');

function saveCart() {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
}

function createItemCard(template, item) {
  const cardElement = template.querySelector('.cart-card');
  cardElement.id = item.productId;

  const cartImage = template.querySelector('.cart__image');
  cartImage.src = item.productImage;

  const cartLink = template.querySelector('.cart__link');
  cartLink.href = `/catalogo/producto/${item.productSlug}`;

  const cartName = template.querySelector('.cart__name');
  cartName.textContent = item.productName;

  const cartPrice = template.querySelector('.cart__price');
  cartPrice.textContent = parseFloat(item.productPrice).toFixed(2);

  const cartQuantity = template.querySelector('.cart__quantity');
  cartQuantity.textContent = item.productQuantity;

  const cartSubtotal = template.querySelector('.cart__subtotal');
  cartSubtotal.textContent =
    parseFloat(item.productQuantity * item.productPrice).toFixed(2);

  cardContainer.append(template);
}

function renderEmptyMessage() {
  const cartWrapper = document.querySelector('.cart-wrapper');
  cartWrapper.innerHTML = "";

  const emptyMessageContainer = document.createElement('div');
  emptyMessageContainer.classList.add('cart-empty-message');
  const message = document.createElement('p');
  message.textContent = 'El carrito está vacío';
  message.classList.add('text');
  message.classList.add('text--med');
  emptyMessageContainer.appendChild(message);
  const button = document.createElement('a');
  button.classList.add('btn');
  button.classList.add('mt-1');
  button.textContent = "Ir a tienda";
  button.href = "/catalogo";
  emptyMessageContainer.appendChild(button);

  cartWrapper.appendChild(emptyMessageContainer);
}

function renderItems() {
  cardContainer.innerHTML = "";
  const cartCardTemplate = document.querySelector('#cart-card-template');

  let totalProducts = 0;
  let totalPrice = 0;

  cartItems.forEach(item => {
    const cartItem = document.importNode(cartCardTemplate.content, true);
    
    createItemCard(cartItem, item);

    totalProducts += parseInt(item.productQuantity);
    totalPrice += item.productQuantity * item.productPrice;
  });

  if (totalProducts == 0) {
    renderEmptyMessage();
  }

  document.querySelector('#total-products').textContent = totalProducts;
  document.querySelector('#total-price').textContent = totalPrice.toFixed(2);
}

cardContainer.addEventListener('click', event => {
  if (!event.target.classList.contains('cart__button')) {
    return
  }

  const card = event.target.closest('.cart-card ');
  const itemIndex = cartItems.findIndex(item => item.productId === card.id);
  const item = cartItems[itemIndex];

  if (event.target.id === 'cart__add') {
    item.productQuantity = Math.min(parseInt(item.productQuantity)+1, MAX_CART_ITEMS);
  } else {
    if (item.productQuantity == 1) {
      cartItems.splice(itemIndex, 1);
    } else {
      item.productQuantity--;
    }
  }

  saveCart()
  renderItems();
});

function handleCheckoutSubmission(event) {
  event.preventDefault();

  // Get cart items
  const items = [];
  cartItems.forEach(item => {
    items.push({
      id: item.productId,
      quantity: item.productQuantity
    });
  });

  fetch('/carrito/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: items
    })
  })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e.error);
    });
}

checkoutForm.addEventListener('click', handleCheckoutSubmission);

renderItems();