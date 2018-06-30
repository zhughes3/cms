'use strict';

let dbController = require('./DBController');

const routes = [
{
	method: 'GET',
	path: '/blog',
	handler: (request, h) => {
		return dbController.readAll()
			.then(data => {
				return h.view('blog', {
					data: data,
					title: "/dev/zhughes"
				});
				//return data;
			}).catch(err => {
				return err;
			});
	}
},
{
	method: 'POST',
	path: '/blog',
	handler: (request, h) => {
		return dbController.create(request.payload)
			.then(data => {
				return h.view('blog-post', {
					data: data,
					title: data.title
				});
				//return data;
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
				console.log(data);
				return h.view('blog-post', {data: data, title: data.title});
				//return data;
			}).catch(err => {
				return err;
			});
	}
}
]

module.exports = routes;

