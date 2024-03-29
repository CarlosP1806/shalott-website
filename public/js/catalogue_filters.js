const searchForm = document.querySelector('#search-form');
const searchSelect = document.querySelector('#search-select');
searchForm.addEventListener('change', (event) => {
  event.preventDefault();

  if (searchSelect.value === "todo") {
    window.location.href = "/catalogo";
  }
  else if (searchSelect.value.split(" ")[0] === "categoria") {
    window.location.href =
      `/catalogo/categorias/${searchSelect.value.split(" ")[1]}`;
  }
  else if (searchSelect.value.split(" ")[0] === "coleccion") {
    window.location.href =
      `/catalogo/colecciones/${searchSelect.value.substring(searchSelect.value.indexOf(" ")).trim()}`;
  }
});

const isGroup = document.querySelector("main").dataset.groups === "true";
if (!isGroup) {
  const sortForm = document.querySelector('#sort-form');
  const sortSelect = document.querySelector('#sort-select');
  sortForm.addEventListener('change', (event) => {
    event.preventDefault();

    if (sortSelect.value === "") return;
    else {
      let url = new URL(window.location.href);
      url.searchParams.set('sort', sortSelect.value);
      window.location.href = url;
    }
  });
}

const nextPageArrow = document.querySelector('#next-page');
const prevPageArrow = document.querySelector('#prev-page');

nextPageArrow.addEventListener('click', () => {
  if (nextPageArrow.classList.contains('inactive')) return;

  const page = getParameterByName("page");
  let url = new URL(window.location.href);
  if (!page) {
    url.searchParams.set('page', 2)
  } else {
    url.searchParams.set('page', parseInt(page) + 1);
  }
  window.location.href = url;
});

prevPageArrow.addEventListener('click', () => {
  if (prevPageArrow.classList.contains('inactive')) return;

  const page = getParameterByName("page");
  let url = new URL(window.location.href);
  url.searchParams.set('page', parseInt(page) - 1);
  window.location.href = url;
});

// Utility function to get query params
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}