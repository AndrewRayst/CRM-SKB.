export default () => {

	const btn = document.querySelector( `.gallery__btn--next` )
	const modal = document.querySelector( `.gallery-modal` )

	const gallerySwiper = {

		target: document.querySelector( `.gallery__right` ),

		width() {

			return this.target.offsetWidth

		},

		height() {

			return this.target.offsetHeight

		},

	}

	const gallerySlide = {

		target: document.querySelectorAll( `.gallery-slide` ),

		width() {

			return this.target[0].offsetWidth

		},

		height() {

			return this.target[0].offsetHeight

		},

	}

	function slidesQuantity() {

		const slidesPage = document.getElementById( `gallery__pagination` ).children[0].innerHTML

		const slidesQuantity_row = Math.floor( gallerySwiper.width() / gallerySlide.width() )
		const slidesQuantity_column = Math.floor( gallerySwiper.height() / gallerySlide.height() )

		return {

			quantity: slidesQuantity_row * slidesQuantity_column,

			start: slidesQuantity_row * slidesQuantity_column * slidesPage - slidesQuantity_row * slidesQuantity_column,
			end: slidesQuantity_row * slidesQuantity_column * slidesPage,

		}

	}

	btn.addEventListener( `keydown`, event => {

		if ( event.keyCode === 9 ) {

			const slides = slidesQuantity()
			let tabindex = 52

			gallerySlide.target.forEach( i => {

				i.removeAttribute( `tabindex` )

			} )

			for ( let slide = slides.start; slide < slides.end; slide++ ) {

				gallerySlide.target[slide].setAttribute( `tabindex`, `${tabindex}` )

				++tabindex

			}

		}

	} )

	function slideModal( target ) {

		const modalExit = document.querySelector( `.gallery-modal__exit` )
		const gallery = document.querySelector( `.gallery` )
		const modalImg = document.querySelector( `.gallery-modal__img` )
		const modalDescribe = document.querySelector( `.gallery-modal__text` )

		gallery.scrollIntoView( {

			behavior: `smooth`,
			block: `start`,

		} )

		const painting = document.createElement( `img` )

		painting.setAttribute( `src`, `${target.children[0].getAttribute( `src` )}` )

		modalImg.append( painting )

		modal.style.display = 'block'

		modalDescribe.focus()

		document.querySelector( `body` ).style.background = `rgba(0,0,0,.6)`

		// gallery.scrollIntoView( {

		// 	behavior: `smooth`,
		// 	block: `start`,

		// } )

		modalExit.addEventListener( `keydown`, event => {

			if ( event.keyCode === 13 ) {

				document.querySelector( `body` ).style.background = ``

				modal.style.display = ''
				target.focus()
				if ( modalImg.querySelector( `img` ) ) modalImg.querySelector( `img` ).remove()

			}

			if ( event.keyCode === 9 ) {

				console.log(`11111`)
				event.preventDefault()

			}

		} )

		modalExit.addEventListener( `click`, () => {

			document.querySelector( `body` ).style.background = ``

			modal.style.display = ''
			target.focus()
			if ( modalImg.querySelector( `img` ) ) modalImg.querySelector( `img` ).remove()

		} )

	}

	gallerySlide.target.forEach( slide => {

		slide.addEventListener( `keydown`, event => {

			if ( event.keyCode === 13 ) {

				slideModal( event.path[0] )

			}

		} )

		slide.addEventListener( `click`, event => {

			slideModal( event.currentTarget )

		} )

	} )

	document.querySelector( `.gallery-modal__text` ).addEventListener(`keydown`, event => {

		if ( event.keyCode === 9 && event.shiftKey === true ) event.preventDefault()

	})

}