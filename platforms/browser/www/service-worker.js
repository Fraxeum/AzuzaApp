'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
	name: 'azuza-cache'
};

// pre-cache our key assets
self.toolbox.precache(
	[
		'./assets/img/logo.png',
		'./assets/icon/favicon.ico',
		'./assets/fonts/ionicons.woff?v=3.0.0-alpha.3',
		'./assets/fonts/ionicons.woff2?v=3.0.0-alpha.3',
		'./assets/fonts/Exo-2-Bold.woff',
		'./assets/fonts/Exo-2-Bold.woff2',
		'./assets/fonts/Exo-2-Bold-Italic.woff',
		'./assets/fonts/Exo-2-Bold-Italic.woff2',
		'./assets/fonts/Exo-2-Regular.woff',
		'./assets/fonts/Exo-2-Regular.woff2',
		'./build/main.css',
		'./build/polyfills.js',
		'./build/vendor.js',
		'./build/main.js',
		'index.html',
		'manifest.json'
	]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
