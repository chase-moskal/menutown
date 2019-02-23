
import {
	installMenuSystem,
	makeMockMenuContent
} from "./routines/install-menu-system"

import {MenuAccount} from "./stores/menu-account"

installMenuSystem({
	element: document.querySelector(".menu-system"),
	accounts: [
		new MenuAccount({
			name: "account",
			content: makeMockMenuContent("mock account settings")
		}),
		new MenuAccount({
			name: "cart",
			content: makeMockMenuContent("mock cart settings")
		})
	]
})

console.log("🤖")
