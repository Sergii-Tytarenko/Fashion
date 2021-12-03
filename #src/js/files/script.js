/* Burger 
-----------------------------------------------------------------------------*/
const body = document.querySelector('body'),
      mainHeader = document.querySelector('.main-header'),
      burger = document.querySelector('.burger'),
      burgerNav = document.querySelector('.main-header__group'),
      burgerNavLink = burgerNav.querySelectorAll('a[href]'),
      overlay = document.querySelector('.overlay');

/* Burger active
   Show burger nav
-----------------------------------------------------------------------------*/
burger.addEventListener('click', function () {
    if (burger) {
        burger.classList.toggle('active');
    }
    if ( burger.classList.contains('active') ) {
        showBurgerNav ();
    } else {
        closeBurgerNav ();
    }
});


/* Close menu when links is active
-----------------------------------------------------------------------------*/
for (let i = 0; i < burgerNavLink.length; i++) {
    burgerNavLink[i].addEventListener("click", function() {
        if(burgerNav.classList.contains('active')) {
            closeBurgerNav ();
        }
    });
}


/* Overlay clck close
---------------------------------------------------------------*/
overlay.addEventListener('click', () => {
    closeBurgerNav();
})


/* Functions of burger nav
-----------------------------------------------------------------------------*/
function showBurgerNav () {
    burgerNav.classList.add('active');
    mainHeader.classList.add('active');
    overlay.classList.add('active');
}

function closeBurgerNav () {
    burger.classList.remove('active');
    burgerNav.classList.remove('active');
    mainHeader.classList.remove('active');
    overlay.classList.remove('active');
}


/* Crop text
---------------------------------------------------------------*/
(function () {

    const cropElement = document.querySelectorAll('.crop-text'),
          size = 21,                                          
          endCharacter = '...';                                

    cropElement.forEach(el => {
        let text = el.innerHTML.split(" ");

        if (text.length > size) {
            text = text.slice(0, size).join(" ");
            el.innerHTML = text + endCharacter;
        }
    });

}());


/* Insta slider
---------------------------------------------------------------*/
const instaSlider = document.querySelector('.insta__slider');
let mySwiper;

function mobileSlider() {
	if (window.innerWidth < 575 && instaSlider.dataset.mobile == 'false') {
		mySwiper = new Swiper(instaSlider, {
			slidesPerView: 1.15,
            spaceBetween: 10,
            wrapperClass: 'insta__wrapper',
            slideClass: 'insta__link',
		});

		instaSlider.dataset.mobile = 'true';
	}

	if (window.innerWidth >= 575) {
		instaSlider.dataset.mobile = 'false';
		if (instaSlider.classList.contains('swiper-container-initialized')) {
			mySwiper.destroy();
		}
	}
}

mobileSlider()

window.addEventListener('resize', () => {
	mobileSlider();
});