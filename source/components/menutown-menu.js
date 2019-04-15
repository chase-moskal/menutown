
import {LitElement, html, css} from "lit-element"

export class MenutownMenu extends LitElement {

	static get properties() {
		return {
			open: { type: Boolean }
		}
	}

	static get styles() {
		return css`
			.menu > .panel {
				display: none;
			}
			.menu[open] > .panel {
				display: block;
			}
		`
	}

	constructor() {
		super()
		this.open = false
	}

	render() {
		return html`
			<div class="menu" ?open="${this.open}">
				<button>
					<slot name="button"></slot>
				</button>
				<div class="panel">
					<slot></slot>
				</div>
			</div>
		`
	}
}

customElements.define("menutown-menu", MenutownMenu)
