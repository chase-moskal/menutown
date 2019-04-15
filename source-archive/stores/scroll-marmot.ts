
import {observable, action} from "mobx"

/**
 * Track user scrolling position
 * - has a lock mechanism which halts the tracking
 */
export class ScrollMarmot {
	@observable lock: boolean
	@observable scrollPoint: number

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
		this.setLock(false)
		for (const event of this.scrollUpdateEvents)
			window.addEventListener(event, this.handleScrollUpdate)
	}

	deconstruct() {
		for (const event of this.scrollUpdateEvents)
			window.removeEventListener(event, this.handleScrollUpdate)
	}
}
