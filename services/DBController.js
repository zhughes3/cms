'use strict';

let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'captech'});
let docClient = new AWS.DynamoDB.DocumentClient();
let showdown  = require('showdown');
let converter = new showdown.Converter();
const uuidv4 = require('uuid/v4');
let urlSlug = require('url-slug');

const TABLE_NAME = 'zhughes-articles';

module.exports = {
	readAll: () => {
		let params = {
			TableName: TABLE_NAME
		};
		return new Promise((resolve, reject) => {
			docClient.scan(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					let items = [];
					data.Items.forEach(item => {
						items.push(Object.assign({slug: urlSlug(item.title)}, item));
					});
					resolve(items);
				}
			});
		});
	},
	read: (title) => {
		let params = {
		    TableName: TABLE_NAME,
		    KeyConditionExpression: "#slug = :slug",
		    ExpressionAttributeNames:{
		        "#slug": "slug"
		    },
		    ExpressionAttributeValues: {
		        ":slug": title
		    }
		};
		return new Promise((resolve, reject) => {
			docClient.query(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					if (data.Items.length > 1) {
						console.log("Query to get a single blog post returned more than 1 item.");
					}
					resolve(data.Items[0]);
				}
			});
		});
	},
	create: (payload) => {
		let item = _formatOnCreateItem(payload);
		let params = {
			TableName: TABLE_NAME,
			Item: item
		};

		return new Promise((resolve, reject) => {
			docClient.put(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(item);
				}
			});
		});
	}

};



function _formatOnCreateItem(payload) {
	const title = payload.title.trim();
	const slug = urlSlug(title);
	const desc = payload.desc.trim();
	let tags = [];
	payload.tags.split(',').forEach(tag => {
		tags.push(tag.trim());
	});
	const body = converter.makeHtml(payload.body);
	const date = new Date().toISOString();
	const id = uuidv4();
	return {
		title: title,
		desc: desc, 
		tags: tags,
		body: body,
		date: date,
		_id: id,
		slug: slug
	};
}