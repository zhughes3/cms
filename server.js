'use strict';

const Hapi = require('hapi');
const Config = require('config');
const Pug = require('pug');

const plugins = require('./plugins');
const routes = require('./routes');

exports.deployment = async () => {
	const server = Hapi.server({
		host: Config.get('app.host'),
		port: Config.get('app.port')
	});

	await server.register(plugins);

	server.route(routes);

	// set view templates
	server.views({
        engines: { pug: Pug },
        relativeTo: __dirname,
        path: './templates/'
    });

	return server;

};

