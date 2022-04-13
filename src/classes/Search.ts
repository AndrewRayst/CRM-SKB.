import { el, mount, setAttr } from 'redom'

interface ISearchItem {

	name: string
	client: object
	value?: object

}

export default class Search {

	data: object[]
	clients: object[]

	component: object
	form: object
	input: object
	searchBox: object
	list: object

	constructor(data, clients) {

		this.data = data
		this.clients = clients

		this.getComponent()

		this.input.addEventListener('focus', () => {

			this.searchBox.style.display = 'block'

			if (this.input.value == '') {

				this.updateSearchBox()

			}

		}, true)

		document.addEventListener('click', e => {

			if (e.target != this.input && !e.target.classList.contains(`app-search__item`))

				this.searchBox.style.display = ''

		})

		this.input.addEventListener('input', () => {

			if (this.input.value != '') {

				this.search()
					.then(data => {

						this.updateSearchBox(data)

					})

			}

			else this.updateSearchBox()

		})

	}

	getComponent() {

		const input = el('input', { class: 'app-search__input', placeholder: 'Введите запрос' })

		const list = el('ul.app-search__list')

		const searchBox = el('.app-search__box', list)

		const form = el('form', { class: 'app-search' }, input)

		const component = el('.app-search', [

			form,

			searchBox

		])

		this.component = component
		this.form = form
		this.input = input
		this.searchBox = searchBox
		this.list = list

		return {

			component,
			input,
			list,

		}

	}

	getSearchItem(data: object) {

		const name = el('span', { class: 'app-search__item--name' })

		if (typeof data.name === 'string') {

			setAttr(name, { innerText: data.name })

		}

		else {

			mount(name, data.name)

		}

		const searchItem = el('li', { class: 'app-search__item', tabIndex: 0 }, name)

		if (data.search != undefined && data.search != false) {

			setAttr(data.search, { className: 'app-search__item--search' })

			mount(searchItem, data.search)

		}

		return searchItem

	}

	async updateSearchBox(data: object[]) {

		if (!data) {

			this.list.innerHTML = ''

			let dataLength = this.data.length

			if (dataLength > 5) dataLength = 5

			for (let i = 0; i < dataLength; i++) {

				const el = this.data[i]

				const name = `${el.lastName} ${el.name} ${el.surname}`

				const item = await this.getSearchItem({ name })

				this.searchEvents(item, this.clients[i])

				mount(this.list, item)

			}

		}

		else {

			this.list.innerHTML = ''

			for (let item of data) {

				const component = await this.getSearchItem({ name: item.name, search: item.value })

				this.searchEvents(component, item.client)

				mount(this.list, component)


			}

		}
	}

	searchEvents(component, client) {

		component.addEventListener('click', () => {

			this.searchBox.style.display = ''

			client.classList.add('app-table__item--active')

			setTimeout(() => {

				client.classList.remove('app-table__item--active')

			}, 1500)

			client.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})

		})

		component.addEventListener('keydown', (event: KeyboardEvent) => {

			if (event.keyCode == 13) {

				component.click()

			}

		})

		component.addEventListener('mouseover', () => {

			client.classList.add('app-table__item--active')

		})

		component.addEventListener('mouseout', () => {

			if (this.searchBox.style.display == 'block') {

				client.classList.remove('app-table__item--active')

			}

		})

		this.form.addEventListener('submit', e => e.preventDefault())

	}

	searchMark(str) {

		const value = this.input.value.toLowerCase()
		const pos = str.search(value)
		const len = value.length

		return el('span', [

			`${str.slice(0, pos)}`,
			el('mark', `${str.slice(pos, pos + len)}`),
			str.slice(pos + len)

		])

	}

	async search() {

		const value = `${this.input.value}`.trim().toLowerCase();

		let searchItems: ISearchItem[] = []

		for (let index in this.data) {

			if (searchItems.length == 5) {

				return searchItems

			}

			const element = this.data[index]

			const name = `${element.lastName} ${element.name} ${element.surname}`.toLowerCase()

			if (name.search(value) != -1) {

				searchItems.push({ name: this.searchMark(name), client: this.clients[index] })

			}

			else if (element.id.search(value) != -1) {

				searchItems.push({ name: name, client: this.clients[index], value: this.searchMark(element.id) })

			}

		}

		return searchItems

	}

}
