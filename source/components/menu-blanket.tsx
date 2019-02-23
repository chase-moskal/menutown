
import {h} from "preact"
import {observer} from "mobx-preact"

import {MenuBlanketProps} from "../interfaces"

export const MenuBlanket: (props: MenuBlanketProps) => JSX.Element = observer(({
	active,
	handleBlanketClick
}: MenuBlanketProps) => (
	<div
		className="menu-blanket"
		onClick={active ? handleBlanketClick : undefined}>
	</div>
))
