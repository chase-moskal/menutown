
import {observable, action, computed} from "mobx"

import {MenuAccount} from "../interfaces"

/**
 * Menu accountant
 * - keep track of which menu account is active
 * - toggle menu account activity
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
