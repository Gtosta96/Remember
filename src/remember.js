(function() {
	'use strict';

	//core imports
	var http = require('http');
	var httpProxy = require('http-proxy');
	var express = require('express');
	var app = express();

	//custom imports
	var utils = require('./remember-utils');
	const PROPERTIES = require('./remember-properties');

	var proxy = httpProxy.createProxyServer(PROPERTIES.serverUrl).listen(PROPERTIES.proxyPort);

	app.get('*', function(req, res) {
		res.send('Hello World');
		var utilsURL = utils.URL(req, res);

		var urlDetails = utilsURL.getUrlDetails();
		console.log(urlDetails);
	});

	app.listen(PROPERTIES.serverPort, function appListenCallback() {
		console.log('Server is Running on [%s]', PROPERTIES.serverUrl.target);
		console.log('Proxy is Running on port:[%s]', PROPERTIES.proxyPort);
	});
}());
