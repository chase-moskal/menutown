
export function getAssignedElements(slot) {
	return Array.from(slot.assignedNodes())
		.filter(node => node instanceof HTMLElement)
}
