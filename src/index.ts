// CRITICAL STYLES
import '@sass/critical.sass'
// DON'T TOUCH!!!!!!!!!!!!!

import '@sass/header.sass'

import App from '@classes/App.ts'
import '@sass/media.sass'

((): void => {

	new App('#app', '#app-header')

})()
