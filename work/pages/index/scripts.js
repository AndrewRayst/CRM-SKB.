// DON'T TOUCH!!!

import './js/vendor'

// ================

// import for your modules from js folder

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import header from './js/header'
import gallery from './js/gallery'
import catalog from './js/catalog'
import projects from './js/projects'
import edition from './js/edition'
import events from './js/events'

// import JustValidate from './js/vendor/just-validate.min'

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ======================================

// init in the page

document.addEventListener( `DOMContentLoaded`, () => {

	header()
	gallery()
	catalog()
	edition()
	events()
	projects()

	// BTN

	const btns = document.querySelectorAll( `.btn` )

	function btnTarget( event ) {

		const btn = event.currentTarget.parentElement

		btn.classList.toggle( `btn__box-active` )

	}

	btns.forEach( btn => {

		btn.addEventListener( `focus`, event => btnTarget( event ) )

		btn.addEventListener( `blur`, event => btnTarget( event ) )

		btn.addEventListener( `mouseover`, event => {

			const btn = event.currentTarget.parentElement

			btn.style.borderColor = `transparent`

		} )

		btn.addEventListener( `mouseout`, event => {

			const btn = event.currentTarget.parentElement

			btn.style.borderColor = ``

		} )

	} )

} )
