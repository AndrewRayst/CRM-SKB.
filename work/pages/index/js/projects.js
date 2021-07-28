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

	btns.forEach( i => clickImitate( i ) )

	iPopups.forEach( i => clickImitate( i ) )

}