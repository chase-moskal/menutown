
import {LitElement, html, css} from "lit-element"

export class MenuDisplay extends LitElement {

	static get properties() {
		return {
			theme: {type: String},
			toggle: {type: Function},
			open: {type: Boolean, reflect: true}
		}
	}

	static get styles() {
		return css`
			.menu > .panel {
				display: none;
			}

			[open] > .panel {
				display: block;
			}

			[theme="concrete"] button {
				position: relative;
				display: block;
				margin: var(--menu-gapsize, 0.15em);
				padding: 0;
				border: none;
				background: transparent;
			}

			[theme="concrete"] .panel {
				position: absolute;
				top: 100%;
				left: var(--menu-panel-lanesize, 1rem);
				right: var(--menu-panel-lanesize, 1rem);
				margin-left: auto;
				max-width: 640px;
				padding: var(--menu-panel-padding, 1rem);
				background: var(--menu-panel-bgcolor, white);
				border-radius: var(--menu-panel-border-radius, 0);
				box-shadow: var(--menu-panel-box-shadow, none);
			}
		`
	}

	constructor() {
		super()
		this.theme = ""
		this.open = false
		this.toggle = () => {}
		this.handleButtonClick = () => this.toggle()
	}

	render() {
		return html`
			<div class="menu" theme="${this.theme}" ?open="${this.open}">
				<button @click="${this.handleButtonClick}">
					<slot name="button"></slot>
				</button>
				<div class="panel">
					<slot></slot>
				</div>
			</div>
		`
	}
}

MenuDisplay.tagName = "menu-display"

customElements.define(MenuDisplay.tagName, MenuDisplay)
