export default () => {

	const editionBbtnPrev = document.querySelector( `.edition__btn--prev` )
	const editionBbtnNext = document.querySelector( `.edition__btn--next` )

	const category = document.querySelector( `.edition__sets` )
	const categoryBtn = category.querySelector( `.edition__legend` )
	const categoryItems = category.querySelectorAll( `.edition__checkbox--container` )
	const categoryItemHeight = categoryItems[0].offsetHeight

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

			let slides = slidesQuantity()

			if ( slides.end > editionSlide.target.length ) {

				slides.end = editionSlide.target.length

				slides.start = editionSlide.target.length - slides.quantity
	
			}

			let tabindex = 166

			document.querySelectorAll( `.edition-slide__btn` ).forEach( i => {

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

	// category

	if ( document.querySelector( `body` ).offsetWidth <= 450 ) {

		let categoryArray = []

		category.style.height = `${ ( categoryItemHeight * document.querySelectorAll( `.checkbox--active` ).length ) + categoryItemHeight }px`

		categoryItems.forEach( ( item ) => categoryArray.push( item ) )
	
		for ( let i = 0; i < categoryArray.length; i++ ) {
	
			categoryArray[i].style.transform = `translateY(${categoryItemHeight * i}px)`
	
		}
	
		function categoryTransActive() {
	
			let categoryItemsActive = []
	
			let categoryItemsUnactive = []
	
			categoryArray.forEach( ( item ) => {
	
				if ( item.classList.contains( `checkbox--active` ) ) {
		
					categoryItemsActive.push( item )
		
				}
		
			} )
	
			categoryArray.forEach( ( item ) => {
	
				if ( !item.classList.contains( `checkbox--active` ) ) {
		
					categoryItemsUnactive.push( item )
		
				}
		
			} )
	
			for ( let index in categoryItemsActive ) {
	
				categoryItemsActive[index].style.transform = `translateY(${categoryItemHeight * index}px)`
	
			}
	
			let index = categoryItemsActive.length
	
			categoryItemsUnactive.forEach( item => {
	
				item.style.transform = `translateY(${categoryItemHeight * index}px)`
	
				index++
	
			} )
	
		}
	
		function categoryTrans( event, index ) {
	
			const container = event.currentTarget
			const input = event.currentTarget.children[0].children[0]
	
			if ( container.classList.contains( `checkbox--active` ) ) {
	
				container.classList.remove( `checkbox--active` )
	
			}
	
			else container.classList.add( `checkbox--active` )
	
			categoryTransActive()
	
			event.preventDefault()
	
			if ( input.checked === false ) input.checked = true
	
			else input.checked = false
	
		}
	
		for ( let item in categoryArray ) {
	
			categoryArray[item].addEventListener( `click`, event => categoryTrans( event, item ) )
	
		}
	
		categoryBtn.addEventListener( `click`, event => {
	
			const target = event.target
	
			target.classList.toggle( `active` )
	
			if ( target.classList.contains( `active` ) ) {
	
				category.style.height = `${ categoryItemHeight * ( categoryItems.length + 1 ) }px`
	
			}
	
			else {
	
				category.style.height = `${ ( categoryItemHeight * document.querySelectorAll( `.checkbox--active` ).length ) + categoryItemHeight }px`
	
			}
	
		} )
	}


}