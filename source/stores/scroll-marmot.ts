
import {observable, action} from "mobx"

export class ScrollMarmot {
	@observable lock: boolean = false
	@observable scrollPoint: number = 0

	@action updateScrollPoint() {
		this.scrollPoint = document.documentElement.scrollTop
	}

	@action setLock(value: boolean) {
		this.lock = value
	}

	private readonly handleScrollUpdate = () => {
		if (this.lock) return
		this.updateScrollPoint()
	}

	private readonly scrollUpdateEvents = ["scroll", "resize"]

	constructor() {
		this.updateScrollPoint()
		for (const event of this.scrollUpdateEvents)
			window.addEventListener(event, this.handleScrollUpdate)
	}

	deconstruct() {
		for (const event of this.scrollUpdateEvents)
			window.removeEventListener(event, this.handleScrollUpdate)
	}
}
