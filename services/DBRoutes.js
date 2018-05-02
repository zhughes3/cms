'use strict';

let dbController = require('./DBController');

const routes = [
{
	method: 'GET',
	path: '/blog',
	handler: (request, h) => {
		return dbController.readAll()
			.then(data => {
				return h.view('blog', {data: normalizeBlogPosts(data)});
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
				return data;
			}).catch(err => {
				return err;
			});
	}
}
]

const normalizeBlogPosts = data => {
	let posts = [];

	data.forEach(datapoint => {
		let tags = [];
		datapoint.tags.L.forEach(tag => {
			tags.push(tag.S);
		});

		posts.push({
			id: datapoint._id.S,
			date: datapoint.date.S,
			description: datapoint.description.S,
			tags: tags,
			title: datapoint.title.S
		});
	});

	return posts;
};

module.exports = routes;

