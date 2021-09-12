export default ( Swiper, SwiperCore, Сhoices ) => {

	const galleryBtnPrev = document.querySelector( `.gallery__btn--prev` )
	const galleryBtnNext = document.querySelector( `.gallery__btn--next` )

	const wrapper = document.querySelector( `.gallery__wrapper` )

	const gallery_choices = new Сhoices( document.getElementById( `gallery__select` ), {
		searchEnabled: false,

		itemSelectText: ``,

	} )

	const choices = document.querySelector( `.choices` )

	choices.setAttribute( `tabindex`, `18` )
	choices.setAttribute( `aria-label`, `Секция - Галерея. Фильтр произведений искусства` )

	function settings() {

		const windowWidth = document.querySelector( `body` ).offsetWidth

		if ( windowWidth > 1630 ) return [3, 3, 2, 47, 350]

		// else if ( windowWidth > 768 ) return [2, 2, 2, 34, 280]

		else if ( windowWidth > 668 ) return [2, 2, 2, 34, 280]

		else if ( windowWidth > 0 ) return [1, 1, 1, 30, 280]

	}

	const param = settings()

	// SWIPER

	const swiper = new Swiper( `.gallerySwiper`, {

		direction: `horizontal`,

		slidesPerView: param[0],
		slidesPerGroup: param[1],
		slidesPerColumn: param[2],
		spaceBetween: param[3],

		simulateTouch: false,

		navigation: {
			nextEl: `.gallery__btn--next`,
			prevEl: `.gallery__btn--prev`,
		},

		pagination: {

			el: `.gallery__pagination`,
			type: `fraction`,
		},

	} )

	// wrapper.style.width = `${(12 * param[4]) + (11 * param[3])}px`

	function imitateClick( event ) {

		if ( event.keyCode === 13 ) {

			event.path[0].click()

		}

	}

	galleryBtnPrev.addEventListener( `keydown`, event => imitateClick( event ) )

	galleryBtnNext.addEventListener( `keydown`, event => imitateClick( event ) )
	
}