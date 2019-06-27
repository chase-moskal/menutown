
# menutown changelog

## v0.0.0-dev.23 – 2019-06-27

breaking
- main module is now 'register-all.js'
- source is no longer exposed in the package, use dist

## v0.0.0-dev.17 — 2019-04-26

huge web components refactor

## v0.0.0-dev.15 — 2019-03-04

breaking:
- `installMenuSystem` no longer requires `MenuAccount` instances, `MenuAccount` is now just an interface, so you can pass object literals to `installMenuSystem`
- add `buttonContent` preact children to menu account objects, for custom buttons
- change scss mixin `menu-system` named parameters for improved customizability

other changes:
- fix strict mobx actions
- refactor scss panel margins and sizing
- leave css reset stuff to consumer

## v0.0.0-dev.6 — 2019-02-22

breaking:
- install menu system now requires real menu account instances
- add some cool pure components like MenuBlanket
- refactor some component naming, MenuDisplay, etc
- menu accountant now owns a scroll marmot

other changes:
- add readme terminology section

## v0.0.0-dev.5 — 2019-02-20
