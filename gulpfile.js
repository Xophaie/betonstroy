const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");
const sourceMaps = require("gulp-sourcemaps");

gulp.task("html", () => {
	return gulp
		.src("./src/*.html")
		.pipe(
			fileInclude({
				prefix: "@@",
				basepath: "@file",
			})
		)
		.pipe(gulp.dest("./dist/"));
});

gulp.task("sass", function () {
	return gulp
		.src("./src/css/*.scss")
		.pipe(sourceMaps.init())
		.pipe(sass())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest("./dist/css/"));
});

gulp.task("images", function () {
	return gulp.src("./src/img/**/*").pipe(gulp.dest("./dist/img/"));
});

gulp.task("server", function () {
	return gulp.src("./dist").pipe(
		server({
			livereload: true,
			open: true,
		})
	);
});

gulp.task("clean", function (done) {
	if (fs.existsSync("./dist")) {
		return gulp.src("./dist").pipe(clean());
	}

	done();
});

gulp.task("watch", function () {
	gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass"));
	gulp.watch("./src/**/*.html", gulp.parallel("html"));
	gulp.watch("./src/img/**/*", gulp.parallel("images"));
});

gulp.task(
	"build",
	gulp.series(
		"clean",
		gulp.parallel("sass", "html", "images"),
		gulp.parallel("server", "watch")
	)
);
