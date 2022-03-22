const LOCAL_STORAGE_CART_KEY = 'shalott.cart';
const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
}

const addToCartForm = document.querySelector('.display__form');
const addToCartBtn = document.querySelector('.display__btn');
addToCartForm.addEventListener('submit', event => {
  event.preventDefault();

  const productId = addToCartBtn.dataset.productId;
  const itemQuantity = document.querySelector('#product-amount').value;

  let duplicate = false;
  cartItems.forEach(item => {
    if (item.productId === productId) duplicate = true;
  })

  if (!duplicate) {
    const newItem = {
      productId: addToCartBtn.dataset.productId,
      productName: addToCartBtn.dataset.productName,
      productImage: addToCartBtn.dataset.productImage,
      productPrice: addToCartBtn.dataset.productPrice,
      productQuantity: itemQuantity,
      productSlug: addToCartBtn.dataset.productSlug
    }
    cartItems.push(newItem);
  } else {
    const cartItemIndex = cartItems.findIndex(item => item.productId === productId);
    cartItems[cartItemIndex].productQuantity = 
      parseInt(cartItems[cartItemIndex].productQuantity) + parseInt(itemQuantity);
  }

  saveCart();

  const successModal = document.querySelector('.add-cart-modal');
  const modalOverlay = document.querySelector('.modal__overlay');
  
  successModal.classList.add('active');
  modalOverlay.classList.add('active');
  modalOverlay.addEventListener('click', () => {
    successModal.classList.remove('active');
    modalOverlay.classList.remove('active');
  })
  
});