export default () => {

	const sectionEvents = document.querySelector( `.events` )
	const eventsInner = document.querySelector( `.events__inner` )
	const cardsBox = document.querySelector( `.events__cards` )
	const cardsLink = document.querySelectorAll( `.events__link` )
	const cards = document.querySelectorAll( `.events__card` )

	const card = cards[0]

	const viewQuantityCards = Math.floor( eventsInner.offsetWidth / card.offsetWidth )
	const btn = document.querySelector( `.events__btn` )

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

	setTimeout( () => {

		const cardsFullHeight = cardsBox.offsetHeight + `px`
		let cardFullHeight = card.offsetHeight + ( +window.getComputedStyle( card ).marginBottom.replace( `px`, `` ) ) + `px`

		cardsBox.style.maxHeight = cardFullHeight

		btn.addEventListener( `click`, () => {

			cardFullHeight = card.offsetHeight + ( +window.getComputedStyle( card ).marginBottom.replace( `px`, `` ) ) + `px`

			if ( cardsBox.style.maxHeight === cardFullHeight ) {

				cardsBox.style.maxHeight = cardsFullHeight

				btn.textContent = `Скрыть`

				eventTabindexTwo()

			}

			else {

				cardsBox.style.maxHeight = cardFullHeight

				btn.textContent = `Все события`

				sectionEvents.scrollIntoView( {

					behavior: `smooth`,
					block: `start`,

				} )

				eventTabindexClear()
				eventTabindexOne()

			}

		} )

		eventTabindexOne()

	}, 1000 )

}
