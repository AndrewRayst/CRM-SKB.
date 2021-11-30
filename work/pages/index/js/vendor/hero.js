export default ( Swiper ) => {

	const swiper = new Swiper( `.hero-swiper--container`, {

		simulateTouch: false,
		autoplay: {
			delay: 1000,
			// disableOnInteraction: false,
			disableOnInteraction: false,
		},
		loop: false,

	} )

}