import ModalAddClient from './ModalAddClient'

import { el, mount } from 'redom'

import 'choices.js/public/assets/styles/choices.min.css'
import 'tippy.js/dist/tippy.css'

interface IDataClient {

	id: string

	name: string
	surname: string
	lastName?: string
	contacts?: [
		{
			type: string
			value: string
		}
	]

}

export default class ModalChangeClient extends ModalAddClient {

	client: IDataClient

	btnSave: HTMLButtonElement
	btnDel: HTMLButtonElement

	modal: HTMLDivElement
	modalInner: HTMLDivElement

	constructor(client) {

		super()

		this.client = client

		super.getModal('app-modal--add')

	}

	getComponent() {

		const heading = el('h2', 'Изменить данные', { class: 'app-modal__heading' })
		const id = el('span', `ID: ${this.client.id}`, { class: 'app-modal__id' })

		const btnSave = el('button', 'Сохранить', { class: 'app__btn--primary app-modal__btn' })
		const btnDel = el('button', 'Удалить клиента', { class: 'app-modal__btn--subbtn' })

		const form = super.getForm([btnSave, btnDel], this.client)

		mount(this.modalInner, heading)
		mount(this.modalInner, id)
		mount(this.modalInner, form)

		this.btnSave = btnSave
		this.btnDel = btnDel

		super.validation()

		return this.modal

	}

}
