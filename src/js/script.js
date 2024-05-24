$(document).ready(function () {
	$(".input-phone")
		.toArray()
		.forEach(element => {
			const cleave = new Cleave(element, {
				phone: true,
				phoneRegionCode: "ru",
			});
		});

	$("div.documents__item").on("click", function (e) {
		e.stopPropagation();
		// const img = $(this)[0];

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
		console.log(e.target);
		if (e.target.parentElement.classList.contains("zoom")) {
			e.target.classList.toggle("scale");
		}
	});
});
