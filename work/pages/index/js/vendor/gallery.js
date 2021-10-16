export default ( Swiper, SwiperCore, Сhoices ) => {

	const gallery_choices = new Сhoices( document.getElementById( `gallery__select` ), {
		searchEnabled: false,

		itemSelectText: ``,

	} )

	const choices = document.querySelector( `.choices` )

	choices.setAttribute( `tabindex`, `0` )
	choices.setAttribute( `aria-label`, `Секция - Галерея. Фильтр произведений искусства` )

	// SWIPER

	const swiper = new Swiper( `.gallerySwiper`, {

		direction: `horizontal`,

		slidesPerView: 1,
		slidesPerGroup: 1,
		slidesPerColumn: 1,
		spaceBetween: 30,

		simulateTouch: false,

		navigation: {
			nextEl: `.gallery__btn--next`,
			prevEl: `.gallery__btn--prev`,
		},

		pagination: {

			el: `.gallery__pagination`,
			type: `fraction`,
		},

		breakpoints: {
			668: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				slidesPerColumn: 2,
				spaceBetween: 34,
			},

			1630: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				slidesPerColumn: 2,
				spaceBetween: 47,
			},
		},

	} )

	// SWIPER INDEX

	const gallerySlides = document.querySelectorAll( `.gallery-slide` )
	const btnLeft = document.querySelector( `.gallery__btn--prev` )
	const btnRight = document.querySelector( `.gallery__btn--next` )
	let swiperPage = document.querySelector( `.gallery` ).querySelector( `.swiper-pagination-current` ).textContent

	btnRight.addEventListener( `click`, () => {

		swiperPage = document.querySelector( `.gallery` ).querySelector( `.swiper-pagination-current` ).textContent

		swiperIndex()

	} )

	btnRight.addEventListener( `keydown`, ( event ) => {

		swiperPage = document.querySelector( `.gallery` ).querySelector( `.swiper-pagination-current` ).textContent

		if ( event.keyCode === 13 ) swiperIndex()

	} )

	btnLeft.addEventListener( `click`, () => {

		swiperPage = document.querySelector( `.gallery` ).querySelector( `.swiper-pagination-current` ).textContent

		swiperIndex()

	} )

	btnLeft.addEventListener( `keydown`, ( event ) => {

		swiperPage = document.querySelector( `.gallery` ).querySelector( `.swiper-pagination-current` ).textContent

		if ( event.keyCode === 13 ) swiperIndex()

	} )

	function swiperIndexCount() {

		const width = window.innerWidth

		if ( width < 1630 ) {

			return 4

		}

		else if ( width < 668 ) {

			return 1

		}

		else {

			return 6

		}

	}

	function swiperIndex() {

		gallerySlides.forEach( el => el.tabIndex = -1 )

		const count = swiperIndexCount()

		for ( let i = ( swiperPage - 1 ) * count; i < count * swiperPage; i++ ) {

			gallerySlides[i].tabIndex = 0

		}

	}

	swiperIndex()

}