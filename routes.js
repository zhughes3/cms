'use strict';

let dbController = require('./controllers/DBController');

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
	path: '/blog',
	handler: (request, h) => {
		return dbController.readAll()
			.then(data => {
				return data;
			}).catch(err => {
				return err;
			});
	}
},
{
	method: 'GET',
	path: '/blog/{id}',
	handler: (request, h) => {
		let id = encodeURIComponent(request.params.id);
		return dbController.read(id)
			.then(data => {
				return data;
			}).catch(err => {
				return err;
			});
	}
}];

module.exports = routes;