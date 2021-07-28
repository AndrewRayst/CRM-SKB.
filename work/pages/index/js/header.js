export default () => {

	const navLinks = document.querySelectorAll( `.nav__link` )
	const groups = document.querySelectorAll( `.group` )
	const search = document.querySelector( `.search__input` )

	// links

	function scrolling( event ) {

		event.preventDefault()

		const section = document.querySelector( `.${event.currentTarget.dataset.section}` )

		section.scrollIntoView( {

			behavior: `smooth`,
			block: `start`,

		} )

	}

	navLinks.forEach( link => {

		link.addEventListener( `click`, event => scrolling( event ) )

	} )

	// groups

	function groupOpen( event ) {

		const groupArrow = event.currentTarget.querySelector( `.group__icon ` ).children[0]

		groupArrow.style.transition = `transform .3s ease-in-out`

		if ( groupArrow.style.transform === `` ) {

			groupArrow.style.transform = `rotateZ(180deg)`

		}

		else {

			groupArrow.style.transform = ``

		}

	}

	function groupClouse( event ) {

		const groupArrow = event.currentTarget.querySelector( `.group__icon ` ).children[0]

		groupArrow.style.transform = ``

	}

	groups.forEach( link => {

		link.addEventListener( `click`, event => groupOpen( event ) )

	} )

	groups.forEach( link => {

		link.addEventListener( `keydown`, event => {

			if ( event.keyCode === 13 ) groupOpen( event )

		} )

	} )

	groups.forEach( link => {

		link.addEventListener( `blur`, event => groupClouse( event ) )

	} )

	// search

	function searchAnim( event ) {

		const key = event.keyCode
		const input = document.querySelector( `.search__input` )

		if ( key === 13 ) {

			input.value = ``

		}

	}

	search.addEventListener( `focus`, () => {

		search.addEventListener( `keydown`, event => searchAnim( event ) )

	} )

}