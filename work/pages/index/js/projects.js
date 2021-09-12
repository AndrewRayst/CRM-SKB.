export default () => {

	const btns = document.querySelectorAll( `.projects__button` )
	const iPopups = document.querySelectorAll( `.projects__i` )

	function clickImitate( i ) {

		i.addEventListener( `keydown`, event => {

			if ( event.keyCode === 13 ) {

				i.click()

			}

		} )

	} 

	let tabIndexCount = 1
	const slider = document.querySelector( `.projectsSwiper` )
	const slides = document.querySelectorAll( `.projects__slide` )
	const slide = slides[0]
	const projectsCardsSlides = Math.floor( slider.offsetWidth / slide.offsetWidth )

	function projectsCardsTabIndex( btn ) {

		if ( btn === `left` && tabIndexCount > 0 ) tabIndexCount -= 1

		else if ( btn === `right` && tabIndexCount < projectsCardsSlides ) tabIndexCount += 1

		let tabindex = 202
		let start = ( projectsCardsSlides * tabIndexCount ) - projectsCardsSlides
		let end = projectsCardsSlides * tabIndexCount

		slides.forEach( slide => {

			slide.setAttribute( `tabindex`, `-1` )

		} )

		for ( let slide = start; slide < end; slide++ ) {

			slides[slide].setAttribute( `tabindex`, `${tabindex}` )

			++tabindex

		}

	}

	document.querySelector( `.projects__button--next` ).addEventListener( `keydown`, event => {

		if ( event.keyCode === 13 ) projectsCardsTabIndex( `right` )

	} )

	document.querySelector( `.projects__button--prev` ).addEventListener( `keydown`, event => {

		if ( event.keyCode === 13 ) projectsCardsTabIndex( `left` )

	} )

	btns.forEach( i => clickImitate( i ) )

	iPopups.forEach( i => clickImitate( i ) )

}