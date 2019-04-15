
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {MenuSystemProps} from "../interfaces"

import {MenuBlanket} from "./menu-blanket"
import {MenuDisplayList} from "./menu-display-list"

@observer
export class MenuSystem extends Component<MenuSystemProps> {

	render() {
		const {accountant, children} = this.props
		const top = `${accountant.scrollMarmot.scrollPoint}px`
		return (
			<div
				className="menu-system"
				data-active={accountant.active}
				data-active-name={accountant.active && accountant.activeAccount.name}
				style={{top}}>
					<MenuBlanket
						active={accountant.active}
						handleBlanketClick={this.handleBlanketClick}/>
					{children}
					<MenuDisplayList accountant={accountant}/>
			</div>
		)
	}

	private readonly handleBlanketClick = () => {
		this.props.accountant.toggleAccount(null)
	}
}
