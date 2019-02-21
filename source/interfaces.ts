
import {ComponentChildren} from "preact"

import {ScrollMarmot} from "./stores/scroll-marmot"
import {MenuAccountant} from "./stores/menu-accountant"

export type MenuBodyStore = any

export interface MenuAccount {
	menuName: string
	menuContent: ComponentChildren
}

export interface MenuSystemProps {
	scrollMarmot: ScrollMarmot
	menuAccountant: MenuAccountant
}

export interface MenuEntryProps {
	menuIsActive: boolean
	menuAccount: MenuAccount
	menuButtonClickHandler: (event: MouseEvent) => void
}

export interface InstallMenuSystemOptions {
	element: Element
	menuAccounts: MenuAccount[]
	children?: ComponentChildren
	scrollMarmot?: ScrollMarmot
	menuAccountant?: MenuAccountant
}
