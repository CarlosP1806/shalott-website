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

      fillEditForm(product);
    })
    .catch(err => console.log(err));

  document.querySelector('#search-id').value = "";

});

// Fill product details on search
function fillEditForm(product) {
  const nameInputElement = document.querySelector('#edit-product__name');
  const idInputElement = document.querySelector('#edit-product__id');
  const priceInputElement = document.querySelector('#edit-product__price');
  const categoryInputElement = document.querySelector('#edit-product__category');
  const collectionInputElement = document.querySelector('#edit-product__collection');
  const imageInputElement = document.querySelector('#edit-product__image');
  const checkedInputElement = document.querySelector('#edit-product__highlight');

  nameInputElement.value = product.productName;
  idInputElement.value = product.productId;
  priceInputElement.value = product.productPrice;
  categoryInputElement.value = product.productCategory;
  collectionInputElement.value = product.productCollection;
  imageInputElement.value = product.productImage;
  checkedInputElement.checked = product.featured;
}

// Handle admin create product
const createForm = document.querySelector('#create-product-form');
createForm.addEventListener("submit", event => {
  event.preventDefault();

  const nameInputElement = document.querySelector('#create-product__name');
  const idInputElement = document.querySelector('#create-product__id');
  const priceInputElement = document.querySelector('#create-product__price');
  const categoryInputElement = document.querySelector('#create-product__category');
  const collectionInputElement = document.querySelector('#create-product__collection');
  const imageInputElement = document.querySelector('#create-product__image');

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

// Handle admin delete product
const deleteForm = document.querySelector('#delete-product-form');
deleteForm.addEventListener("submit", event => {
  event.preventDefault();

  const idInputElement = document.querySelector('#delete-product__id');

  fetch("/admin/delete", {
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
});

// Handle admin edit product
const editForm = document.querySelector('#edit-product-form');
editForm.addEventListener('submit', event => {
  event.preventDefault();
  
  const nameInputElement = document.querySelector('#edit-product__name');
  const idInputElement = document.querySelector('#edit-product__id');
  const priceInputElement = document.querySelector('#edit-product__price');
  const categoryInputElement = document.querySelector('#edit-product__category');
  const collectionInputElement = document.querySelector('#edit-product__collection');
  const imageInputElement = document.querySelector('#edit-product__image');
  const checkedInputElement = document.querySelector('#edit-product__highlight');

  fetch('/admin/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: idInputElement.value,
      productName: nameInputElement.value,
      productImage: imageInputElement.value,
      productPrice: priceInputElement.value,
      productCollection: collectionInputElement.value,
      productCategory: categoryInputElement.value,
      featured: checkedInputElement.checked
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
  checkedInputElement.value = "";
});

// Handle admin create collection
const createCollectionForm = document.querySelector('#create-collection-form');
createCollectionForm.addEventListener('submit', event => {
  event.preventDefault();

  const nameInputElement = document.querySelector('#create-collection__name');
  const imageInputElement = document.querySelector('#create-collection__image');

  const collection = {
    name: nameInputElement.value.toLowerCase(),
    image: imageInputElement.value
  }

  fetch('/admin/create/collection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(collection)
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      nameInputElement.value = "";
      imageInputElement.value = "";
      window.location.reload();
    })
    .catch(error => console.log(error));
});

// Handle admin delete collection 
const deleteCollectionForm = document.querySelector('#delete-collection-form');
deleteCollectionForm.addEventListener('submit', event => {
  event.preventDefault();
  const nameInputElement = document.querySelector('#delete-collection__name');

  fetch("/admin/delete/collection", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: nameInputElement.value })
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      nameInputElement.value = "";
      window.location.reload();
    })
    .catch(error => console.log(error));
});