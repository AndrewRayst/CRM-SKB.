export default ( Swiper, SwiperCore ) => {

	// SWIPER

	const swiper = new Swiper( `.eventsSwiper`, {

		direction: `horizontal`,

		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 30,

		simulateTouch: false,

		pagination: {

			el: `.events__pagination`,
			type: `bullets`,
		},

	} )

}