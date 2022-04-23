export default class API {

	constructor() {

		// console.log(this.fetch())

	}

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
