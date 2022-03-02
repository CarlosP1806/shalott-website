const navMenu = document.querySelector('.menu');
const navMobile = document.querySelector('.nav-mobile')
const closeMobileMenu = document.querySelector('.nav__close--mobile');
const overlay = document.querySelector('.header__overlay');

navMenu.addEventListener('click', () => {
    navMobile.classList.add('active');
    overlay.classList.add('active');
    document.querySelector('body').style.setProperty('overflow', 'hidden');
});

closeMobileMenu.addEventListener('click', () => {
    navMobile.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('body').style.setProperty('overflow', 'auto');
});

overlay.addEventListener('click', () => {
    navMobile.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('body').style.setProperty('overflow', 'auto');
});