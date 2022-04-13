/* 
DESCRIPTION:
*/

import { el, setChildren } from 'redom'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'

import BaseApp from '@classes/BaseApp.ts'

import svgEdit from '@img/edit.svg'
import svgCancel from '@img/cancel.svg'

interface IClient {

	id: string,

	name: string,
	surname: string,
	lastName?: string,

	createdAt?: string,
	updatedAt?: string,

	contacts?: contact,

}

type contact = [

	{

		type: string,
		value: string

	}

]

export default class Client extends BaseApp {

	client: IClient

	id: string

	contactsWrapper: object
	contacts: contact

	btnChange: object
	btnDel: object
	btnExtra: object

	component: object

	constructor(client: IClient) {

		super()

		this.client = client
		this.id = client.id

	}

	async getComponent() {

		const name: string = `${this.client.lastName} ${this.client.name} ${this.client.surname}`

		const [btns, contacts] = await Promise.all([

			this.getBtns(),
			this.getContacts(this.client.contacts)

		])

		const contactsWrapper = el('.app-table__cell', { class: 'app-table__cell--contacts' }, contacts)

		const item: object = el('.app-table__item', [

			el('.app-table__cell', { class: 'app-table__cell--ID' }, [this.client.id.slice(4, 10)]),
			el('.app-table__cell', { class: 'app-table__cell--name' }, [name]),

			el('.app-table__cell', { class: 'app-table__cell--date' }, this.getDate(this.client.createdAt)),
			el('.app-table__cell', { class: 'app-table__cell--change' }, this.getDate(this.client.updatedAt)),

			contactsWrapper,
			el('.app-table__cell', { class: 'app-table__cell--activities' }, [btns]),

		])

		this.contactsExtra()

		this.contactsWrapper = contactsWrapper
		this.contacts = this.client.contacts

		this.component = item

		return item

	}

	getBtns() {

		const btnChange = el('button', { class: 'app-table__btn app-table__btn--change' }, [

			el('img', { class: 'app-table__btn app-table__btn--img', src: `${svgEdit}` }),
			'Изменить'

		])
		const btnDel = el('button', { class: 'app-table__btn app-table__btn--delete' }, [

			el('img', { class: 'app-table__btn app-table__btn--img', src: `${svgCancel}`, alt: 'Cancel' }),
			'Удалить'

		])

		this.btnChange = btnChange
		this.btnDel = btnDel

		return el('.app-table__btns', [

			btnChange,
			btnDel

		])

	}

	getDate(data) {

		const date = new Date(data)

		const year = `${date.getFullYear()}`
		let month = `${date.getMonth() + 1}`
		let day = `${date.getDate()}`
		let hours = `${date.getHours()}`
		let minutes = `${date.getMinutes()}`

		if (month.length == 1) month = `0${month}`
		if (day.length == 1) day = `0${day}`
		if (hours.length == 1) hours = `0${hours}`
		if (minutes.length == 1) minutes = `0${minutes}`

		return [

			el('span', { class: 'app-table__text--date' }, `${day}.${month}.${year}`),
			el('span', { class: 'app-table__text--time' }, `${hours}:${minutes}`)

		]

	}

	contactsExtra() {

		if (this.btnExtra != undefined) {

			this.btnExtra.addEventListener('click', () => {

				this.cleanContacts()
				this.getContacts(this.contacts, true)
					.then(fullContacts => {

						super.appendComponents(this.contactsWrapper, fullContacts)

					})

			})

		}

	}

	cleanContacts() {

		setChildren(this.contactsWrapper, [])

	}

	async getContacts(data: contact, _full: boolean = false) {

		const extraContacts = el('button', `+${data.length - 4}`, { class: 'app-table__contact--extra' })
		this.btnExtra = extraContacts

		let contacts: object[] = []

		for (let element of data) {

			let img: string
			let contact: object
			let value: object

			switch (`${element.type}`.toLowerCase()) {

				case 'email':
				case 'mail':
				case 'e mail':
				case 'e-mail':
					img = await import('@img/mail.svg')
						.then(img => img.default)

					value = el('a', { class: 'app-table__contact--link', href: `mailto:${element.value}`, target: "_blank" }, `${element.value}`)
					break

				case 'телефон':
				case 'phone':
					img = await import('@img/phone.svg')
						.then(img => img.default)

					value = el('a', { class: 'app-table__contact--link', href: `tel:${element.value}` }, `${element.value}`)

					break

				case 'facebook':
					img = await import('@img/fb.svg')
						.then(img => img.default)

					value = el('a', { class: 'app-table__contact--link', href: `${element.value}` }, `@${element.value.split('.com/')[1].split('/')[0]}`)

					break

				case 'vk':
					img = await import('@img/vk.svg')
						.then(img => img.default)

					value = el('a', { class: 'app-table__contact--link', href: `${element.value}` }, `${element.value.split('.com/')[1].split('/')[0]}`)

					break

				default:
					img = await import('@img/otherSocial.svg')
						.then(img => img.default)

					value = el('div', `${element.type}: `, [

						el('a', { class: 'app-table__contact--link', href: `${element.value}` }, `@${element.value}`)

					])

			}

			contact = el('img', { src: `${img}`, class: 'app-table__contact' })

			tippy(contact, {

				content: value,
				trigger: 'click',
				duration: [300, 250],
				placement: 'top',
				allowHTML: true,
				interactive: true,

			});


			contacts.push(contact)

		}

		if (!_full) {

			if (contacts.length <= 5) {

				return contacts.slice(0, 5)

			}

			let data = contacts.slice(0, 4)
			data.push(extraContacts)

			return data

		}

		return contacts

	}

}
