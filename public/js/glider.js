const numberCollections =
  parseInt(document.querySelector('.section--collections').dataset.numberCollections);

window.addEventListener("load", () => {
  $('.carousel__list').slick({
    dots: true,
    infinite: true,
    prevArrow: '.carousel__prev',
    nextArrow: '.carousel__next',
    appendDots: '.carousel__indicators',
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});