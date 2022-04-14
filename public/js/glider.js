const numberCollections =
  parseInt(document.querySelector('.section--collections').dataset.numberCollections);

window.addEventListener("load", () => {
  
});

if (window.matchMedia('(min-width: 1200px)').matches) {
  if (numberCollections <= 4) {
    const carouselNext = document.querySelector('.carousel__next');
    carouselNext.style.display = "none";
    const carouselPrev = document.querySelector('.carousel__prev');
    carouselPrev.style.display = "none";
  }
}