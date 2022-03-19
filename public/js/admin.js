// Handle admin search
const searchForm = document.querySelector('.admin__search-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const productId = document.querySelector('#search-id').value;

  fetch(`/admin/search/${productId}`)
    .then(response => response.json())
    .then(product => {
      const adminCard = document.querySelector('.admin__card');
      if (product === "Not found") {
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

  document.querySelector('#search-id').value = "";
});

// Handle admin create
const createForm = document.querySelector('#create-form');
createForm.addEventListener("submit", event => {
  event.preventDefault();

  const nameInputElement = document.querySelector('#create__name');
  const idInputElement = document.querySelector('#create__id');
  const priceInputElement = document.querySelector('#create__price');
  const categoryInputElement = document.querySelector('#create__category');
  const collectionInputElement = document.querySelector('#create__collection');
  const imageInputElement = document.querySelector('#create__image');

  fetch('/admin/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productName: nameInputElement.value,
      productId: idInputElement.value,
      productImage: imageInputElement.value,
      productPrice: priceInputElement.value,
      productCollection: collectionInputElement.value,
      productCategory: categoryInputElement.value,
      featured: false
    })
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));

  nameInputElement.value = "";
  idInputElement.value = "";
  priceInputElement.value = "";
  categoryInputElement.value = "";
  collectionInputElement.value = "";
  imageInputElement.value = "";
});

// Handle admin delete
const deleteForm = document.querySelector('#delete-form');
deleteForm.addEventListener("submit", event => {
  event.preventDefault();

  const idInputElement = document.querySelector('#delete__id');

  fetch("admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: idInputElement.value })
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));

  idInputElement.value = "";
})