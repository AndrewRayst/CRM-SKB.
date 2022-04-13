import { el } from 'redom'

import BaseApp from '@classes/BaseApp.ts'

import themeImg from '@img/theme.svg'
import logOutImg from '@img/logout.svg'
import dnsImg from '@img/dns.svg'
import profileImg from '@img/avatar.jpg'

export default class Menu extends BaseApp {

	container: object
	btn: object
	menu: object

	constructor(container, btn) {

		super()

		this.container = container
		this.btn = btn

		this.init()

	}

	init() {

		this.container.style.position = 'relative'

		this.getComponents()
			.then(component => {

				super.appendComponent(this.container, component)

			})

		this.btn.addEventListener('click', () => {

			this.menu.classList.toggle('app-menu--open')

		})

	}

	async getComponents() {

		const menu = el('.app-menu', [

			el('.app-menu__inner', [

				el('.app-menu__up', [

					el('nav.app-menu__nav', [

						el('ul', { class: 'app-menu__list' }, [

							el('li', { class: 'app-menu__item' }, [

								el('img', { class: 'app-menu__item--img', src: dnsImg, alt: 'dns' })

							]),

							el('li', { class: 'app-menu__item' }, [

								el('img', { class: 'app-menu__item--img', src: dnsImg, alt: 'dns' })

							]),

							el('li', { class: 'app-menu__item' }, [

								el('img', { class: 'app-menu__item--img', src: dnsImg, alt: 'dns' })

							]),

							el('li', { class: 'app-menu__item' }, [

								el('img', { class: 'app-menu__item--img', src: dnsImg, alt: 'dns' })

							]),

							el('li', { class: 'app-menu__item' }, [

								el('img', { class: 'app-menu__item--img', src: dnsImg, alt: 'dns' })

							]),

							el('li', { class: 'app-menu__item' }, [

								el('img', { class: 'app-menu__item--img', src: dnsImg, alt: 'dns' })

							]),

						])

					]),
					el('button.app-menu__profile', [

						el('img', { class: 'app-menu__profile--img', src: profileImg, alt: 'avatar' })

					])

				]),
				el('.app-menu__down', [

					el('button', { class: 'app-menu__theme' }, [

						el('img', { class: 'app-menu__theme--img', src: themeImg, alt: 'theme' })

					]),

					el('button', { class: 'app-menu__log-out' }, [

						el('img', { class: 'app-menu__log-out--img', src: logOutImg, alt: 'log out' })

					])

				]),

			])

		])

		this.menu = menu

		return menu

	}

}
