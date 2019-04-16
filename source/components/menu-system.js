
import {LitElement, html, css} from "lit-element"

import {MenuDisplay} from "./menu-display.js"
import {makeScrollMarmot} from "../toolbox/scroll-marmot.js"

const privates = {
	actions: Symbol(),
	scrollMarmot: Symbol(),
}

export class MenuSystem extends LitElement {

	static get styles() {
		return css`
			[theme="sticky"] {
				position: absolute;
				width: 100%;
				top: 0;
				right: 0;
				pointer-events: none;

				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
			}

			[theme="sticky"] * {
				z-index: 1;
				pointer-events: all;
			}

			[theme="sticky"] .blanket {
				z-index: 0;
				display: none;
				position: fixed;
				background: var(--menu-blanket-color, rgba(0,0,0, 0.5));
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}

			[theme="sticky"][open] .blanket {
				display: block;
			}

			[theme="sticky"] .list {
				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
				padding: var(--menu-gapsize, 1em);
				margin-right: var(--menu-lanesize, 1em);
				background: var(--menu-backcolor, grey);
			}

			[theme="sticky"] .list slot::slotted(menu-display) {
				display: block;
				flex: 0 0 auto;
			}
		`
	}

	static get properties() {
		return {
			theme: {type: String},
			activeIndex: {type: String},
			scrollFollowDisabled: {type: Boolean},
		}
	}

	constructor() {
		super()
		this.theme = "sticky"
		this.activeIndex = undefined
		this.scrollFollowDisabled = false
		this[privates.actions] = {
			toggleIndex: index => this.activeIndex = index === this.activeIndex
				? undefined
				: index
		}
	}

	get open() {
		return this.activeIndex !== undefined
	}

	firstUpdated() {
		if (this.theme === "sticky" && !this.scrollFollowDisabled) {
			const system = this.shadowRoot.querySelector(".system")
			this[privates.scrollMarmot] = makeScrollMarmot({
				onScrollUpdate: scrollPoint => system.style.top = `${scrollPoint}px`
			})
		}
	}

	disconnectedCallback() {
		const scrollMarmot = this[privates.scrollMarmot]
		if (scrollMarmot) scrollMarmot.dispose()
	}

	updated() {
		const scrollMarmot = this[privates.scrollMarmot]
		if (scrollMarmot) scrollMarmot.setLock(this.open ? true : false)
		const slot = this.shadowRoot.querySelector("slot")
		const elements = Array.from(slot.assignedElements())
		const menuDisplays = elements.filter(
			element => element.tagName.toLowerCase() === MenuDisplay.tagName.toLowerCase()
		)
		menuDisplays.forEach((display, index) => {
			display.theme = this.theme
			display.toggle = () => this[privates.actions].toggleIndex(index)
			display.open = index === this.activeIndex
		})
	}

	createRenderRoot() {
		const shadowRoot = super.createRenderRoot()
		shadowRoot.addEventListener("slotchange", () => this.requestUpdate())
		return shadowRoot
	}

	render() {
		return html`
			<div class="system" theme="${this.theme}" ?open="${this.open}">
				<div class="blanket"></div>
				<div class="list">
					<slot></slot>
				</div>
			</div>
		`
	}
}

MenuSystem.tagName = "menu-system"

customElements.define(MenuSystem.tagName, MenuSystem)
