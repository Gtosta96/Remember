(function() {
	'use strict';

	/*
	* bReq: browser request
	* bRes: browser response
	* pReq: proxy response
	* pRes: proxy response
	*/

	//core imports
	var http = require('http');
	var httpProxy = require('http-proxy');

	//custom imports
	var utils = require('./remember-utils');

	const PROPERTIES = {
		target: 'localhost',
		serverPort: 9000,
		proxyPort: 8000,
		get serverUrl() {
			return {
				target: 'http://' + this.target + ':' + this.serverPort
			}
		}
	}
	//var proxy = httpProxy.createProxyServer(PROPERTIES.serverUrl).listen(PROPERTIES.proxyPort);

	http.createServer(function httpCreateServerCallback(bReq, bRes) {
		var utilsUrl = utils.URL(bReq, bRes);

		var bUrl = utilsUrl.getUrlDetails(null, true);
		if(!bUrl.query || !bUrl.query.url) return utilsUrl.notFound();

		var pUrl = utilsUrl.getUrlDetails(bUrl.query.url);
		pUrl.port = pUrl.port || 80;
		var pClient = http.createClient(pUrl.port, pUrl.hostname);

		pUrl.pathname = pUrl.pathname || '/';
		var pReq = pClient.request('GET', pUrl.pathname, {host: pUrl.hostname});

		pReq.addListener('response', function(pRes) {
			bRes.writeHead(pRes.statusCode, pRes.headers);

			pRes.addListener('data', function(chunk) {
				bRes.write(chunk);
			});

			pRes.addListener('end', function() {
				bRes.end();
			});
		}).end();
	}).listen(PROPERTIES.serverTarget, PROPERTIES.target);

	console.log('Server is Running on [%s]', PROPERTIES.serverUrl.target);
	console.log('Proxy is Running on port:[%s]', PROPERTIES.proxyPort);
}());
