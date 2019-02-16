
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {MenuSystemProps, MenuAccount} from "../interfaces"

import {MenuEntry} from "./menu-entry"

@observer
export class MenuSystem extends Component<MenuSystemProps> {

	render() {
		const {menuAccountant} = this.props
		return (
			<div className="menu-system">
				{this.renderMenus(menuAccountant.menuAccounts)}
			</div>
		)
	}

	private renderMenus(menuAccounts: MenuAccount[]) {
		const {menuAccountant} = this.props
		return menuAccounts.map(menuAccount => {
			const menuIsActive = menuAccount === menuAccountant.activeMenuAccount
			const menuButtonClickHandler = this.prepareMenuButtonClickHandler(menuAccount)
			return (
				<MenuEntry {...{
					menuAccount,
					menuIsActive,
					menuButtonClickHandler
				}}/>
			)
		})
	}

	private readonly prepareMenuButtonClickHandler = (
		(menuAccount: MenuAccount) => (
			(event: MouseEvent) => {
				this.props.menuAccountant.toggleMenuAccount(menuAccount)
			}
		)
	)
}
