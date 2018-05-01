'use strict';

const Hapi = require('hapi');
const Pug = require('pug');

const plugins = require('./plugins');
const routes = require('./routes');

exports.deployment = async (host, port) => {
	const server = Hapi.server({
		host: host,
		port: port
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

