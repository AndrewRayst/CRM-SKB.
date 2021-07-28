export default () => {

	const sectionEvents = document.querySelector( `.events` )
	const eventsInner = document.querySelector( `.events__inner` )
	const cardsBox = document.querySelector( `.events__cards` )
	const cardsLink = document.querySelectorAll( `.events__link` )
	const cards = document.querySelectorAll( `.events__card` )

	const cardsHeight = cardsBox.offsetHeight
	const card = cards[0]
	const cardFullHeight = card.offsetHeight + ( +window.getComputedStyle( cardsBox.children[0] ).marginBottom.replace( `px`, `` ) ) + `px`

	const viewQuantityCards = Math.floor( eventsInner.offsetWidth / card.offsetWidth )

	const btn = document.querySelector( `.events__btn` )

	cardsBox.style.maxHeight = cardFullHeight
	sectionEvents.style.marginBottom = +window.getComputedStyle( sectionEvents ).marginBottom.replace( `px`, `` ) + btn.offsetHeight + `px`

	function eventTabindexOne() {

		for ( let i = 0; i < viewQuantityCards; i++ ) {

			cardsLink[i].setAttribute( `tabindex`, `${i + 110}` )

		}

		btn.setAttribute( `tabindex`, `${viewQuantityCards + 110}` )

	}

	function eventTabindexTwo() {

		cardsLink[viewQuantityCards - 1].focus()

		for ( let i = 0; i < cards.length; i++ ) {

			cardsLink[i].setAttribute( `tabindex`, `${i + 110}` )

		}

		btn.setAttribute( `tabindex`, `${cards.length + 110}` )

	}

	function eventTabindexClear() {

		btn.focus()

		for ( let i = 0; i < cards.length; i++ ) {

			cardsLink[i].setAttribute( `tabindex`, `-1` )

		}

	}

	btn.addEventListener( `click`, () => {

		if ( cardsBox.style.maxHeight === (cardsHeight + `px`) ) {

			cardsBox.style.maxHeight = cardFullHeight
			btn.textContent = `Все события`

			sectionEvents.scrollIntoView( {

				behavior: `smooth`,
				block: `start`,

			} )

			eventTabindexClear()
			eventTabindexOne()

		}

		else {

			cardsBox.style.maxHeight = cardsHeight + `px`

			btn.textContent = `Скрыть`

			eventTabindexTwo()

		}

	} )

	eventTabindexOne()

}
