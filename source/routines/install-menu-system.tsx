
import {h} from "preact"
import * as preact from "preact"

import {MenuSystem} from "../components/menu-system"
import {InstallMenuSystemOptions} from "../interfaces"
import {MenuAccountant} from "../stores/menu-accountant"

export function installMenuSystem(options: InstallMenuSystemOptions) {
	const menuAccountant = new MenuAccountant()

	// register each menu account
	for (const menuAccount of options.menuAccounts)
		menuAccountant.registerMenuAccount(menuAccount)

	// render the ui
	const element = preact.render((
		<MenuSystem {...{menuAccountant}}/>
	), null, options.element)

	// return the accountant and new ui element
	return {menuAccountant, element}
}

export function makeMockMenuContent(content: string) {
	return <div className="mock-menu">{content}</div>
}
