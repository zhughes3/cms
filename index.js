'use strict';

const Config = require('config');

const Server = require('./server');

let servers = [];


async function start() {

    try {
    	const server = await Server.deployment(Config.get('app.host'), Config.get('app.port'));
        await server.start();
        servers.push(server);

        const server2 = await Server.deployment(Config.get('app.host'), 3031);
        await server2.start();
        servers.push(server2);
    }
    catch (err) {
    	console.log('an error has been caught');
        console.log(err);
        process.exit(1);
    }

    servers.forEach(server => {
    	console.log(`Server running at ${server.info.uri}`);
    });
};

const gracefullyStopServers = () => {
	servers.forEach(server => {
		server.stop({timeout: 10 * 1000}, () => {
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

start();