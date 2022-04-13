import { el } from 'redom'

import '@sass/app.sass'

import BaseApp from '@classes/BaseApp.ts'


export default class App extends BaseApp {

	appContainer: object
	appHeaderContainer: object

	constructor(appContainer: string, appHeaderContainer: string = '', btnMenu: string = '') {

		super()

		this.appContainer = document.querySelector(`${appContainer}`)
		this.appHeaderContainer = document.querySelector(`${appHeaderContainer}`)

		this.init()

	}

	async init() {

		const Table = await import('@classes/Table.ts')
			.then(data => data.default)

		const Menu = await import('@classes/Menu.ts')
			.then(data => data.default)

		this.getComponent()
			.then((component => {

				super.appendComponent(this.appContainer, component)

				new Table(this.appContainer, this.appHeaderContainer)

			}))

		new Menu(document.querySelector('.header'), document.querySelector('.logo'))

	}

	async getComponent() {

		return el('h1', 'Клиенты', { class: 'app__heading' })

	}

}
