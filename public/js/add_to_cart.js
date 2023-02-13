const LOCAL_STORAGE_CART_KEY = 'shalott.cart';
const MAX_CART_ITEMS = 5;

// Load cart items from local storage or create empty array
const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
}

function updateCart(product) {
  const {
    productId, 
    productQuantity, 
  } = product;

  const duplicatedIndex = cartItems.findIndex(item => item.productId == productId);
  if(duplicatedIndex !== -1) {
    updateProductQuantity(duplicatedIndex, parseInt(productQuantity));
  } else {
    addNewItem(product);
  }
}

function updateProductQuantity(index, quantity) {
  const newQuantity = Math.min(parseInt(cartItems[index].productQuantity)+parseInt(quantity), MAX_CART_ITEMS);
  cartItems[index].productQuantity = newQuantity;
  saveCart();
}

function addNewItem(item) {
  cartItems.push(item);
  saveCart();
}

function handleAddToCart(event) {
  event.preventDefault();

  const productId = addToCartBtn.dataset.productId;
  const productName = addToCartBtn.dataset.productName;
  const productImage = addToCartBtn.dataset.productImage;
  const productPrice = addToCartBtn.dataset.productPrice;
  const productQuantity = document.querySelector('#product-amount').value;
  const productSlug = addToCartBtn.dataset.productSlug;

  updateCart({productId, productName, productImage, productPrice, productQuantity, productSlug});

  const successModal = document.querySelector('.add-cart-modal');
  const modalOverlay = document.querySelector('.modal__overlay');

  successModal.classList.add('active');
  modalOverlay.classList.add('active');
  modalOverlay.addEventListener('click', () => {
    successModal.classList.remove('active');
    modalOverlay.classList.remove('active');
  })
}

const addToCartForm = document.querySelector('.display__form');
const addToCartBtn = document.querySelector('.display__btn');

addToCartForm.addEventListener('submit', handleAddToCart);
