// import Swiper from "./libs/swiper-bundle.min";
// import { Navigation, Pagination } from "./libs/swiper-bundle.min";

$(document).ready(function () {
	// Cleave
	const $window = $(window);
	const $feedbackSwiperDOM = $(".feedback .swiper");

	$(".input-phone")
		.toArray()
		.forEach(element => {
			const cleave = new Cleave(element, {
				phone: true,
				phoneRegionCode: "ru",
			});
		});

	// Документы

	$("div.documents__item").on("click", function (e) {
		e.stopPropagation();

		if (e.target.classList.contains("zoom")) {
			$(this).removeClass("zoom");
			$(this).children(".documents__img").removeClass("scale");
			$("body").removeClass("modal-open");
		} else {
			$(this).addClass("zoom");
			$("body").addClass("modal-open");
		}
	});

	$(".documents__img").on("click", function (e) {
		if (e.target.parentElement.classList.contains("zoom")) {
			e.target.classList.toggle("scale");
		}
	});

	// Слайдеры

	const overviewSwiper = new Swiper(".overview__swiper", {
		direction: "horizontal",
		loop: true,

		pagination: {
			el: ".swiper-pagination",
		},

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	// Переключение двух видов слайдеров в зависимости от ширины экрана
	// Вид слайдера определяется только по инициализации. Смена видов не происходит динамически при изменении ширины экрана в инструментах разработчика
	$window.on("resize", function () {
		if (window.matchMedia("(min-width: 767px)").matches) {
			const feedbackSwiper = new Swiper(".feedback__swiper", {
				direction: "horizontal",
				loop: true,
				slidesPerView: 3,

				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
		} else {
			const feedbackSwiper = new Swiper(".feedback__swiper", {
				direction: "horizontal",
				loop: true,
				slidesPerView: 1,

				pagination: {
					el: ".swiper-pagination",
				},

				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
		}
	});
});
