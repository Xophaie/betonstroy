$(document).ready(function () {
	$(".navigation__open-button").on("click", function () {
		$(".navigation__menu").toggleClass("d-none");
		$(".menu-toggle").toggleClass("open");
	});
});
