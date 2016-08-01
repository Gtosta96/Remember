(function() {
	'use strict';

	//core imports
	var http = require('http');
	var httpProxy = require('http-proxy');

	const PROPERTIES = {
		listenPort: 8000,
		target: 'localhost',
		appPort: 9000,
		get targetUrl() {
			return {
				target: 'http://' + this.target + ':' + this.appPort
			}
		}
	}
	var proxy = httpProxy.createProxyServer(PROPERTIES.targetUrl).listen(PROPERTIES.listenPort);

	proxy.on('proxyReq', function(proxyReq, a, b, c) {
  		console.log('Sending to target: ' + JSON.stringify(proxyReq, true, 4));
	});

	http.createServer(function (req, res) {
		console.log('running');
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
		res.end();
	}).listen(PROPERTIES.appPort);
}());
