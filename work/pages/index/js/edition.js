export default () => {

	const checkboxes = document.querySelectorAll( `.edition__checkbox-label` )
	const editionBbtnPrev = document.querySelector( `.edition__btn--prev` )
	const editionBbtnNext = document.querySelector( `.edition__btn--next` )

	const editionSwiper = {

		target: document.querySelector( `.edition__wrapper` ),

		width() {

			return this.target.offsetWidth

		},

		// height() {

		// 	return this.target.offsetHeight

		// },

	}

	const editionSlide = {

		target: document.querySelectorAll( `.edition-slide` ),

		width() {

			return this.target[0].offsetWidth

		},

		// height() {

		// 	return this.target[0].offsetHeight

		// },

	}

	function slidesQuantity() {

		const slidesPage = document.getElementById( `edition__pagination` ).children[0].innerHTML

		const slidesQuantity_row = Math.floor( editionSwiper.width() / editionSlide.width() )

		return {

			quantity: slidesQuantity_row,

			start: slidesQuantity_row * slidesPage - slidesQuantity_row,
			end: slidesQuantity_row * slidesPage,

		}

	}

	editionBbtnNext.addEventListener( `keydown`, event => {

		if ( event.keyCode === 9 ) {

			const slides = slidesQuantity()
			let tabindex = 166

			editionSlide.target.forEach( i => {

				i.setAttribute( `tabindex`, `-1` )

			} )

			for ( let slide = slides.start; slide < slides.end; slide++ ) {

				editionSlide.target[slide].querySelector( `.edition-slide__btn` ).setAttribute( `tabindex`, `${tabindex}` )

				++tabindex

			}

		}

	} )

	function editionClick( event ) {

		if ( event.keyCode === 13 ) {

			event.target.click()

		}

	}

	editionBbtnPrev.addEventListener( `keydown`, event => editionClick( event ) )
	editionBbtnNext.addEventListener( `keydown`, event => editionClick( event ) )

	function checkboxChecked( event ) {

		if ( event.keyCode === 13 ) {

			event.target.click()

		}

	}

	checkboxes.forEach( checkbox => {

		checkbox.addEventListener( `keydown`, event => checkboxChecked( event ) )

	} )

}