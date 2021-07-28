export default ( Swiper, SwiperCore ) => {

	const windowWidth = document.querySelector( `body` ).offsetWidth

	function settings( windowWidth ) {

		if ( windowWidth > 1630 ) return [3, 3, 1, 50, 350]

		else if ( windowWidth > 668 ) return [2, 2, 1, 38, 280]

		else if ( windowWidth > 425 ) return [1, 1, 1, 34, 280]

	}

	const param = settings( windowWidth )

	if ( windowWidth > 425 ) {

		const swiper = new Swiper( `.editionSwiper`, {
	
			slidesPerView: param[0],
			slidesPerGroup: param[1],
			spaceBetween: param[3],
	
			simulateTouch: false,
	
			navigation: {
				nextEl: `#edition__button--next`,
				prevEl: `#edition__button--prev`,
			},
	
			pagination: {
	
				el: `#edition__pagination`,
				type: `fraction`,
			},
	
		} )

	}


}