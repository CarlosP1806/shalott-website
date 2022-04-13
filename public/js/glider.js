const numberCollections =
  parseInt(document.querySelector('.section--collections').dataset.numberCollections);

window.addEventListener("load", () => {
  new Glider(document.querySelector('.carousel__list'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: '.carousel__indicators',
    arrows: {
      prev: '.carousel__prev',
      next: '.carousel__next'
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: numberCollections >= 4 ? 4 : numberCollections,
          slidesToScroll: numberCollections >= 4 ? 4 : numberCollections
        }
      }
    ]
  });
  
  if (window.matchMedia('(min-width: 1200px)').matches) {
    if (numberCollections <= 4) {
      const carouselNext = document.querySelector('.carousel__next');
      carouselNext.style.display = "none";
      const carouselPrev = document.querySelector('.carousel__prev');
      carouselPrev.style.display = "none";
    }
  }
});
