
import {h} from "preact"
import {observer} from "mobx-preact"

export const MenuButton = observer(({onClick}: {
	onClick: (event: MouseEvent) => void
}) => (
	<button className="menu-button" {...{onClick}}></button>
))
