# Responsive tables

## What is it?

This is a jQuery plugin. The plugin makes it possible to add a selector to tables that makes the tables responsive.
Add forexample `$('table').responsivetable();` to your javascript.


## Example CSS:


Example css that you must add, the media query is important, rest is just styles.

```css
		.responsive-table .mobile-tr {
			margin-bottom: 5px;
			padding-bottom: 5px;
			border-bottom: 1px solid #F0EBEB;	
		}
		@media screen and (max-width:480px) {
			.responsive-table .desktop-tr {
				display: none;
			}
			.responsive-table .mobile-tr {
				display: block !important; /* !important is important >:)*/
			}
		}
``


## Options

```javascript
{
	// Debug mode, enables console.log debug information. Useful if the plugin does not parse your tables
	// since tables might be excluded based on the analyzing process.
	debug: false,
	// Added on original TR elements.
	desktopTrClass: 'desktop-tr',
	// Added on the <table> tag IF we analyzed the table correctly.
	tableClass: 'responsive-table',
	// A <tbody> tag is wrapping each original row in mobile view. So its possible to group screen rows on mobile too.
	mobileTbodyClass: 'mobile-tr',
	// A tr tag in mobile view is added on each of the columns on screen view.
	mobileTrClass: 'mobile-tr-line',
	mobileThClass: 'mobile-th',
	mobileTdClass: 'mobile-td'
}
``


