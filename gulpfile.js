const { src, dest, parallel } = require("gulp"); /*Инициализация констант gulp*/ 
const newer        = require("gulp-newer");                     /*Проверка на уже сжатые изображения*/
const ttf2woff     = require("gulp-ttf2woff");                  /*Конвертор в woff*/
const ttf2woff2    = require("gulp-ttf2woff2");                 /*Конвертор в woff2*/

/*FONTS*/

function to_woff() {
	return src("fonts/*.ttf")
	.pipe(ttf2woff())
	.pipe(newer("src/assets/fonts/"))
	.pipe(dest("src/assets/fonts/"))
}

function to_woff2() {
	return src("fonts/*.ttf")
	.pipe(ttf2woff2())
	.pipe(newer("src/assets/fonts/"))
	.pipe(dest("src/assets/fonts/"))
}

exports.woff = to_woff;
exports.all = parallel( to_woff, to_woff2 );
exports.default = to_woff2;