// Show modal message
const adminModal = document.querySelector('.admin__modal');
const modalOverlay = document.querySelector('.admin__modal-overlay');

function openModal(message) {
  adminModal.classList.add('active');
  modalOverlay.classList.add('active');

  const modalMessage = document.querySelector('.admin__modal-message');
  modalMessage.textContent = message;
}

function closeModal() {
  adminModal.classList.remove('active');
  modalOverlay.classList.remove('active');
}

const closeModalBtn = document.querySelector('#admin__close-modal');
closeModalBtn.addEventListener('click', () => {
  closeModal();
})
modalOverlay.addEventListener('click', () => {
  closeModal();
})

// Handle admin search
const searchForm = document.querySelector('.admin__search-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const productId = document.querySelector('#search-id').value;

  if (!productId) return;

  fetch(`/admin/search/${productId}`)
    .then(response => response.json())
    .then(product => {
      const adminCard = document.querySelector('.admin__card');
      if (product === "Not found") {
        adminCard.style.display = "none";
        openModal("No se encontro producto");
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
createForm.addEventListener("submit", async event => {
  event.preventDefault();

  const nameInputElement = document.querySelector('#create-product__name');
  const idInputElement = document.querySelector('#create-product__id');
  const priceInputElement = document.querySelector('#create-product__price');
  const categoryInputElement = document.querySelector('#create-product__category');
  const collectionInputElement = document.querySelector('#create-product__collection');
  const imageInputElement = document.querySelector('#create-product__image');

  const response = await fetch('/admin/product', {
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
  if (response.ok) {
    nameInputElement.value = "";
    idInputElement.value = "";
    priceInputElement.value = "";
    categoryInputElement.value = "";
    collectionInputElement.value = "";
    imageInputElement.value = "";
    openModal("Producto creado correctamente");
  } else {
    openModal("Ocurrio un error creando producto");
  }
});

// Handle admin delete product
const deleteForm = document.querySelector('#delete-product-form');
deleteForm.addEventListener("submit", async event => {
  event.preventDefault();

  const idInputElement = document.querySelector('#delete-product__id');

  const response = await fetch("/admin/product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: idInputElement.value })
  });

  if (response.ok) {
    openModal("Producto eliminado correctamente");
    idInputElement.value = "";
  } else {
    openModal("No se pudo eliminar producto");
  }

});

// Handle admin edit product
const editForm = document.querySelector('#edit-product-form');
editForm.addEventListener('submit', async event => {
  event.preventDefault();

  const nameInputElement = document.querySelector('#edit-product__name');
  const idInputElement = document.querySelector('#edit-product__id');
  const priceInputElement = document.querySelector('#edit-product__price');
  const categoryInputElement = document.querySelector('#edit-product__category');
  const collectionInputElement = document.querySelector('#edit-product__collection');
  const imageInputElement = document.querySelector('#edit-product__image');
  const checkedInputElement = document.querySelector('#edit-product__highlight');

  const response = await fetch('/admin/product', {
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
  });

  if (response.ok) {
    openModal("Producto actualizado correctamente");
    nameInputElement.value = "";
    idInputElement.value = "";
    priceInputElement.value = "";
    categoryInputElement.value = "";
    collectionInputElement.value = "";
    imageInputElement.value = "";
    checkedInputElement.value = "";
  } else {
    openModal("Ocurrió un error actualizando producto");
  }

});

// Handle admin create collection
const createCollectionForm = document.querySelector('#create-collection-form');
createCollectionForm.addEventListener('submit', async event => {
  event.preventDefault();

  const nameInputElement = document.querySelector('#create-collection__name');
  const imageInputElement = document.querySelector('#create-collection__image');

  const collection = {
    name: nameInputElement.value.toLowerCase(),
    image: imageInputElement.value
  }

  const response = await fetch('/admin/create/collection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(collection)
  });

  if (response.ok) {
    nameInputElement.value = "";
    imageInputElement.value = "";
    window.location.reload();
  } else {
    openModal("Ocurrio error creando colección");
  }
});

// Handle admin delete collection 
const deleteCollectionForm = document.querySelector('#delete-collection-form');
deleteCollectionForm.addEventListener('submit', async event => {
  event.preventDefault();
  const nameInputElement = document.querySelector('#delete-collection__name');

  if (!nameInputElement.value) return;

  const response = await fetch("/admin/delete/collection", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: nameInputElement.value })
  });

  if (response.ok) {
    nameInputElement.value = "";
    window.location.reload();

  } else {
    openModal("Ocurrió un error eliminando colección");
  }
});

// Handle admin create category
const createCategoryForm = document.querySelector('#create-category-form');
createCategoryForm.addEventListener('submit', async event => {
  event.preventDefault();

  const nameInputElement = document.querySelector('#create-category__name');
  const imageInputElement = document.querySelector('#create-category__image');

  const category = {
    name: nameInputElement.value.toLowerCase(),
    image: imageInputElement.value
  }

  const response = await fetch('/admin/create/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  });

  if (response.ok) {
    nameInputElement.value = "";
    imageInputElement.value = "";
    window.location.reload();
  } else {
    openModal("Ocurrió un error creando categoria");
  }
});

// Handle admin delete collection 
const deleteCategoryForm = document.querySelector('#delete-category-form');
deleteCategoryForm.addEventListener('submit', async event => {
  event.preventDefault();
  const nameInputElement = document.querySelector('#delete-category__name');

  if (!nameInputElement.value) return;

  const response = await fetch("/admin/delete/category", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: nameInputElement.value })
  });

  if (response.ok) {
    nameInputElement.value = "";
    window.location.reload();
  } else {
    openModal("Ocurrio un error creando categoria");
  }
});

