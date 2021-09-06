export default () => {

	const navLinks = document.querySelectorAll( `.nav__link` )
	const groups = document.querySelectorAll( `.group` )
	const titles = document.querySelectorAll( `.group__title` )
	const searchInput = document.querySelector( `.search__input` )
	const searchBtn = document.querySelectorAll( `.search__btn` )
	const crosses = document.querySelectorAll( `.search__btn--cross` )

	const burger = document.querySelector( `.burger` )
	const menuCross = document.querySelector( `.header__btn--cross` )
	const menu = document.querySelector( `.header__menu` )

	const headerInner = document.querySelector( `.header__inner` )
	const headerDown = document.querySelector( `.header__down` )

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

	function group( event ) {

		const groupCurrent = event.currentTarget.parentElement

		const groupCurrentContent = groupCurrent.querySelector( `.group__box` )

		if ( groupCurrent.classList.contains( `group--active` ) ) {

			groupCurrentContent.style.transition = `max-height .1s ease-in-out, padding .1s ease-in-out`

			groupCurrent.classList.remove( `group--active` )
			groupCurrentContent.style.maxHeight = ``
			groupCurrentContent.style.padding = ``

		}

		else {

			groups.forEach( group => {

				const groupBox = group.querySelector( `.group__box` )


				group.classList.remove( 'group--active' )

				groupBox.style.transition = `max-height .1s ease-in-out, padding .1s ease-in-out`
				groupBox.style.maxHeight = ``
				groupBox.style.padding = ``

			} )

			groupCurrentContent.style.transition = ``

			groupCurrent.classList.add( 'group--active' )

			groupCurrentContent.style.maxHeight = `300px`
			groupCurrentContent.style.padding = `32px 19px 40px 40px`

		}

	}

	titles.forEach( title => {

		title.addEventListener( `click`, event => group( event ) )

	} )

	titles.forEach( title => {

		title.addEventListener( `keydown`, event => {

			console.log(`123`)

			if ( event.keyCode === 13 ) {


				group( event )
	
			}
	
		} )

	} )

	// search

	function searchAnim( event ) {

		const key = event.keyCode
		const input = document.querySelector( `.search__input` )

		if ( key === 13 ) {

			input.value = ``

		}

	}

	searchInput.addEventListener( `focus`, () => {

		searchInput.addEventListener( `keydown`, event => searchAnim( event ) )

	} )

	searchBtn.forEach( btn => {

		btn.addEventListener( `click`, event => {

			event.preventDefault()

			let input = event.currentTarget.parentElement.querySelector( `.search__input` )

			if ( window.innerWidth <= 1400 && window.innerWidth > 1024 ) {

				event.currentTarget.parentElement.classList.toggle( `search--active` )

				groups.forEach( group => group.classList.toggle( `group--search` ) )

			}

			else if ( window.innerWidth <= 1024 && window.innerWidth > 924 ) {

				if ( event.currentTarget.parentElement.style.transform === `` ) {

					event.currentTarget.parentElement.style.transform = `translateX(-90%)`
					event.currentTarget.parentElement.style.background = `#18171b`

				}

				else {

					event.currentTarget.parentElement.style.transform = ``
					event.currentTarget.parentElement.style.background = ``

				}

			}

			else if ( window.innerWidth <= 924 && window.innerWidth > 425 ) {

				headerInner.style.transform = `translateX(-95%)`
				headerInner.style.overflow = `initial`

				input.style.width = '75vw'
				input.placeholder = ``

				document.querySelector( `.search__btn--cross` ).style.display = `block`

			}

			else {

				headerDown.querySelector( `.search__input` ).placeholder = ``
				
				headerDown.style.top = `0`

			}

		} )

	} )

	crosses.forEach( cross => {

		cross.addEventListener( `click`, event => {
	
			event.preventDefault()
	
			if ( window.innerWidth > 425 ) {

				headerInner.style.transform = ``
	
				setTimeout( () => {
		
					headerInner.style.overflow = `hidden`
		
					searchInput.style.width = ''
		
					event.target.style.display = ``
		
				} , 300 )

			}

			else headerDown.style.top = ``
	
		} )

	} )

	// menu

	menuCross.addEventListener( `click`, () => menu.style.transform = '' )

	burger.addEventListener( `click`, () => menu.style.transform = 'translateY(0)' )

}