
import {h} from "preact"
import {observer} from "mobx-preact"

import {MenuEntryProps} from "../interfaces"

import {MenuPanel} from "./menu-panel"
import {MenuButton} from "./menu-button"

export const MenuEntry = observer(({
	menuAccount,
	menuIsActive,
	menuButtonClickHandler
}: MenuEntryProps) => {
	const {menuName, menuContent} = menuAccount
	return (
		<div
			className="menu-entry"
			data-menu-name={menuName}
			data-menu-is-active={menuIsActive}>
				<MenuButton onClick={menuButtonClickHandler}/>
				{
					menuIsActive
						? <MenuPanel>{menuContent}</MenuPanel>
						: null
				}
		</div>
	)
})
