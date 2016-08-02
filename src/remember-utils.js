(function() {
	'use strict';

	//core imports
	var url = require('url');

	var rememberUtils = {
		getFullUrl: getFullUrl
	}

	module.exports = rememberUtils;

	function getFullUrl(req) {
			var urlObject = {
				protocol: req.protocol,
				host: req.get('host'),
				pathname: req.originalUrl
			};
			
			return url.format(urlObject);
		}
}());
