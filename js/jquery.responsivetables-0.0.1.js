// require.responsivetables-0.0.1.js - Responsive Tables
// Author: Petter Kjelkenes <pk@aplia.no>
// License: LGPL

/**
 * The meaning of this plugin is to add elements with classes so CSS can transform a table
 * based on media queries.
 * 
 * Example of a TABLE on the Desktop:
 * 
 * |   H    |   H2  |   H3   |
 * |   1    |   2   |   3    |
 * |   4    |   5   |   6    |
 * 
 * Example of the same table on a Mobile:
 * 
 * |   H    |   1   |
 * |   H2   |   2   |
 * |   H3   |   3   |
 * ------------------
 * |   H    |   4   |
 * |   H2   |   5   |
 * |   H3   |   6   |
 * 
 * 
 * Required CSS:
	   @media screen and (max-width:480px) {
			.responsive-table .desktop-tr {
				display: none;
			}
			.responsive-table .mobile-tr {
				display: block !important; 
			}
		}
 */
(function($) {
	
	$.fn.extend({
		responsivetables: function (options) {
			
			
			// Default options.
			var settings = $.extend({
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
				
	        }, options);

			// Custom logger.
			var log = function () {
				if (settings.debug) {
					console.log.apply(console, arguments);
				}
			};
			
			
			return this.each(function () {
				// Cache everything in local variables
				// to get best performance, because DOM lookups is slow.
				var $el = $(this),
					// Might not exist, later we analyse this to see if this is a TR instead.
					$thead = $el.children('thead'),
					// Might not exist, can be $el aswell.
					$tbody = $el.children('tbody'),
					// A row can be seen as a TR, allthough header is excluded.
					rows = null,
					// Columns as in "header columns" names.
					columns = null;
				
				
				// First of all we try to analyze the table
				// We check for thead / tr / th occourence and 
				// modify the table based on what we found.
				// If we did not understand the table, the 
				// table will not be triggered as responsive.
				
				
				// Does the thead element exist ?
				if ($thead.length > 0) {
					log("Table has THEAD");
					
					// Find all the rows in the tbody tag.
					rows = $tbody.find('tr');
					// We assume that th elements is found under the thead tag.
					columns = $thead.find('th');
				} 
				// If not, is the first element a "TR" and have a TH inside?
				else if ($el.find('tr:first th').length > 0) {
					
					
					// We assume that the first tr can be seen as the 
					// header of the table.
					$thead = $el.find('tr:first');
					
					
					
					// Check that there are only TH's in the TR.
					var onlyThs = true;
					$thead.children().each(function () {
						if ($(this).prop('tagName') !== 'TH') {
							onlyThs = false;
						}
					});
					
					if (!onlyThs) {
						log("The first TR in the table does not contain only TH elements, skipping.");
						return false;
					}
					
					
					log("Table does not have THEAD.");
					
					
					// We don't have any tbody, so tbody equals "table" tag.
					$tbody = $el;
					
					// If we found thead tag.
					if ($thead.length > 0) {
						// Rows is all TRS but NOT the first (that is the header)
						rows = $el.find('tr:not(:first)');
						// And we assume that we find th elements in the first TR tag.
						columns = $thead.find('th');
						
					} else {
						// There was not a single TR in the table, well then ...
						log("Could not find a tr in table.");
						return;
					}
					
					
				} else {
					log("Responsivetable did not understand this table");
					return;
				}
				

				// Ok, we understood the table's format, its correctly 
				// analyzed and we add a class to the <table> element.
				$el.addClass(settings.tableClass);
				// We also add "desktop-tr" to all the tr's AND thead we found.
				$thead.addClass(settings.desktopTrClass);
				rows.addClass(settings.desktopTrClass);
				
				
				// We are going to store HTML tags for mobile version in this variable.
				var mobile_body = "";
				
				
				// Loop all the rows (TR)
				rows.each(function (indexRow, valRow) {
					var $tr = $(valRow);
					var $tds = $tr.children('td');
					
					// Each row is separated in its own "tbody" tag.
					mobile_body += "<tbody class='"+settings.mobileTbodyClass+"' style='display: none;'>";
					
					// Render all the tr's td.
					columns.each(function (index, val) {
						
						// We add special class to all elements, TR, TH and TD.
						mobile_body += [
						                "<tr class='"+settings.mobileTrClass+"'>",
						                "<th class='"+settings.mobileThClass+"'>"+$(val).html()+"</th>",
						                "<td class='"+settings.mobileTdClass+"'>"+$($tds.get(index)).html()+"</td>",
						                "</tr>"
						                ].join();
					});
					
					mobile_body += "</tbody>";
					
				});
				
				// In the end, add elements to the <table> tag.
				$el.append(mobile_body);
			});
		}
	});
	
})(jQuery);