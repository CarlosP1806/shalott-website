const searchForm = document.querySelector('#search-form');
const searchSelect = document.querySelector('#search-select');

searchForm.addEventListener('change', (event) => {
  event.preventDefault();

  if(searchSelect.value === "todo") {
    window.location.href = "/catalogo";
  }
  else if(searchSelect.value.split(" ")[0] === "categoria") {
    window.location.href = 
      `/catalogo/categorias/${searchSelect.value.split(" ")[1]}`;
  }
  else if(searchSelect.value.split(" ")[0] === "coleccion") {
    window.location.href = 
      `/catalogo/colecciones/${searchSelect.value.substring(searchSelect.value.indexOf(" ")).trim()}`;
  }

});