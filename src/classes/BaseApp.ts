import { mount, setChildren } from 'redom'

export default class BaseApp {

	url = new URL(document.URL)

	appendComponent(container, component) {

		mount(container, component)

	}

	appendComponents(container, components) {

		setChildren(container, components)

	}

	deleteComponent(component) {

		component.parentNode.removeChild(component)

	}

}
