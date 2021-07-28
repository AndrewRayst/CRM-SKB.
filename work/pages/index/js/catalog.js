export default () => {

	const accordionItems = document.querySelectorAll( `.accordion__item` )
	const creators = document.querySelectorAll( `.accordion__creator` )
	const catalogPersons = document.querySelector( `.catalog__persons` )
	const languages = document.querySelectorAll( `.catalog-languages__item ` )

	function clouseAccordion() {

		accordionItems.forEach( ( item ) => {

			const content = item.querySelector( `.accordion__content` )

			item.classList.remove( `accordion__item--active` )

			content.style.maxHeight = `0px`
			content.style.padding = `0px`

		} )

	}

	function personInfo( creator ) {

		const personPrev = document.querySelector( `.catalog__person--prev` )

		let creators = {

			// 'шаблон': {

			// 	name: ``,
			// 	date: ``,
			// 	about: ``,
			// 	img: `img/catalog__img-.jpg`,

			// },
			'nothing': {

				name: `Что мы о нём знаем?`,
				about: `Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!`,
				link: `<a href='#' class='catalog__link'>В галерею</a>`,
				img: `img/catalog__img-0.jpg`,

			},

			'Бенедетто ди Биндо': {

				name: `Бенедетто ди Биндо`,
				date: `	1380-е — 1417`,
				about: `Бенедетто ди Биндо — итальянский художник сиенской школы. Бенедетто ди Биндо остался в истории искусства как сиенский художник, так сказать, «второго ряда», несмотря на то, что за свою короткую жизнь он выполнил ряд весьма престижных заказов, включая работы в Сиенском соборе.`,
				img: `img/catalog__img-2.jpg`,

			},

			'Доменико Гирландайо': {

				name: `Доменико Гирландайо`,
				date: `2 июня 1448 — 11 января 1494.`,
				about: `Один из ведущих флорентийских художников Кватроченто, 
					основатель художественной династии, которую продолжили 
					его брат Давид и сын Ридольфо. Глава художественной мастерской, 
					где юный Микеланджело в течение года овладевал профессиональными 
					навыками. Автор фресковых циклов, в которых выпукло, со 
					всевозможными подробностями показана домашняя жизнь библейских 
					персонажей (в их роли выступают знатные граждане Флоренции в 
						костюмах того времени).`,
				img: `img/catalog__img-1.jpg`,

			},

		}

		let personNext = document.createElement( `li` )

		if ( creators[String(creator)] ) {

			let creatorInfo = creators[String(creator)]

			personNext.innerHTML = `
			<img class="catalog__img" src="${creatorInfo.img}" alt="Х-художник">
			<h3 class="catalog__heading--mini heading--mini">${creatorInfo.name}</h3>
			<p class="catalog__date">${creatorInfo.date}</p>
			<p class="catalog__paragraph">${creatorInfo.about}</p>`

		}

		else {

			let creatorInfo = creators[`nothing`]

			personNext.innerHTML = `
			<img class="catalog__img" src="${creatorInfo.img}" alt="Х-художник">
			<h3 class="catalog__heading--mini heading--mini">${creatorInfo.name}</h3>
			<p class="catalog__paragraph">${creatorInfo.about}</p>
			${creatorInfo.link}`

		}

		personNext.className = `catalog__person catalog__person--next`

		catalogPersons.append( personNext )

		personPrev.remove()

		const personCurent = document.querySelector( `.catalog__person--curent` )
		personNext = document.querySelector( `.catalog__person--next` )

		setTimeout( () => {

			personCurent.classList.add( `catalog__person--prev` )
			personCurent.classList.remove( `catalog__person--curent` )

			personNext.classList.add( `catalog__person--curent` )
			personNext.classList.remove( `catalog__person--next` )

		}, 600 )

	}

	accordionItems.forEach( ( item ) => {

		const content = item.querySelector( `.accordion__content` )
		const name = item.querySelector( `.accordion__name` )

		function accordionTabindex( event ) {

			event.stopPropagation()

			const target = event.target

			if ( target.classList.contains( `accordion__item--active` ) && event.keyCode === 9 && event.shiftKey === false ) {

				event.preventDefault()

				const tabindex = target.querySelectorAll( `[data-accordion__tabindex]` )

				for ( let i = 0; i < ( tabindex.length ); i++ ) {

					tabindex[i].setAttribute( `tabindex`, `${i + 600}` )

				}

				tabindex[0].focus()

				tabindex[0].addEventListener( `keydown`, event => {

					if ( event.keyCode === 9 && event.shiftKey === true ) {

						event.stopPropagation()

						if ( event.currentTarget !== target ) {

							event.preventDefault()

							target.focus()

						}

					}

				} )

				tabindex[tabindex.length - 1].addEventListener( 'keydown', event => {

					if ( event.keyCode === 9 && event.shiftKey === false ) {

						event.preventDefault()

						document.querySelector( `[tabindex='110']` ).focus()

					}

				} )

			}

		}

		if ( !item.classList.contains( `accordion__item--active` ) ) {

			content.style.maxHeight = `0px`
			content.style.padding = `0px`

		}

		name.addEventListener( `click`, ( ) => {

			if ( content.style.maxHeight === `700px` || item.classList.contains( `accordion__item--active` ) ) {

				item.classList.remove( `accordion__item--active` )

				content.style.maxHeight = `0px`
				content.style.padding = `0px`

			}

			else {

				clouseAccordion()

				item.classList.add( `accordion__item--active` )

				content.style.maxHeight = `700px`
				content.style.padding = ``

			}

		} )

		item.addEventListener( `keydown`, ( event ) => {

			event.stopPropagation()

			if ( event.keyCode === 13 && event.currentTarget === event.target ) {

				if ( content.style.maxHeight === `700px` || item.classList.contains( `accordion__item--active` ) ) {

					item.classList.remove( `accordion__item--active` )

					content.style.maxHeight = `0px`
					content.style.padding = `0px`

				}

				else {

					clouseAccordion()

					item.classList.add( `accordion__item--active` )

					content.style.maxHeight = `700px`
					content.style.padding = ``

				}

			}

		} )

		item.addEventListener( `keydown`, ( event ) => accordionTabindex( event ) )

	} )

	function creatorsUnactive() {

		creators.forEach( ( item ) => {

			item.classList.remove( `accordion__creator--active` )

		} )

	}

	creators.forEach( ( item ) => {

		item.addEventListener( `click`, ( e ) => {

			if ( !e.target.classList.contains( `accordion__creator--active` ) ) {

				let creator = e.target

				creatorsUnactive()
				personInfo( creator.textContent )

				creator.classList.toggle( `accordion__creator--active` )

			}

		} )

		// item.addEventListener( `keydown`, ( e ) => {

		// 	if ( e.keyCode === 13 ) {

		// 		if ( !e.target.classList.contains( `accordion__creator--active` ) ) {

		// 			let creator = e.target

		// 			creatorsUnactive()
		// 			personInfo( creator.textContent )

		// 			creator.classList.toggle( `accordion__creator--active` )

		// 		}

		// 	}

		// } )

	} )

	// LANG

	function langActive( target ) {

		if ( target.classList.contains( `catalog-languages__item--active` ) ) {

			target.classList.remove( `catalog-languages__item--active` )

		}

		else {

			languages.forEach( lang => {

				if ( lang.classList.contains( `catalog-languages__item--active` ) ) {

					lang.classList.remove( `catalog-languages__item--active` )

				}

				target.classList.add( `catalog-languages__item--active` )

			} )

		}

	}

	languages.forEach( ( lang ) => {

		lang.addEventListener( `click`, ( event ) => {

			if ( event.currentTarget === lang ) {

				langActive( event.currentTarget )

			}

		} )

		lang.addEventListener( `keydown`, ( event ) => {

			if ( event.keyCode === 13 ) {

				if ( event.currentTarget === lang ) {

					langActive( event.currentTarget )

				}

			}

		} )

	} )

}
