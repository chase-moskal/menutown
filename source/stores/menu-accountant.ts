
import {
	action,
	autorun,
	computed,
	observable,
	runInAction,
	IReactionDisposer
} from "mobx"

import {MenuAccountantOptions, MenuAccount} from "../interfaces"

import {ScrollMarmot} from "./scroll-marmot"

/**
 * Keep track of which menu account is active
 */
export class MenuAccountant {
	@observable scrollMarmot: ScrollMarmot
	@observable accounts: MenuAccount[] = []
	@observable activeAccount: MenuAccount = null

	@computed get active() {
		return !!this.activeAccount
	}

	private disposables: IReactionDisposer[] = []

	/**
	 * Construct a menu accountant
	 */
	constructor({
		accounts,
		scrollMarmot = new ScrollMarmot()
	}: MenuAccountantOptions) {

		// register accounts and save the scrollmarmot
		runInAction(() => {
			this.scrollMarmot = scrollMarmot
			for (const account of accounts) this.accounts.push(account)
		})

		// set lock on scroll marmot based on menu activity
		this.disposables.push(
			autorun(() => {
				scrollMarmot.setLock(this.active)
			})
		)
	}

	/**
	 * Toggle which account is active
	 */
	@action toggleAccount(account: MenuAccount) {
		if (this.activeAccount === account) {
			this.activeAccount = null
		}
		else {
			this.activeAccount = account
		}
	}

	/**
	 * Dispose mobx reactions
	 */
	dispose() {
		for (const dispose of this.disposables) dispose()
	}
}
