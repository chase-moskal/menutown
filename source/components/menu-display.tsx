
import {h} from "preact"
import {observer} from "mobx-preact"

import {MenuDisplayProps} from "../interfaces"

import {MenuPanel} from "./menu-panel"
import {MenuButton} from "./menu-button"

export const MenuDisplay = observer(({
	account,
	panelOpen,
	menuButtonClickHandler
}: MenuDisplayProps) => {
	return (
		<div
			className="menu-display"
			data-name={account.name}
			data-active={panelOpen}>
				<MenuButton onClick={menuButtonClickHandler}/>
				{
					panelOpen
						? <MenuPanel>{account.content}</MenuPanel>
						: null
				}
		</div>
	)
})
