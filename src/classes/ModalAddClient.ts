import Modal from '@classes/Modal'

import { el, mount } from 'redom'
import tippy from 'tippy.js';
import JustValidate from 'just-validate'
import Choices from 'choices.js'

import 'choices.js/public/assets/styles/choices.min.css'
import 'tippy.js/dist/tippy.css'

import addClientSvg from '@img/add.svg'
import cancelSVG from '@img/cancel.svg'

type fn = () => void

interface IDataClient {

	name: string,
	surname: string,
	lastName: string,
	contacts?: [
		{
			type: string,
			value: string
		}
	]

}

interface Icontact {

	component: HTMLLabelElement

	input: HTMLInputElement
	inputID: string

	btnDel: HTMLButtonElement
	btnDelImg: HTMLImageElement

	select: HTMLSelectElement

}

interface Ivalidation {

	addField: (id: string, options: Array<object>) => Ivalidation
	onSuccess: (cb: fn) => void

}

export default class ModalAddClient extends Modal {

	form: HTMLFormElement

	btnSave: HTMLButtonElement
	btnCancel: HTMLButtonElement
	btnAddContacts: HTMLButtonElement

	contacts: HTMLElement
	contactsList: HTMLElement
	contactsInputsID: string[] = []

	data: object
	validator: Ivalidation

	modal: HTMLDivElement
	modalInner: HTMLDivElement
	btnExit: HTMLButtonElement

	constructor() {

		super()

		super.getModal('app-modal--add')
			.then(() => {

				this.btnExit.addEventListener('click', () => {

					super.removeModal()

				})

			})

	}

	getComponent() {

		const btnSave = el('button', 'Сохранить', { class: 'app__btn--primary app-modal__btn' })
		const btnCancel = el('button', 'Отмена', { class: 'app-modal__btn--subbtn' })

		const form = this.getForm([btnSave, btnCancel])

		mount(this.modalInner, el('h2', 'Новый клиент', { class: 'app-modal__heading' }))
		mount(this.modalInner, form)

		this.btnSave = btnSave
		this.btnCancel = btnCancel

		this.validation()

		return this.modal

	}

	createForm(
		btns,
		data: IDataClient = {

			name: '',
			surname: '',
			lastName: '',
			contacts: [

				{
					type: '',
					value: ''
				}

			]

		}) {

		const contacts = this.getContacts(data.contacts)

		const inutLastName = el('input', {

			id: 'app-modal__input--lastName',
			class: 'app-modal__input',
			value: `${data.lastName != undefined ? data.lastName : ''}`,
			'data-type': 'lastName'

		})

		const inputName = el('input', {

			id: 'app-modal__input--name',
			class: 'app-modal__input',
			value: `${data.name != undefined ? data.name : ''}`,
			'data-type': 'name'

		})

		const inputSurname = el('input', {

			id: 'app-modal__input--surname',
			class: 'app-modal__input',
			value: `${data.surname != undefined ? data.surname : ''}`,
			'data-type': 'surname'

		})

		const inputs = [

			inutLastName,
			inputName,
			inputSurname,

		]

		const form = el('form', { class: 'app-modal__form' }, [

			el('label', { class: 'app-modal__label' }, [

				inputSurname,
				el('div', 'Фамилия', { class: 'app-modal__place-holder' }, [

					el('span', '*', { class: 'app-modal__place-holder--required' })

				])

			]),

			el('label', { class: 'app-modal__label' }, [

				inputName,
				el('div', 'Имя', { class: 'app-modal__place-holder' }, [

					el('span', '*', { class: 'app-modal__place-holder--required' })

				])

			]),

			el('label', { class: 'app-modal__label' }, [

				inutLastName,
				el('div', 'Отчество', { class: 'app-modal__place-holder' })

			]),
			contacts,

		].concat(btns))

		this.form = form

		return {

			form,
			inputs,

		}

	}

	getForm(
		btns,
		data: IDataClient = {

			name: '',
			surname: '',
			lastName: '',
			contacts: []

		}) {

		const formComponent = this.createForm(btns, data)

		for (let input of formComponent.inputs) {

			if (input.value != '') {

				input.classList.add('app-modal__input--value')

			}

			input.addEventListener('change', () => {

				if (input.value != '') {

					input.classList.add('app-modal__input--value')

				}

				else input.classList.remove('app-modal__input--value')

			})

		}

		return formComponent.form

	}

	// CONTACTS

	createContacts() {

		const contactsList = el('.app-modal__contacts--list')

		const contactsBtn = el('button', { class: 'app-modal__btn--contact' }, [

			el('span', [

				el('img', { src: addClientSvg })

			]),
			'Добавить контакт'

		])

		const contacts = el('.app-modal__contacts', [

			contactsList,
			contactsBtn

		])

		this.contacts = contacts
		this.contactsList = contactsList
		this.btnAddContacts = contactsBtn

		return {

			contacts,
			contactsList,
			contactsBtn

		}

	}

	getContacts(data = []) {

		if (this.contacts == undefined) {

			this.createContacts()

			/* Добавление нового контакта и скрытие кнопки при переполнении */
			this.btnAddContacts.addEventListener('click', e => {

				e.preventDefault()
				this.getContacts()

				if (this.contactsList.children.length < 10) {

					this.appendContact()

					if (this.contactsList.children.length == 9) {

						this.btnAddContacts.style.display = 'none'

					}

					else this.btnAddContacts.style.display = ''

				}

				else {

					this.btnAddContacts.style.display = 'none'

				}

			})

		}

		if (data.length > 0) {

			for (let el of data) {

				this.appendContact(el)

			}

		}

		return this.contacts

	}

	createContact(data = false): Icontact {

		const inputID = `app-modal__contact--input-${this.contactsList.children.length}` /* id нужен для валидации  */

		const select = el('select', { class: ' app-modal__contact--select ' }, [

			el('option', 'Телефон', { value: 'Телефон', }),
			el('option', 'Доп. телефон', { value: 'Телефон' }),
			el('option', 'Email', { value: 'Email' }),
			el('option', 'Vk', { value: 'vk' }),
			el('option', 'Facebook', { value: 'Facebook' }),
			el('option', 'Другое', { value: 'other' })

		])

		const input = el('input', {

			id: `${inputID}`,
			class: ' app-modal__contact--input ',
			placeholder: 'Введите данные контакта',
			value: `${data.value ? data.value : ''}`

		})

		const btnDelImg = el('img', { src: cancelSVG })
		const btnDel = el('button', { class: ' app-modal__contact--btn ' }, btnDelImg)

		const wrapper = el('label', { class: ' app-modal__contact--wrapper ' }, [

			select,
			input,
			btnDel

		])

		return {

			component: wrapper,

			input,
			inputID,

			btnDel,
			btnDelImg, /* Для более точного позициронирования попапа */

			select

		}

	}

	/* 
	Вешаются обработчики:
		-для анимации placeholder
		-для удаления контакта

	Плагин Choices для кастомного селекта
	Плагин Tippy для попапа над кнопкой удаления контакта

	Возвращает компонент контакта и ID инпута для валидации (СТРОГО ПОСЛЕ ДОБАВЛЕНИЯ В DOM!!!)
	*/

	getContact(data = false): Partial<Icontact> {

		const contact = this.createContact(data)

		if (contact.input.value != '') {

			contact.btnDel.style.display = 'block'

		}

		contact.input.addEventListener('change', () => {

			if (contact.input.value != '') {

				contact.btnDel.style.display = 'block'

			}

			else contact.btnDel.style.display = ''

		})

		contact.btnDel.addEventListener('click', e => {

			e.preventDefault()

			this.btnAddContacts.style.display = ''

			super.deleteComponent(contact.component)

		})

		const choice = new Choices(contact.select, {

			itemSelectText: '',

		})

		if (data) {

			choice.setValue([data.type])

		}

		tippy(contact.btnDelImg, {

			content: 'Удалить контакт',
			duration: [300, 250],
			allowHTML: true,
			interactive: true,

		});

		return {

			component: contact.component,
			select: contact.select,
			inputID: contact.inputID, /* Для валидации */

		}

	}

	appendContact(data = false): void {

		const contact: Partial<Icontact> = this.getContact(data)

		mount(this.contactsList, contact.component)

		this.contactsInputsID.push(contact.inputID)

		this.validateContact(contact.select, contact.inputID)

		if (this.validator != undefined) {

			this.validateContacts(contact.select, contact.inputID)

		}

	}

	// VALIDATION

	validation(): object {

		const validation: Ivalidation = new JustValidate(this.form as Element, {

			tooltip: {
				position: 'top',
			},

		})

		validation
			.addField('#app-modal__input--lastName', [
				{
					rule: 'minLength',
					value: 2,
					errorMessage: 'Минимум 2 символа',
				},
				{
					rule: 'maxLength',
					value: 30,
					errorMessage: 'Максимум 30 символов',
				},
			])
			.addField('#app-modal__input--surname', [
				{
					rule: 'required',
					errorMessage: 'Обязательно для заполнения',
				},
				{
					rule: 'minLength',
					value: 2,
					errorMessage: 'Минимум 2 символа',
				},
				{
					rule: 'maxLength',
					value: 30,
					errorMessage: 'Максимум 30 символов',
				},
			])
			.addField('#app-modal__input--name', [
				{
					rule: 'required',
					errorMessage: 'Обязательно для заполнения',
				},
				{
					rule: 'minLength',
					value: 2,
					errorMessage: 'Минимум 2 символа',
				},
				{
					rule: 'maxLength',
					value: 30,
					errorMessage: 'Максимум 30 символов',
				},
			])

			.onSuccess(() => {

				let data = { contacts: [] }

				const inputs = this.form.querySelectorAll('input[data-type]')
				const contacts = this.form.querySelectorAll('.app-modal__contact--wrapper')

				for (let input of inputs) {

					const type = input.dataset.type
					const value = input.value

					data[type] = value

				}

				for (let contact of contacts) {

					const type = contact.querySelector('select').value
					const value = contact.querySelector('.app-modal__contact--input').value

					data.contacts.push({ type, value })

				}

				this.data = data

			})

		this.validator = validation

		// this.validateContacts()

		return validation

	}

	validateContact<I extends HTMLSelectElement>(select: I, inputId: string): void {

		select.addEventListener('change', () => {

			this.validateContacts(select, inputId)

		})

	}

	validateContacts(select, inputId) {

		switch (select.value.toLowerCase()) {

			case 'телефон':
				this.validator
					.addField(`#${inputId}`, [
						{
							rule: 'required',
							errorMessage: 'Обязательно для заполнения',
						},
						{
							validator: (value) => {

								return /^(\+|\d)(\d| )+$/g.test(value)

							},
							errorMessage: 'Только цифры',
						},

					])
				break;

			case 'email':
				this.validator
					.addField(`#${inputId}`, [
						{
							rule: 'required',
							errorMessage: 'Обязательно для заполнения',
						},

						{

							rule: 'email',
							errorMessage: 'Неверная почта',

						}

					])
				break;

			case 'facebook':
			case 'vk':
				this.validator
					.addField(`#${inputId}`, [
						{
							rule: 'required',
							errorMessage: 'Обязательно для заполнения',
						},

						{

							validator: (value) => {

								return /^(http|https):\/\/.+\..+\/.+$/g.test(value)

							},
							errorMessage: 'Неверная ссылка',

						}

					])
				break;

			default:
				this.validator
					.addField(`#${inputId}`, [
						{
							rule: 'required',
							errorMessage: 'Обязательно для заполнения',
						},

					])
		}

	}

	error(msg) {

		const message = el('p', `${msg}`, { class: 'app-modal__error' })

		this.form.insertBefore(message, this.contacts.nextSibling)

	}

}
