
import {h} from "preact"
import * as preact from "preact"

import {MenuSystem} from "../components/menu-system"
import {InstallMenuSystemOptions} from "../interfaces"
import {MenuAccountant} from "../stores/menu-accountant"

export function installMenuSystem({
	element,
	children,
	accounts,
	accountant = new MenuAccountant({accounts})
}: InstallMenuSystemOptions) {

	const ui = (
		<MenuSystem accountant={accountant}>
			{children}
		</MenuSystem>
	)

	const newElement = preact.render(ui, null, element)

	return {accountant, newElement}
}

export function makeMockMenuContent(content: string) {
	return (
		<div className="mock-menu">
			<p>{content}</p>
		</div>
	)
}
