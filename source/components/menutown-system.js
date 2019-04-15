
import {LitElement, html, css} from "lit-element"

export class MenutownSystem extends LitElement {

	static get styles() {
		return css`
			.system {}
		`
	}

	render() {
		return html`
			<div class="system">
				<div class="blanket"></div>
				<slot></slot>
			</div>
		`
	}
}

customElements.define("menutown-system", MenutownSystem)
