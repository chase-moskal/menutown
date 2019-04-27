
import {Component, html, css} from "../toolbox/component.js"

const _shadowRoot = Symbol("shadowRoot")
const _handleButtonClick = Symbol("_handleButtonClick")

export class MenuDisplay extends Component {
	static get styles() {
		return css`
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			*:focus {
				outline: var(--focus-outline, 2px solid #0af);
			}

			:host([theme="concrete"]) button {
				position: relative;
				display: block;
				margin: var(--menu-gapsize, 0.15rem);
				padding: 0;
				border: none;
				background: transparent;
			}

			.panel {
				display: none;
			}

			:host([open]) .panel {
				display: block;
			}

			:host([theme="concrete"]) .panel {
				position: absolute;
				top: 100%;
				left: var(--menu-lanesize, 1rem);
				right: var(--menu-lanesize, 1rem);
				width: var(--menu-panel-width, 480px);
				max-width: calc(100% - calc(var(--menu-lanesize, 1rem) * 2));
				margin-left: auto;
				padding: var(--menu-panel-padding, 1rem);
				background: var(--menu-panel-bgcolor, white);
				border-radius: var(--menu-panel-border-radius, 0);
				box-shadow: var(--menu-panel-box-shadow, none);
			}
		`
	}

	static get properties() {
		return {
			toggle: {type: Function},
			open: {type: Boolean, reflect: true},
			theme: {type: String, reflect: true}
		}
	}

	constructor() {
		super()
		this.theme = ""
		this.open = false
		this.toggle = () => {}
		this[_handleButtonClick] = () => this.toggle()
	}

	createRenderRoot() {
		this[_shadowRoot] = this.attachShadow({mode: "closed"})
		return this[_shadowRoot]
	}

	updated(changedProperties) {
		if (changedProperties.has("open") && this.open)
			this[_shadowRoot].querySelector("button").focus()
	}

	render() {
		return html`
			<div class="menu">
				<button @click="${this[_handleButtonClick]}">
					<slot name="button"></slot>
				</button>
				<div class="panel">
					<slot></slot>
				</div>
			</div>
		`
	}
}
