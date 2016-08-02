(function() {
	'use strict';

	//core imports
	var url = require('url');

	var rememberUtils = {
		URL: URL
	}

	module.exports = rememberUtils;

	function URL(req, res) {
			var getUrlDetails = function(urlQuery, parseQueryString) {
				if(urlQuery)
					return url.parse(urlQuery, parseQueryString);
				else
					return url.parse(req.url, parseQueryString);
			}

			var notFound = function() {
				res.writeHead(404, 'text/plain');
				res.end('404, File not found');
			}
			
			return {
				getUrlDetails: getUrlDetails,
				notFound: notFound
			}
		}
}());
