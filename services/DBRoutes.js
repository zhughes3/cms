'use strict';

let dbController = require('./DBController');

const routes = [
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
}
]

module.exports = routes;

