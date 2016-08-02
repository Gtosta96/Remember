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

	app.get('*', function appGetCallback(req, res) {
		doProxy(req, res);
	});

	app.listen(PROPERTIES.serverTarget, function appListenCallback() {
		console.log('Server is Running on [%s]', PROPERTIES.proxyUrl.target);
		console.log('Proxy is Running on port:[%s]', PROPERTIES.proxyPort);
	}).close();

	/*
	* Commons Functions
	*/
	function doProxy(req, res) {
		var target = utils.URL(req).getTarget;
		proxy.web(req, res, target);
	}
}());
