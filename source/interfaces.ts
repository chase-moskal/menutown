
import {Component, ComponentChildren} from "preact"

import {MenuAccountant} from "./stores/menu-accountant"

export type MenuBodyStore = any

export interface MenuAccount {
	menuName: string
	menuContent: ComponentChildren
}

export interface MenuSystemProps {
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
}
