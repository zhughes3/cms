'use strict';

let dbController = require('./services/DBController');
let dbRoutes = require('./services/DBRoutes');

const routes = [
{
	method: 'GET',
	path: '/ping',
	handler: (request, h) => {
		return 'pong';
	}
}];

dbRoutes.forEach(route => {
	routes.push(route);
})



module.exports = routes;