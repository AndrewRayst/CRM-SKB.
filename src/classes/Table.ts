import { el } from 'redom'

import BaseApp from '@classes/BaseApp.ts'

import addClientSvg from '@img/addClientSvg.svg'

type contact = [

	{

		type: string,
		value: string

	}

]

export default class Table extends BaseApp {

	data: object

	Client: object
	Loader: object
	Search: object
	DelClient: object
	AddClient: object
	ChangeClient: object

	appContainer: object
	table: object
	tableContainer: object
	tableWidth: number
	appHeaderContainer: object

	dragAndDrop = {

		x: 0,
		start: 0,
		end: 0

	}

	btnAddClient: object
	clients: object[] = []
	filterBtns: {

		btnId: object
		btnName: object
		btnDate: object
		btnChange: object

	}

	constructor(appContainer, appHeaderContainer) {

		super()

		this.appContainer = appContainer
		this.appHeaderContainer = appHeaderContainer

		this.init()

	}

	async init() {

		this.getComponents()
			.then(components => {

				components.btn.addEventListener('click', () => this.modalAdd())

				this.btnAddClient = components.btn

				super.appendComponent(this.appContainer, components.table)

			})

		await import('@classes/Loader.ts')
			.then(data => this.Loader = data.default)

		const loader = new this.Loader(this.appContainer)

		await import('@classes/Client.ts')
			.then(data => this.Client = data.default)

		await import('@classes/Search.ts')
			.then(data => this.Search = data.default)

		await import('@classes/DelClient.ts')
			.then(data => this.DelClient = data.default)

		await import('@classes/AddClient.ts')
			.then(data => this.AddClient = data.default)

		await import('@classes/ChangeClient.ts')
			.then(data => this.ChangeClient = data.default)

		this.initHashClient()

		this.sizeEvents()

		this.fetch()
			.then(async data => {

				data = await this.filter(data, 'id')

				this.data = data

				this.loadClients(data)

				this.filterInit()

				const search = new this.Search(data, this.clients)

				loader.removeLoader()

				super.appendComponent(this.appHeaderContainer, search.component)
				super.appendComponent(this.appContainer, this.btnAddClient)

			})

	}

	initHashClient(): void {

		this.openHashClient()

		window.addEventListener('hashchange', () => {

			this.openHashClient()


		})

	}

	openHashClient(): void {

		if (this.url.hash != '') {

			const hash = this.url.hash.split('#')[1]

			this.getClient(hash)
				.then(async response => {

					if (response.status != 200 && response.status != 201) return

					const data = await response.json()

					let client = new this.Client(data)

					this.modalChange(client)

				})

		}

	}

	sizeEvents() {

		window.addEventListener('resize', () => {

			this.tableWidth = +(window.getComputedStyle(this.table).width.split('px')[0])

		})

		this.table.addEventListener('touchmove', e => {

			if (window.innerWidth <= 700) {

				this.dragAndDrop.end = e.targetTouches[0].pageX

				let x = this.dragAndDrop.x + this.dragAndDrop.start - this.dragAndDrop.end

				if (x < 0) {

					x = 0

				}

				if (x > this.tableWidth - window.innerWidth) {

					x = this.tableWidth - window.innerWidth

				}


				this.dragAndDrop.x = x

				this.dragAndDrop.start = e.targetTouches[0].pageX

				this.table.style.transform = `translateX(-${this.dragAndDrop.x}px)`

			}

		})
		this.table.addEventListener('touchstart', e => {

			if (window.innerWidth <= 700) {

				this.dragAndDrop.start = e.targetTouches[0].pageX

			}

		})

	}

	/* 
		COMPONENTS
	*/

	async getComponents() {

		const btnId: object = el('button', 'ID', { class: 'app-table__btn app-table__btn--ID' })
		const btnName: object = el('button', 'А-Я', { class: 'app-table__btn app-table__btn--name app-table__btn--bottom' })
		const btnDate: object = el('button', { class: 'app-table__btn app-table__btn--date app-table__btn--bottom' })
		const btnChange: object = el('button', { class: 'app-table__btn app-table__btn--change app-table__btn--bottom' })

		const header: object = el('.app-table__header', [

			el('.app-table__cell', { class: 'app-table__cell--ID' }, [btnId]),
			el('.app-table__cell', 'Фамилия Имя Отчество', { class: 'app-table__cell--name' }, [btnName]),

			el('.app-table__cell', 'Дата и время создания', { class: 'app-table__cell--date' }, [btnDate]),
			el('.app-table__cell', 'Последние изменения', { class: 'app-table__cell--change' }, [btnChange]),

			el('.app-table__cell', 'Контакты', { class: 'app-table__cell--contacts' }),
			el('.app-table__cell', 'Действия', { class: 'app-table__cell--activities' }),

		])

		const body: object = el('div', { class: 'app-table__body' })

		const table: object = el('div', { class: 'app-table' }, [

			header,
			body

		])

		const btn = el('button', { class: 'app__btn--secondary app-table__btn--add' }, [

			el('img', { src: addClientSvg }),
			'Добавить клиента'

		])

		this.tableContainer = body
		this.table = table

		this.filterBtns = {

			btnId,
			btnName,
			btnDate,
			btnChange

		}

		return {

			table,
			btn

		}

	}

	async loadClients(data) {

		this.clients = []

		for (let el of data) {

			let client = new this.Client(el)

			const component = await client.getComponent()

			this.modalEvents(client)

			this.clients.push(component)

		}

		super.appendComponents(this.tableContainer, this.clients)

		this.tableWidth = +(window.getComputedStyle(this.table).width.split('px')[0])

	}

	/* 
		MODAL
	*/

	modalEvents(client) {

		client.btnChange.addEventListener('click', () => {

			client.btnChange.setAttribute('disabled', 'true')

			const img = client.btnChange.querySelector('.app-table__btn--img')
			const loader = new this.Loader(client.btnChange, 'app-table__btn--loader', true)

			img.style.display = 'none'

			this.modalChange(client)
				.then(() => {

					loader.removeLoader()
					img.style.display = ''

					client.btnChange.removeAttribute('disabled')

				})

		})

		client.btnDel.addEventListener('click', () => {

			client.btnDel.setAttribute('disabled', 'true')

			this.modalDel(client)
				.then(() => {

					client.btnDel.removeAttribute('disabled')

				})

		})

	}

	modalAdd() {

		const modal = new this.AddClient()

		const component = modal.getComponent()

		modal.form.addEventListener('submit', () => this.submitModalAdd(modal))

		modal.btnCancel.addEventListener('click', e => {

			e.preventDefault()

			modal.removeModal()

		})

		super.appendComponent(document.body, component)

	}

	async modalChange(client) {

		return await new Promise((resolve => {

			const modal = new this.ChangeClient(client.client)

			super.appendComponent(document.body, modal.getComponent())

			modal.btnDel.addEventListener('click', () => {

				modal.removeModal()
				this.modalDel(client)

			})

			modal.form.addEventListener('submit', () => this.submitModalChange(modal, client.id))

			resolve()

		}))

	}

	async modalDel(client) {

		return await new Promise((resolve => {

			const modal = new this.DelClient()

			super.appendComponent(document.body, modal.getComponent())

			modal.btnCancel.addEventListener('click', () => modal.removeModal())

			modal.btnDel.addEventListener('click', () => {

				this.deleteClient(client.id)
					.then(response => {

						if (response.status == (200 || 201)) {

							super.deleteComponent(client.component)
							modal.removeModal()

						}

					})

			})

			resolve()


		}))

	}

	submitModalChange(modal, id) {

		if (!modal.validator.isValid) return

		super.appendComponent(document.body, el('.app-modal--disable'))

		const loader = new this.Loader(modal.btnSave, 'app-loader--btn')

		this.updateClient(modal.data, id)
			.then(data => {

				super.deleteComponent(document.querySelector('.app-modal--disable'))

				loader.removeLoader()

				this.modalFormSubmit(modal, data)

			})

	}

	submitModalAdd(modal) {

		if (!modal.validator.isValid) return

		super.appendComponent(document.body, el('.app-modal--disable'))

		const loader = new this.Loader(modal.btnSave, 'app-loader--btn')

		this.addClient(modal.data)
			.then(data => {

				super.deleteComponent(document.querySelector('.app-modal--disable'))

				loader.removeLoader()

				this.modalFormSubmit(modal, data)

			})

	}

	async modalFormSubmit(modal, data) {

		if (data.status == 200 || data.status == 201) {

			modal.removeModal()

			this.fetch()
				.then(async data => {

					data = await this.filter(data, 'id')

					this.data = data

					this.loadClients(data)

				})

		}

		else {

			const errors = await data.json()

			if (typeof errors == 'object') {

				modal.error(errors.message)

			}

			else {

				for (let error of errors.errors) {

					modal.error(`${error.field} : ${error.message}`)

				}

			}

		}

	}

	/* 
		FILTER
	*/

	filterInit() {

		this.filterBtns
			.btnId
			.addEventListener('click', e => this.filterEvent(e.target, 'id'))

		this.filterBtns
			.btnName
			.addEventListener('click', e => this.filterEvent(e.target, 'name'))

		this.filterBtns
			.btnDate
			.addEventListener('click', e => this.filterEvent(e.target, 'createdAt'))

		this.filterBtns
			.btnChange
			.addEventListener('click', e => this.filterEvent(e.target, 'updatedAt'))

	}

	async filterEvent(btn, type) {

		btn.classList.toggle(`app-table__btn--bottom`)

		if (btn.classList.contains(`app-table__btn--bottom`)) {

			this.loadClients(await this.filter(this.data, `${type}`, true))

			return

		}

		this.loadClients(await this.filter(this.data, `${type}`))

	}

	async filter(data, type, _reverse = false) {

		let arr = await this.quickSort(data, type)

		if (_reverse) return await arr.reverse()

		return arr

	}

	quickSort(data, type) {

		if (data.length <= 1) return data
		let pivot = data[0]
		let less = []
		let greater = []

		for (let i = 1; i < data.length; i++) {

			let el, elPivot

			if (type == 'name') {

				el = `${data[i].lastName} ${data[i].name} ${data[i].surname}`

				elPivot = `${pivot.lastName} ${pivot.name} ${pivot.surname}`

			}

			else {

				el = data[i].type
				elPivot = pivot.type

			}

			if (el <= elPivot) {

				less.push(data[i])
				continue

			}

			greater.push(data[i])

		}

		return this.quickSort(less, type).concat(pivot).concat(this.quickSort(greater, type))

	}

	/* 
		API
	*/

	async fetch() {

		const response = await fetch('http://localhost:3000/api/clients')

		const data = await response.json()

		return data

	}

	async addClient(data: object) {

		return await fetch('http://localhost:3000/api/clients', {

			method: 'POST',

			headers: {

				'Content-Type': 'application/json'

			},

			body: JSON.stringify(data)

		})

	}

	async updateClient(data: object[], id: string) {

		return await fetch(`http://localhost:3000/api/clients/${id}`, {

			method: 'PATCH',

			headers: {

				'Content-Type': 'application/json'

			},

			body: JSON.stringify(data)

		})

	}

	async deleteClient(id: string) {

		return await fetch(`http://localhost:3000/api/clients/${id}`, {

			method: 'DELETE',

		})

	}

	async getClient(id: string) {

		return await fetch(`http://localhost:3000/api/clients/${id}`)

	}

}
