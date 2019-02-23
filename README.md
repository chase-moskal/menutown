
# menutown

**stores**

- *`MenuAccount`* — represents a single menu
- *`MenuAccountant`* — check or toggle which menu is active
- *`ScrollMarmot`* — tracks user scroll, can be locked-in-place

**components**

- *`MenuSystem`* — multiple togglable menus which follow the user's scroll
- *`MenuBlanket`* — blackout mask layer, appears while any menu is active
- *`MenuDisplayList`* — list of all available menus
- *`MenuDisplay`* — a single menu
- *`MenuButton`* — button to open/close a menu
- *`MenuPanel`* — contains menu contents

**routines**

- *`installMenuSystem`* — helper to install a menu system onto a webpage
