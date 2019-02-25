
import {h, RenderableProps} from "preact"
import {observer} from "mobx-preact"

export const MenuButton = observer(({onClick, children}: RenderableProps<{
	onClick: (event: MouseEvent) => void
}>) => (
	<button className="menu-button" {...{onClick}}>
		{children}
	</button>
))
