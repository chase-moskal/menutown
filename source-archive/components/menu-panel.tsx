
import {observer} from "mobx-preact"
import {h, RenderableProps} from "preact"

export const MenuPanel = observer((props: RenderableProps<{}>) => (
	<div className="menu-panel">
		{props.children}
	</div>
))
