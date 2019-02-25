
import {h} from "preact"

export function makeMockMenuContent(content: string) {
	return (
		<div className="mock-menu">
			<p>{content}</p>
		</div>
	)
}

export function makeMockButtonContent(content: string) {
	return <p>{content}</p>
}
