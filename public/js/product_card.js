const cardContainer = document.querySelector('.card-container');

cardContainer.addEventListener('click', event => {
  if(event.target.parentElement.parentElement.classList.contains('card--product')) {
    window.location.href = 
      `/catalogo/producto/${event.target.parentElement.parentElement.id}`;
  }
});