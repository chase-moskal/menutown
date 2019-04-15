
import {configure} from "mobx"

import {installMenuSystem} from "./routines/install-menu-system"

import {makeMockMenuContent, makeMockButtonContent} from "./mocks"

configure({enforceActions: "always"})

installMenuSystem({
	element: document.querySelector(".menu-system"),
	accounts: [
		{
			name: "account",
			content: makeMockMenuContent("mock account settings"),
			buttonContent: makeMockButtonContent("a")
		},
		{
			name: "cart",
			content: makeMockMenuContent("mock cart settings"),
			buttonContent: makeMockButtonContent("b")
		}
	]
})

console.log("🤖")
