// require.responsivetables-0.0.1.js - Responsive Tables
// Copyright (c) 2013 Aplia AS - http://aplia.no
// Author: Petter Kjelkenes <pk@aplia.no>
// License: LGPL
(function($) {
	
	$.fn.extend({
		responsivetables: function () {
			
			return this.each(function () {
				// Cache everything in local variables
				// to get best performance, because DOM lookups is slow.
				var $el = $(this),
					$thead = $el.children('thead'),
					$tbody = $el.children('tbody'),
					original_head = "",
					rows = null,
					columns = null;
				
				
				$el.addClass('responsive-table');
				
				// Does the thead element exist ?
				if ($thead.length > 0) {
					console.log("Table has THEAD");
					original_head = $thead.html();
					rows = $tbody.find('tr');
					columns = $thead.find('th');
				} 
				// If not, is the first element a "TR" and have a TH inside?
				else if ($el.find('tr:first th').length > 0) {
					console.log("Table does not have THEAD.");
					$thead = $el.find('tr:first');
					$tbody = $el;
					
					if ($thead.length > 0) {
						$thead.addClass('resptable-thead');
						original_head = $thead.html();
						
						rows = $el.find('tr:not(:first)');
						columns = $thead.find('th');
						
					} else {
						console.log("Could not find a tr in table.");
						return;
					}
					
					
				} else {
					console.log("Responsivetable did not understand this table", $el);
					return;
				}
				
				var original_body = $tbody.html();
				
				var mobile_head = "";
				var mobile_body = "";
				
				
				rows.each(function (indexRow, valRow) {
					var $tr = $(valRow);
					var $tds = $tr.children('td');
					
					mobile_body += "<tbody class='mobile-tr'>";
					
					columns.each(function (index, val) {
						
						mobile_body += [
						                "<tr class='mobile-tr-line'>",
						                "<th class='mobile-th'>"+$(val).html()+"</th>",
						                "<td class='mobile-td'>"+$($tds.get(index)).html()+"</td>",
						                "</tr>"
						                ].join();
					});
					
					mobile_body += "</tbody>";
					
				});
				
				
				// Register a handler based on width. 
				enquire.register("screen and (max-width:480px)", {
					match: function () {
						$thead.html(mobile_head);
						$tbody.html(mobile_body);
					},
					unmatch: function () {
						$thead.html(original_head);
						$tbody.html(original_body);
						
					}
				});
			});
		}
	});
	
})(jQuery);