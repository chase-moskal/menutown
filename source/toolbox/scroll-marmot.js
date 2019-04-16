
const scrollUpdateEvents = ["scroll", "resize"]

export function makeScrollMarmot({onScrollUpdate}) {
	let lock = false
	let scrollPoint = 0

	function setLock(value) {
		lock = value
	}

	function getScrollPoint() {
		return scrollPoint
	}

	function handleScrollUpdate() {
		if (!lock) {
			scrollPoint = document.documentElement.scrollTop
			onScrollUpdate(scrollPoint)
		}
	}

	for (const event of scrollUpdateEvents)
		window.addEventListener(event, handleScrollUpdate)

	function dispose() {
		for (const event of scrollUpdateEvents)
			window.removeEventListener(event, handleScrollUpdate)
	}

	return {
		setLock,
		dispose,
		getScrollPoint
	}
}
