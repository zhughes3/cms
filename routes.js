'use strict';

let dbController = require('./services/DBController');
let dbRoutes = require('./services/DBRoutes');

//add route for health check and static file serving in public folder
const routes = [
{
	method: 'GET',
	path: '/ping',
	handler: (request, h) => {
		return 'pong';
	}
},
{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.'
        }
    }
}];

dbRoutes.forEach(route => {
	routes.push(route);
})



module.exports = routes;