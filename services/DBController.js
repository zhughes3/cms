'use strict';


let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'captech'});

let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
let docClient = new AWS.DynamoDB.DocumentClient();

let showdown  = require('showdown');
let converter = new showdown.Converter();
const uuidv4 = require('uuid/v4');


const TABLE_NAME = 'articles';

module.exports = {
	listTables: () => {
		return new Promise((resolve, reject) => {
			ddb.listTables({Limit: 10}, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},
	readAll: () => {
		let params = {
			TableName: TABLE_NAME
		};
		return new Promise((resolve, reject) => {
			docClient.scan(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data.Items);
				}
			});
		});
	},
	read: (id) => {
		let params = {
			TableName: TABLE_NAME,
			Key: {
				"_id": id
			}
		};
		return new Promise((resolve, reject) => {
			docClient.get(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data.Item);
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
		_id: id
	};
}