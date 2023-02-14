const cardContainer = document.querySelector('.card-container');

function handleProductClick(event) {
  if(event.target.parentElement.parentElement.classList.contains('card--product')) {
    productId = event.target.parentElement.parentElement.id;
    window.location.href = 
      `/catalogo/producto/${productId}`;
  }
}

cardContainer.addEventListener('click', handleProductClick);