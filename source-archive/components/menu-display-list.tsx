
import {h} from "preact"
import {observer} from "mobx-preact"

import {MenuDisplayListProps} from "../interfaces"

import {MenuDisplay} from "./menu-display"

export const MenuDisplayList: (props: MenuDisplayListProps) => JSX.Element =
	observer(({accountant}: MenuDisplayListProps) => (
		<div className="menu-display-list">
			{
				accountant.accounts.map(account => {
					const panelOpen = account === accountant.activeAccount
					const menuButtonClickHandler = (event: MouseEvent) => accountant.toggleAccount(account)
					return (
						<MenuDisplay {...{
							account,
							panelOpen,
							menuButtonClickHandler
						}}/>
					)
				})
			}
		</div>
	))
