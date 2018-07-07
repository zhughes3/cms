'use strict';

const dbRoutes = require('./services/DBRoutes');
const adminRoutes = require('./services/AdminRoutes');
const blurbRoutes = require('./services/BlurbRoutes');

function addRoutesFromFile(routesArray, routesFile) {
    routesFile.forEach(route => {
        routesArray.push(route);
    });
}

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
},
{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return h.view('home', {});
    }
}];

addRoutesFromFile(routes, dbRoutes);
addRoutesFromFile(routes, adminRoutes);
addRoutesFromFile(routes, blurbRoutes);

module.exports = routes;