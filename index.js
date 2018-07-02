'use strict';

const Config = require('config');

const Server = require('./server');

async function start() {
	const services = Config.get('app.services');
  	try {
		const serverPromises = services.map(async (service) => {
			const server = await Server.deployment(service.host, service.port);
			await server.start();
			return server;
	  
    	});
		const servers = await Promise.all(serverPromises);
		servers.forEach(server => {
		console.log(`Server running at ${server.info.uri}`);
		});
    } catch (err) {
    	console.log('an error has been caught');
        console.log(err);
        process.exit(1);
    }
};

const gracefullyStopServers = () => {
	servers.forEach(server => {
		server.stop({timeout: 1 * 1000}, () => {
			console.log(`Shutting down server ${server.info.uri}`);
			process.exit(0);
		});
	});
};

process.on('uncaughtException', err => {
	console.error(err, 'Uncaught Exception');
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	 console.error({
	 	promise: promise,
	 	reason: reason
	 }, 'Unhandled Rejection');
	 process.exit(1);
});

process.on('SIGINT', gracefullyStopServers)
process.on('SIGTERM', gracefullyStopServers)
process.on('SIGUSR2', () => { process.exit(0); });

start();