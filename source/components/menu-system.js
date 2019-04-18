
import {LitElement, html, css} from "lit-element"

import {MenuDisplay} from "./menu-display.js"
import {makeScrollMarmot} from "../toolbox/make-scroll-marmot.js"

const _actions = Symbol("actions")
const _scrollTop = Symbol("scrollTop")
const _scrollMarmot = Symbol("scrollMarmot")
const _updateScrollPoint = Symbol("updateScrollPoint")
const _handleBlanketClick = Symbol("handleBlanketClick")

export class MenuSystem extends LitElement {

	static get styles() {
		return css`
			[theme="concrete"] {
				position: absolute;
				width: 100%;
				top: 0;
				right: 0;
				pointer-events: none;

				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
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

			[theme="concrete"][open] .blanket {
				display: block;
			}

			[theme="concrete"] .list {
				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
				padding: var(--menu-gapsize, 0.25em);
				margin-right: var(--menu-lanesize, 1em);
				background: var(--menu-backcolor, rgba(240, 240, 240, 0.5));
			}

			[theme="concrete"] .list slot::slotted(menu-display) {
				display: block;
				flex: 0 0 auto;
			}
		`
	}

	static get properties() {
		return {
			theme: {type: String},
			sticky: {type: Boolean},
			activeIndex: {type: String},
			[_scrollTop]: {type: Number}
		}
	}

	constructor() {
		super()

		this.sticky = false
		this.theme = "concrete"
		this.activeIndex = undefined

		this[_scrollTop] = 0
		this[_scrollMarmot] = undefined

		this[_updateScrollPoint] = scrollPoint => {
			if (!this.open) this[_scrollTop] = scrollPoint
		}

		this[_handleBlanketClick] = event => {
			this[_actions].toggleIndex(this.activeIndex)
		}

		this[_actions] = {
			toggleIndex: index => this.activeIndex = index === this.activeIndex
				? undefined
				: index
		}
	}

	get open() {
		return this.activeIndex !== undefined
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
		const slot = this.shadowRoot.querySelector("slot")
		const elements = Array.from(slot.assignedElements())
		const menuDisplays = elements.filter(
			element => element.tagName.toLowerCase() === MenuDisplay.tagName.toLowerCase()
		)

		menuDisplays.forEach((display, index) => {
			display.theme = this.theme
			display.toggle = () => this[_actions].toggleIndex(index)
			display.open = index === this.activeIndex
		})
	}

	createRenderRoot() {
		const shadowRoot = super.createRenderRoot()
		shadowRoot.addEventListener("slotchange", () => this.requestUpdate())
		return shadowRoot
	}

	render() {
		const top = this.sticky
			? this[_scrollTop]
			: 0
		return html`
			<div
				class="system"
				theme="${this.theme}"
				?open="${this.open}"
				style="${`top: ${top}px`}">
					<div class="blanket" @click="${this[_handleBlanketClick]}"></div>
					<div class="list">
						<slot></slot>
					</div>
			</div>
		`
	}
}

MenuSystem.tagName = "menu-system"

customElements.define(MenuSystem.tagName, MenuSystem)
