(function() {
	'use strict';

	//core imports
	var express = require('express');
	var app = express();
	var httpProxy = require('http-proxy');

	//custom imports
	var utils = require('./remember-utils');

	const PROPERTIES = {
		target: 'localhost',
		serverTarget: 9000,
		proxyPort: 8000,
		get proxyUrl() {
			return {
				target: 'http://' + this.target + ':' + this.serverTarget
			}
		}
	}
	var proxy = httpProxy.createProxyServer(PROPERTIES.proxyUrl).listen(PROPERTIES.proxyPort);

	proxy.on('proxyReq', function(proxyReq, req, res, options) {
  		proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
	});

	var lastUrl;
	app.get('*', function (req, res) {
		var url = utils.getFullUrl(req);

		res.redirect(url);
		res.end();
	});

	app.listen(PROPERTIES.serverTarget, function() {
		console.log('Server Running...');
	});
}());
