
const scrollUpdateEvents = ["scroll", "resize"]

export function makeScrollMarmot({onScrollUpdate}) {
	function handleScrollUpdate() {
		const scrollTop = window.pageYOffset
			|| document.documentElement.scrollTop
			|| document.body.scrollTop
			|| 0
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
