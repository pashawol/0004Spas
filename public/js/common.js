"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var $ = jQuery;
var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".top-nav__menu-block"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".top-nav__menu-block li a")),
	body: document.querySelector("body"),
	modalCall: function modalCall() {
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
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		$(".link-modal").click(function () {
			var th = $(this);
			var modal = $(th.attr('href'));
			var content = {
				title: th.data('title'),
				text: th.data('text'),
				btn: th.data('btn'),
				order: th.data('order')
			};
			modal.find('.ttu').html(content.title);
			modal.find('.after-headline').html(content.text);
			modal.find('.btn').val(content.btn);
			modal.find('.order').val(content.order);
		});
	},
	// /magnificPopupCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (_this.btnToggleMenuMobile) {
			_this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active"); // _this.body.classList.toggle("fixed");


					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		var _this = this;

		if (_this.menuMobile) {
			_this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});

			_this.menuMobile.classList.remove("active"); // _this.body.classList.remove("fixed");

		}
	},
	mobileMenu: function mobileMenu() {
		// закрыть/открыть мобильное меню
		var _this = this;

		if (_this.menuMobileLink) {
			_this.toggleMenu(); // document.addEventListener('mouseup', function (event) {
			// 	let container = event.target.closest(".menu-mobile--js.active"); // (1)
			// 	if (!container) {
			// 		_this.closeMenu();
			// 	}
			// }, { passive: true });

		}
	},
	// /mobileMenu
	inputMask: function inputMask() {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	} // /inputMask

};

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.mobileMenu();
	JSCCommon.inputMask(); // JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect

	$(".main-wrapper").after('<div class="pixel-perfect" style="background-image: url(screen/04.png);"></div>'); // /добавляет подложку для pixel perfect
	// /закрыть/открыть мобильное меню

	function heightses() {
		// скрывает моб меню
		// const topH = document.querySelector('header').scrollHeight;
		// let stickyElement = document.querySelector('.top-nav')
		// window.onscroll = () => {
		// 	if ($(window).scrollTop() > topH) {
		// 		stickyElement.classList.add('fixed');
		// 	} else {
		// 		stickyElement.classList.remove('fixed'); 
		// 	}
		// };
		// конец добавил
		if (window.matchMedia("(min-width: 992px)").matches) {
			JSCCommon.closeMenu();
		}
	}

	window.addEventListener('resize', function () {
		heightses();
	}, {
		passive: true
	});
	heightses(); // листалка по стр

	$(" .top-nav li a, .scroll-link").click(function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html, body').animate({
			scrollTop: destination
		}, 1100);
		return false;
	});
	var defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		}
	};
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		// spaceBetween: 0,
		slidesPerView: 'auto',
		// loop: true,
		freeMode: true,
		loopedSlides: 5,
		//looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true
	});
	var swipersHead = new Swiper('.headerBlock__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		watchOverflow: true,
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.headerBlock .swiper-button-next',
			prevEl: '.headerBlock .swiper-button-prev'
		},
		pagination: {
			el: '.headerBlock .swiper-pagination',
			type: 'bullets',
			clickable: true
		} // thumbs: {
		// 	swiper: galleryThumbs,
		// },

	}));
	var swipersCase = new Swiper('.sCases__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		watchOverflow: true,
		slidesPerView: 1,
		breakpoints: {
			992: {
				slidesPerView: 6
			}
		},
		loop: true,
		navigation: {
			nextEl: '.sCases .swiper-button-next',
			prevEl: '.sCases .swiper-button-prev'
		}
	}));
	var swiperssLogos = new Swiper('.sLogos__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		watchOverflow: true,
		slidesPerView: 2,
		breakpoints: {
			576: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 4
			},
			992: {
				slidesPerView: 6
			}
		},
		loop: true,
		navigation: {
			nextEl: '.sLogos .swiper-button-next',
			prevEl: '.sLogos .swiper-button-prev'
		}
	})); // function tabSlider(){

	function tabscostume(tab) {
		var params = _objectSpread(_objectSpread({}, defaultSl), {}, {
			watchOverflow: true,
			slidesPerView: 1,
			breakpoints: {
				992: {
					slidesPerView: 6
				}
			},
			loop: true,
			navigation: {
				nextEl: '.tabs__content.active .swiper-button-next',
				prevEl: '.tabs__content.active .swiper-button-prev'
			}
		});

		var mySwiper = new Swiper($(".tabs__content.active").find('.tab-slider-js'), params);
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).addClass('active').fadeIn(function () {
				var slider = $(this).find('.tab-slider-js');

				if (slider.hasClass("swiper-container-initialized")) {
					mySwiper.update();
				} else {
					mySwiper = new Swiper(slider, params);
				}
			}); // swiper6.destroy();
		}); // }
		// mySwiper.on('init', function() { /* do something */ });
		// // mySwiper.slideNext();
		// mySwiper.init();
	}

	tabscostume('tabs');
	var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

	if (isIE11) {
		$("body").prepend("<p   class=\"browsehappy container\">\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u0432\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435 \u0443\u0441\u0442\u0430\u0440\u0435\u0432\u0448\u0438\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, <a href=\"http://browsehappy.com/\" target=\"_blank\">\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0432\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440</a>, \u0447\u0442\u043E\u0431\u044B \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C, \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u043E\u0433\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430 \u0438 \u043F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C.</p>");
	} // First we get the viewport height and we multiple it by 1% to get a value for a vh unit


	var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

	document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
	var vw = window.innerWidth * 0.01; // Then we set the value in the --vh custom property to the root of the document

	document.documentElement.style.setProperty('--vw', "".concat(vw, "px")); // We listen to the resize event

	window.addEventListener('resize', function () {
		// We execute the same script as before
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		var vw = window.innerWidth * 0.01;
		document.documentElement.style.setProperty('--vw', "".concat(vw, "px"));
	}, {
		passive: true
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}