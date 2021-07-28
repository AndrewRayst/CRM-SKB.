export default ( Swiper, SwiperCore, tippy ) => {

	function settings() {

		const windowWidth = document.querySelector( `body` ).offsetWidth

		if ( windowWidth > 1024 ) return [3, 3, 1, 50, 350]

		else if ( windowWidth > 668 ) return [2, 2, 1, 50, 280]

		else if ( windowWidth > 0 ) return [1, 1, 1, 30, 280]

	}

	const param = settings()

	const swiper = new Swiper( `.projectsSwiper`, {

		slidesPerView: param[0],
		slidesPerGroup: param[1],
		spaceBetween: param[3],

		simulateTouch: false,

		navigation: {
			nextEl: `.projects__button--next`,
			prevEl: `.projects__button--prev`,
		},

	} )

	// tippy

	tippy( `#projects__popup-1`, {

		duration: 700,
		animation: 'scale',
		trigger: 'click',
		content: `Пример современных тенденций - современная методология разработки`,

	} )

	tippy( `#projects__popup-2`, {

		duration: 700,
		animation: 'scale',
		trigger: 'click',
		content: `Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции  `,

	} )

	tippy( `#projects__popup-3`, {

		duration: 700,
		animation: 'scale',
		trigger: 'click',
		content: `В стремлении повысить качество `,

	} )

}
