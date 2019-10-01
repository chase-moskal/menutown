
export function getEdgeVersion(userAgent = navigator.userAgent) {
	const result = /(?:^|\s)Edge\/([\d\.]+)(?:\s|$)/i.exec(userAgent)
	return result
		? result[1]
		: false
}
