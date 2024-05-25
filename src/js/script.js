$(document).ready(function () {
	const API_KEY = "2dd8f4e7-5d76-468a-9fad-c904f7a814b7";

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

	// Обзор
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

	// Отзывы
	// Переключение двух видов слайдеров в зависимости от ширины экрана
	// Вид слайдера определяется только по инициализации. Смена видов не происходит динамически при изменении ширины экрана в инструментах разработчика-
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

	// Специальные отзывы
	const specialFeedbackSwiper = new Swiper(".special-feedback__swiper", {
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

	ymaps.ready(init);

	// Карта
	function init() {
		let map = new ymaps.Map("map", {
			center: [55.650625, 37.62708],
			zoom: 12,
		});

		let BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div style="margin: 0px;">' + "<p>Привет, мир!</p>" + "</div>"
		);

		let placemark = new ymaps.Placemark(
			[55.650625, 37.62708],
			{
				name: "Привет, мир!",
			},
			{
				balloonContentLayout: BalloonContentLayout,
				balloonPanelMaxMapArea: 0,
			}
		);

		map.geoObjects.add(placemark);
	}

	// Облегчить ютуб видео
	function labnolIframe($div) {
		let $iframe = $("<iframe></iframe>");

		$iframe.attr(
			"src",
			"https://www.youtube.com/embed/" + $div.dataset.id + "?autoplay=1"
		);
		$iframe.attr("frameborder", "0");
		$iframe.attr("allowfullscreen", "1");
		$iframe.attr(
			"allow",
			"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		);
		$div.innerHTML = "";
		$div.append($iframe[0]);
	}

	function initYouTubeVideos() {
		let playerElements = $(".youtube-player");
		for (let n = 0; n < playerElements.length; n++) {
			let videoId = playerElements[n].dataset.id;
			let $div = $("<div></div>");
			$div.attr("data-id", videoId);
			let $thumbNode = $("<img> </img>");
			$thumbNode.attr(
				"src",
				"//i.ytimg.com/vi/ID/hqdefault.jpg".replace("ID", videoId)
			);
			$div.append($thumbNode);
			let $playButton = $("<div></div>");
			$playButton.attr("class", "play");
			$div.append($playButton);
			$div.on("click", function () {
				labnolIframe(this);
			});
			playerElements[n].append($div[0]);
		}
	}

	initYouTubeVideos();
});
