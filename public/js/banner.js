const bannerBtn = document.querySelector('.banner__btn');
bannerBtn.addEventListener("click", () => {
  document.location.replace('/catalogo');
})

let counter = 1;
document.getElementById('radio' + counter).checked = true;
setInterval(function () {
  counter++;
  if(counter > 4) counter = 1;
  document.getElementById('radio' + counter).checked = true;
}, 5000);