
import {Component, html, css} from "../toolbox/component.js"

import {MenuDisplay} from "./menu-display.js"
import {makeScrollMarmot} from "../toolbox/make-scroll-marmot.js"

const _scrollTop = Symbol("scrollTop")
const _shadowRoot = Symbol("shadowRoot")
const _activeIndex = Symbol("activeIndex")
const _toggleIndex = Symbol("toggleIndex")
const _scrollMarmot = Symbol("scrollMarmot")
const _getMenuDisplays = Symbol("getMenuDisplays")
const _updateScrollPoint = Symbol("updateScrollPoint")
const _handleBlanketClick = Symbol("handleBlanketClick")

export class MenuSystem extends Component {

	static get styles() {
		return css`
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			*:focus {
				outline: var(--focus-outline, 2px solid cyan);
			}

			[theme="concrete"] {
				position: absolute;
				width: 100%;
				right: 0;
				pointer-events: none;

				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
			}

			[theme="concrete"][lefty] {
				right: auto;
				left: 0;
				align-items: flex-start;
				justify-content: flex-start;
			}

			[theme="concrete"] * {
				z-index: 1;
				pointer-events: all;
			}

			[theme="concrete"] .blanket {
				z-index: 0;
				display: none;
				position: fixed;
				background: var(--menu-blanket-color, rgba(0,0,0, 0.5));
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}

			[theme="concrete"][active] .blanket {
				display: block;
			}

			[theme="concrete"] .list {
				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
				padding: var(--menu-gapsize, 0.15rem);
				margin-right: var(--menu-lanesize, 1rem);
				background: var(--menu-backcolor, rgba(240, 240, 240, 0.5));
			}

			[theme="concrete"][lefty] .list {
				margin-right: unset;
				margin-left: var(--menu-lanesize, 1rem);
			}

			[theme="concrete"] .list slot::slotted(menu-display) {
				display: block;
				flex: 0 0 auto;
			}
		`
	}

	static get properties() {
		return {
			theme: {type: String, reflect: true},
			lefty: {type: Boolean, reflect: true},
			active: {type: Boolean, reflect: true},
			sticky: {type: Boolean, reflect: true},
			[_scrollTop]: {type: Number},
			[_activeIndex]: {type: String}
		}
	}

	constructor() {
		super()

		this.theme = "concrete"
		this.active = false
		this.sticky = false
		this.lefty = false

		this[_activeIndex] = undefined
		this[_scrollTop] = 0
		this[_scrollMarmot] = undefined

		this[_updateScrollPoint] = scrollPoint => {
			if (!this.active) this[_scrollTop] = scrollPoint
		}

		this[_handleBlanketClick] = () => {
			this[_toggleIndex](this[_activeIndex])
		}

		this[_toggleIndex] = index => {
			this[_activeIndex] = index === this[_activeIndex]
				? undefined
				: index
			this.active = this[_activeIndex] !== undefined
		}

		this[_getMenuDisplays] = () => {
			const slot = this[_shadowRoot].querySelector("slot")
			const elements = Array.from(slot.assignedElements())
			return elements.filter(
				element => element instanceof MenuDisplay
			)
		}
	}

	createRenderRoot() {
		this[_shadowRoot] = this.attachShadow({mode: "closed"})
		this[_shadowRoot].addEventListener("slotchange", () => this.requestUpdate())
		return this[_shadowRoot]
	}

	connectedCallback() {
		super.connectedCallback()
		if (this.sticky && this.isConnected) {
			this[_scrollMarmot] = makeScrollMarmot({
				onScrollUpdate: this[_updateScrollPoint]
			})
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		if (this[_scrollMarmot]) this[_scrollMarmot].dispose()
		this[_scrollMarmot] = null
	}

	updated() {
		this[_getMenuDisplays]().forEach((display, index) => {
			display.theme = this.theme
			display.toggle = () => this[_toggleIndex](index)
			display.open = index === this[_activeIndex]
		})
	}

	render() {
		const top = this.sticky
			? this[_scrollTop]
			: 0
		return html`
			<div class="system"
				theme="${this.theme}"
				?lefty="${this.lefty}"
				?active="${this.active}"
				style="${`top: ${top}px`}">
					<div class="blanket" @click="${this[_handleBlanketClick]}"></div>
					<div class="list">
						<slot></slot>
					</div>
			</div>
		`
	}
}
