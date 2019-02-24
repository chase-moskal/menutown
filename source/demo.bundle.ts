
import {configure} from "mobx"

import {
	installMenuSystem,
	makeMockMenuContent
} from "./routines/install-menu-system"

configure({enforceActions: "always"})

installMenuSystem({
	element: document.querySelector(".menu-system"),
	accounts: [
		{
			name: "account",
			content: makeMockMenuContent("mock account settings")
		},
		{
			name: "cart",
			content: makeMockMenuContent("mock cart settings")
		}
	]
})

console.log("🤖")
