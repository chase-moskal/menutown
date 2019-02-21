
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {autorun} from "mobx"

import {MenuSystemProps, MenuAccount} from "../interfaces"

import {MenuEntry} from "./menu-entry"
import { ScrollMarmot } from "source/stores/scroll-marmot";

@observer
export class MenuSystem extends Component<MenuSystemProps> {

	private reactions = [
		autorun(() => {
			const {menuAccountant, scrollMarmot} = this.props
			scrollMarmot.setLock(menuAccountant.isActive)
		})
	]

	componentWillUnmount() {
		for (const dispose of this.reactions) dispose()
	}

	render() {
		const {menuAccountant, scrollMarmot, children} = this.props
		const {isActive, activeMenuAccount, menuAccounts} = menuAccountant
		const top = `${scrollMarmot.scrollPoint}px`
		return (
			<div
				className="menu-system"
				data-is-active={isActive}
				data-active-menu-name={isActive && activeMenuAccount.menuName}
				style={{top}}>
					{this.renderMenuBlanket(isActive)}
					{children}
					<div className="menu-entries">
						{this.renderMenuEntries(menuAccounts)}
					</div>
			</div>
		)
	}

	private renderMenuBlanket(isActive: boolean) {
		return (
			<div
				className="menu-blanket"
				onClick={isActive ? this.handleBlanketClick : undefined}>
			</div>
		)
	}

	private renderMenuEntries(menuAccounts: MenuAccount[]) {
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

	private readonly handleBlanketClick = () => {
		const {menuAccountant} = this.props
		menuAccountant.toggleActiveMenuAccount(null)
	}

	private readonly prepareMenuButtonClickHandler = (
		(menuAccount: MenuAccount) => {
			const {menuAccountant} = this.props
			return (event: MouseEvent) => {
				menuAccountant.toggleActiveMenuAccount(menuAccount)
			}
		}
	)
}
