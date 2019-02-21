
import {h} from "preact"
import * as preact from "preact"

import {MenuSystem} from "../components/menu-system"
import {ScrollMarmot} from "../stores/scroll-marmot"
import {InstallMenuSystemOptions} from "../interfaces"
import {MenuAccountant} from "../stores/menu-accountant"

export function installMenuSystem({
	element,
	children,
	menuAccounts,
	scrollMarmot = new ScrollMarmot(),
	menuAccountant = new MenuAccountant()
}: InstallMenuSystemOptions) {

	// register each menu account
	for (const menuAccount of menuAccounts)
		menuAccountant.registerMenuAccount(menuAccount)

	// render the ui
	const ui = (
		<MenuSystem {...{scrollMarmot, menuAccountant}}>
			{children}
		</MenuSystem>
	)
	const newElement = preact.render(ui, null, element)

	// return the accountant and new ui element
	return {menuAccountant, newElement}
}

export function makeMockMenuContent(content: string) {
	return (
		<div className="mock-menu">
			{content}
		</div>
	)
}
