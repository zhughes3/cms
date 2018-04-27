'use strict';

const routes = [{
	method: 'GET',
	path: '/ping',
	handler: (request, h) => {
		return 'pong';
	}
}];

module.exports = routes;