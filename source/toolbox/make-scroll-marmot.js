
const scrollUpdateEvents = ["scroll", "resize"]

export function makeScrollMarmot({onScrollUpdate}) {
	let scrollTop = 0

	function handleScrollUpdate() {
		scrollTop = document.documentElement.scrollTop
		onScrollUpdate(scrollTop)
	}

	for (const event of scrollUpdateEvents)
		window.addEventListener(event, handleScrollUpdate)

	handleScrollUpdate()

	return {
		dispose() {
			for (const event of scrollUpdateEvents)
				window.removeEventListener(event, handleScrollUpdate, {passive: true})
		}
	}
}
