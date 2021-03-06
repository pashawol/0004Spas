const $ = jQuery;
const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".top-nav__menu-block"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".top-nav__menu-block li a")),
	body: document.querySelector("body"),

	modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		$(".link-modal").click(function () {
			let th = $(this);
			let modal = $(th.attr('href'));
			let content = {
				title: th.data('title'),
				text: th.data('text'),
				btn: th.data('btn'),
				order: th.data('order')
			}
			modal.find('.ttu').html(content.title);
			modal.find('.after-headline').html(content.text);
			modal.find('.btn').val(content.btn);
			modal.find('.order').val(content.order);
		})
	},
	// /magnificPopupCall
	toggleMenu() {
		let _this = this;
		if (_this.btnToggleMenuMobile) {

			_this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {

					_this.btnToggleMenuMobile.forEach(function (element) {
						element.classList.toggle("on");
					});
					_this.menuMobile.classList.toggle("active");
					// _this.body.classList.toggle("fixed");

					return false;
				});
			});
		}
	},

	closeMenu() {
		let _this = this;
		if (_this.menuMobile) {

			_this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");

			});
			_this.menuMobile.classList.remove("active");
			// _this.body.classList.remove("fixed");
		}

	},

	mobileMenu() {
		// закрыть/открыть мобильное меню
		let _this = this;
		if (_this.menuMobileLink) {

			_this.toggleMenu();
			// document.addEventListener('mouseup', function (event) {
			// 	let container = event.target.closest(".menu-mobile--js.active"); // (1)
			// 	if (!container) {
			// 		_this.closeMenu();

			// 	}
			// }, { passive: true });
		}
	},
	// /mobileMenu
 
	inputMask() {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	}
	// /inputMask

};

function eventHandler() { 
	JSCCommon.modalCall();
 

	JSCCommon.mobileMenu();

	JSCCommon.inputMask();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect

	// $(".main-wrapper").after('<div class="pixel-perfect" style="background-image: url(screen/about.png);"></div>')
	// /добавляет подложку для pixel perfect


	// /закрыть/открыть мобильное меню
	let stickyElement = document.querySelector('.btn-top--js')

	stickyElement.addEventListener('click', () => {
	 
		document.documentElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		 
	})

	function heightses() {
 
		// скрывает моб меню

		//select element after
		const topH = document.documentElement.clientHeight / 2;
		window.onscroll = () => { $(window).scrollTop() > topH  
				? stickyElement.classList.add('active')
				: stickyElement.classList.remove('active');
		};
		// конец добавил
		if (window.matchMedia("(min-width: 992px)").matches) {
			JSCCommon.closeMenu();
		}
	}

	window.addEventListener('resize', () => {
		heightses();

	}, { passive: true });

	heightses();

	// листалка по стр
	$(" .top-nav li a, .scroll-link").click(function () {
		const elementClick = $(this).attr("href");
		const destination = $(elementClick).offset().top;

		$('html, body').animate({ scrollTop: destination }, 1100);

		return false;
	});

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
	}
	
	
 
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		// spaceBetween: 0,
		slidesPerView: 'auto',
		// loop: true,
		freeMode: true,
		loopedSlides: 5, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true,
	});

	const swipersHead = new Swiper('.headerBlock__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		watchOverflow: true,
		slidesPerView: 1,
	 
		loop: true,
		navigation: {
			nextEl: '.headerBlock .swiper-button-next',
			prevEl: '.headerBlock .swiper-button-prev',
		},
		pagination: {
			el: '.headerBlock .swiper-pagination',
			type: 'bullets',
			clickable: true,

		},
		// thumbs: {
		// 	swiper: galleryThumbs,
		// },
	});

	const swipersCase = new Swiper('.sCases__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		watchOverflow: true,
		slidesPerView: 1,
		breakpoints: { 
		
			768: {
				slidesPerView: 2
			},
			992: {
				slidesPerView: 6
			},
		},
		loop: true,
		navigation: {
			nextEl: '.sCases .swiper-button-next',
			prevEl: '.sCases .swiper-button-prev',
		},
	});
	const swiperssLogos = new Swiper('.sLogos__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		// loop: true,
		watchOverflow: true,
		breakpoints: { 
			576: {
				slidesPerView: 3
			},
			
			768: {
				slidesPerView: 4
			},

			992: {
				slidesPerView: 6
			},
		},
		navigation: {
			nextEl: '.sLogos .swiper-button-next',
			prevEl: '.sLogos .swiper-button-prev',
		},
	});
	swiperssLogos.lazy.load();

	const swiperCertificates = new Swiper('.slider-certificates', {
		// slidesPerView: 5,
		...defaultSl,
		watchOverflow: true,
		slidesPerView: 2,
		spaceBetween: 5,
		breakpoints: { 
			576: {
				spaceBetween: 10
			},
			
			768: {
				slidesPerView: 3,
				spaceBetween: 30
			},

			992: {
				slidesPerView: 4,
				spaceBetween: 60
			},
		},
		loop: true,
		navigation: {
			nextEl: '.sMoreAbout .swiper-button-next',
			prevEl: '.sMoreAbout .swiper-button-prev',
		},
	});

	// function tabSlider(){
	function tabscostume(tab) {
		var params = {
			// init: false
			...defaultSl,
			watchOverflow: true,
			slidesPerView: 1,
			breakpoints: {
				768: {
					slidesPerView: 2
				},
				992: {
					slidesPerView: 6
				},
			},
			loop: true,
			navigation: {
				nextEl: '.tabs__content.active .swiper-button-next',
				prevEl: '.tabs__content.active .swiper-button-prev',
			},
		}
		var mySwiper = new Swiper($(".tabs__content.active").find('.tab-slider-js'), params);

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).addClass('active').fadeIn(function () {
					var slider = $(this).find('.tab-slider-js');
					if (slider.hasClass("swiper-container-initialized")) {
						mySwiper.update();
					}
					else {
						mySwiper = new Swiper(slider, params);
					}
				});
			// swiper6.destroy();
		});

		// }
		// mySwiper.on('init', function() { /* do something */ });
		// // mySwiper.slideNext();
		// mySwiper.init();
	}

	tabscostume('tabs');

	//footer year
	function setFooterYear() {
		let allRights = document.querySelector('.footer__all-rights-txt');
		if (!allRights) return

		let currYear = new Date().getFullYear();
		allRights.innerHTML = allRights.innerHTML + currYear +'г.';
	}
	setFooterYear();


	var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
	if (isIE11) {
		$("body").prepend(`<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>`)

	}

	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	let vw = window.innerWidth * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vw', `${vw}px`);

	// We listen to the resize event
	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		let vw = window.innerWidth * 0.01;
		document.documentElement.style.setProperty('--vw', `${vw}px`);
	}, { passive: true });
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
