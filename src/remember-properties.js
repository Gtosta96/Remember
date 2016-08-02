(function() {
	'use strict';

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

	module.exports = PROPERTIES;
}());
