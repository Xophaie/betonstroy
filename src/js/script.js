$(document).ready(function () {
	$(".navbar-toggler").on("click", function () {
		$("body").toggleClass("modal-open");
		// $(".navigation").toggleClass("show");
	});

	$(".consulting .form__control input").on("input", function (e) {
		if (e.target.value !== "") {
			$(this).siblings("label").addClass("d-none");
		} else {
			$(this).siblings("label").removeClass("d-none");
		}
	});

	// Cleave

	$(".input-phone")
		.toArray()
		.forEach(element => {
			const cleave = new Cleave(element, {
				phone: true,
				phoneRegionCode: "ru",
			});
		});

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

	const feedbackSwiper = new Swiper(".feedback__swiper", {
		direction: "horizontal",
		loop: true,
		slidesPerView: 1,

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		pagination: {
			el: ".swiper-pagination",
		},

		breakpoints: {
			769: {
				slidesPerView: 3,
			},
		},
	});

	console.log(feedbackSwiper);

	$().fancybox({
		selector: '[data-fancybox="images"]',
		hash: true,
		animationEffect: "fade",
	});

	// $(window).on("resize", function () {
	// 	if (window.matchMedia("(min-width: 769px)").matches) {
	// 		feedbackSwiper.slidesPerView = 3;
	// 	} else {
	// 		feedbackSwiper.slidesPerView = 1;
	// 		feedbackSwiper.pagination = {
	// 			el: ".swiper-pagination",
	// 		};
	// 	}
	// });

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
			$thumbNode.attr("alt", "Бетон Строй на Ютуб>");
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

	// Копирайт
	let year = new Date().getFullYear();
	$("#year").text(year);
});
