
import {ComponentChildren} from "preact"

import {MenuAccount} from "./stores/menu-account"
import {ScrollMarmot} from "./stores/scroll-marmot"
import {MenuAccountant} from "./stores/menu-accountant"

export interface MenuAccountOptions {
	name: string
	content: ComponentChildren
}

export interface MenuAccountantOptions {
	accounts: MenuAccount[]
	scrollMarmot?: ScrollMarmot
}

export interface MenuSystemProps {
	accountant: MenuAccountant
}

export interface MenuDisplayProps {
	panelOpen: boolean
	account: MenuAccount
	menuButtonClickHandler: (event: MouseEvent) => void
}

export interface InstallMenuSystemOptions {
	element: Element
	accounts: MenuAccount[]
	accountant?: MenuAccountant
	scrollMarmot?: ScrollMarmot
	children?: ComponentChildren
}

export interface MenuDisplayListProps {
	accountant: MenuAccountant
}

export interface MenuBlanketProps {
	active: boolean
	handleBlanketClick: (event: MouseEvent) => void
}
