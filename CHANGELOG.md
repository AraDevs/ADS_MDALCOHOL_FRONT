Types actions: [ADD], [CHANGE], [FIXED], [REMOVE], [UPDATE], [CONFIGURE]

CHANGELOG example: 

	Write in file CHANGELOG.md:
		## [ADD, CHANGE, FIX] yyyy-mm-dd HH:mm
			* Add description action
			* Change descrition action
			* Fix descrption action

Create commit example:

	Write in console:
		git commit -m"See file CHANGELOG.md##yyyy-mm-dd HH:mm"
		git push

## [ADD] 01-03-2020 21:22
Add basic dashboard configuration

## [ADD] 01-03-2020 22:10
Add transloco

## [ADD] 01-03-2020 22:48
Add NgRx