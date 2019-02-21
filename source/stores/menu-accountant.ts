
import {observable, action, computed} from "mobx"

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

	@computed get isActive() {
		return !!this.activeMenuAccount
	}

	@action registerMenuAccount(menuAccount: MenuAccount) {
		this.menuAccounts.push(menuAccount)
	}

	@action toggleActiveMenuAccount(menuAccount: MenuAccount) {
		if (this.activeMenuAccount === menuAccount) {
			this.activeMenuAccount = null
		}
		else {
			this.activeMenuAccount = menuAccount
		}
	}
}
