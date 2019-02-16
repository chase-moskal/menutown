
import {installMenuSystem, makeMockMenuContent} from "./routines/install-menu-system"

installMenuSystem({
	element: document.querySelector(".menu-system"),
	menuAccounts: [
		{
			menuName: "account",
			menuContent: makeMockMenuContent("mock account settings")
		},
		{
			menuName: "cart",
			menuContent: makeMockMenuContent("mock shopping cart")
		}
	]
})

console.log("🤖")
