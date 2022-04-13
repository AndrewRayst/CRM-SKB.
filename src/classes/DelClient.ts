import { el, mount } from 'redom'
import Modal from '@classes/Modal.ts'

export default class DelClient extends Modal {

	btnDel: object
	btnCancel: object

	constructor() {

		super()

		super.getModal('app-modal--delete')
			.then(() => {

				this.btnExit.addEventListener('click', () => {

					super.removeModal()

				})

			})

	}

	getComponent() {

		const btnDel = el('button', 'Удалить', { class: 'app__btn--primary app-modal__btn' })
		const btnCancel = el('button', 'Отмена', { class: 'app-modal__btn--subbtn' })

		mount(this.modalInner, el('h2', 'Удалить клиента', { class: 'app-modal__heading' }))
		mount(this.modalInner, el('p', 'Вы действительно хотите удалить данного клиента?', { class: 'app-modal__message' }))
		mount(this.modalInner, btnDel)
		mount(this.modalInner, btnCancel)

		this.btnDel = btnDel
		this.btnCancel = btnCancel

		return this.modal

	}

}
