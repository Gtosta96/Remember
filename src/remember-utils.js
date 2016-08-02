(function() {
	'use strict';

	//core imports
	var url = require('url');

	var rememberUtils = {
		URL: URL
	}

	module.exports = rememberUtils;

	function URL(req) {
			var urlObject = {
				protocol: req.protocol,
				host: req.get('host'),
				pathname: req.originalUrl
			};
			var fullUrl = url.format(urlObject);
			
			return {
				getFullUrl: fullUrl,
				getTarget: {target: fullUrl}
			}
		}
}());
