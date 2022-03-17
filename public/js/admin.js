const searchForm = document.querySelector('.admin__search');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const productId = document.querySelector('#search-id').value;
  
  fetch(`/admin/search/${productId}`)
    .then(response => console.log(response));
})