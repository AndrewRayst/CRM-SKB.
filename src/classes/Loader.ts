import BaseApp from '@classes/BaseApp.ts'

import loaderSVG from '@img/loader.svg'

import { el } from 'redom'

export default class Loader extends BaseApp {

	component: object

	container: object
	extraClass: string
	_before: boolean

	constructor(container, extraClass = '', _before = false) {

		super()

		this.container = container
		this.extraClass = extraClass
		this._before = _before

		this.getComponent()
			.then(() => {

				if (this._before) {

					this.container.prepend(this.component)

				}

				else {

					super.appendComponent(this.container, this.component)

				}


			})

	}

	async getComponent() {

		this.component = el('div', { class: `app-loader__wrapper ${this.extraClass}` }, [

			el('img', { class: `app-loader__loader`, src: loaderSVG, alt: 'loader' })

		])

	}

	removeLoader() {

		super.deleteComponent(this.component)

	}

}
