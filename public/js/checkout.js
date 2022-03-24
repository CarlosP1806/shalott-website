const LOCAL_STORAGE_CART_KEY = 'shalott.cart';
const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

const cardContainer = document.querySelector('.summary__cards');
function renderItems() {
  cardContainer.innerHTML = "";
  const cardTemplate = document.querySelector('#summary-template');

  let totalPrice = 0;

  cartItems.forEach(item => {
    const summaryItem = document.importNode(cardTemplate.content, true);

    const itemName = summaryItem.querySelector('.summary__name');
    itemName.textContent = item.productName;

    const itemQuantity = summaryItem.querySelector('.summary__quantity');
    itemQuantity.textContent = item.productQuantity;

    const subtotal = summaryItem.querySelector('.summary__subtotal');
    subtotal.textContent = 
      parseFloat(item.productQuantity * item.productPrice).toFixed(2);

    totalPrice += item.productQuantity * item.productPrice;

    cardContainer.appendChild(summaryItem);
  });

  document.querySelector('#total-price').textContent = totalPrice;

}

renderItems();