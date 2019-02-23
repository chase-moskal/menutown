
import {ComponentChildren} from "preact"
import {observable, runInAction} from "mobx"

import {MenuAccountOptions} from "../interfaces"

export class MenuAccount {
	@observable name: string
	@observable content: ComponentChildren

	constructor(options: MenuAccountOptions) {
		runInAction(() => {
			this.name = options.name
			this.content = options.content
		})
	}
}
