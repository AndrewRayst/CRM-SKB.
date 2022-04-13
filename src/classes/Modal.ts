import BaseApp from '@classes/BaseApp.ts'

import { el } from 'redom'

import exitIcon from '@img/exit.svg'

export default class Modal extends BaseApp {

	modal: object
	modalInner: object
	btnExit: object

	removeModal() {

		this.modal.parentNode.removeChild(this.modal)

	}

	async getModal(extraClass) {

		const btnExit = el('button', { class: 'app-modal__btn--exit' }, [

			el('img', { class: 'app-modal__exit--img', src: `${exitIcon}` })

		])

		const modalInner = el('div', { class: `app-modal__inner ${extraClass} ` }, btnExit)

		const modal = el('.app-modal', modalInner)

		this.modal = modal
		this.modalInner = modalInner
		this.btnExit = btnExit

		return modal

	}

}
