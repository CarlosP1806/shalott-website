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
});