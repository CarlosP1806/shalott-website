const searchForm = document.querySelector('.admin__search');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const productId = document.querySelector('#search-id').value;
  
  fetch(`/admin/search/${productId}`)
    .then(response => response.json())
    .then(product => {
      const adminCard = document.querySelector('.admin__card');
      if(product ===  "Not found") {
        adminCard.style.display = "none";
        return;
      }; 
      adminCard.style.display = "block"; 
      const imageElement = document.querySelector('#admin__card-figure');
      imageElement.src = product.productImage;
      const nameElement = document.querySelector('#admin__card-name');
      nameElement.textContent = product.productName;
      const priceElement = document.querySelector('#admin__card-price');
      priceElement.textContent = `$${product.productPrice}`;
    });

})