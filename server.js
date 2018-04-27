'use strict';

const Hapi = require('hapi');
const Config = require('config');

const routes = require('./routes');

//create server
const server = Hapi.server({
	host: Config.get('app.host'),
	port: Config.get('app.port')
});

//add routes
server.route(routes);

module.exports = server;

