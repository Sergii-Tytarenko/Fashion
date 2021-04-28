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
});;

/* WebP
-----------------------------------------------------------------------------*/
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});


/* BodyLock
-----------------------------------------------------------------------------*/
let unlock = true;
function body_lock(delay) {
	let body = document.querySelector("body");
	
	if (body.classList.contains("lock")) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}

function body_lock_remove(delay) {
	let body = document.querySelector("body");

	if (unlock) {
		let lock_padding = document.querySelectorAll(".lp");

		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = "0px";
			}
			body.style.paddingRight = "0px";
			body.classList.remove("lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

function body_lock_add(delay) {
	let body = document.querySelector("body");

	if (unlock) {
		let lock_padding = document.querySelectorAll(".lp");

		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
		}
		body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
		body.classList.add("lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}


/* Smoth scroll
-----------------------------------------------------------------------------*/
const linkNav = document.querySelectorAll('.smooth'),
	V = .1; 
for (let link of linkNav) {
	link.addEventListener('click', function (e) {
		e.preventDefault(); 

		let w = window.pageYOffset,  
			hash = this.href.replace(/[^#]*(.*)/, '$1'), 
			t = document.querySelector(hash).getBoundingClientRect().top,  
			start = null;
		requestAnimationFrame(step); 
		
		function step(time) {
			if (start === null) start = time;
			let progress = time - start,
				r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
			window.scrollTo(0,r);
			if (r != w + t) {
				requestAnimationFrame(step)
			} else {
				location.hash = hash  
			}
		}
	});
};