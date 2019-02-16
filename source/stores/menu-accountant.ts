
import {observable, action} from "mobx"

import {MenuAccount} from "../interfaces"

/**
 * Menu accountant
 * - each menu has its own 'menu account' which is registered with this
 *   'menu accountant' mobx store
 * - this store keeps track of which menu is currently activated
 */
export class MenuAccountant {
	@observable menuAccounts: MenuAccount[] = []
	@observable activeMenuAccount: MenuAccount = null

	@action registerMenuAccount(menuAccount: MenuAccount) {
		this.menuAccounts.push(menuAccount)
	}

	@action toggleMenuAccount(menuAccount: MenuAccount) {
		if (this.activeMenuAccount === menuAccount) {
			this.activeMenuAccount = null
		}
		else {
			this.activeMenuAccount = menuAccount
		}
	}
}
