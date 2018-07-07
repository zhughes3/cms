'use strict';

let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'captech'});
let docClient = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');

const TABLE_NAME = 'zhughes-blurbs';

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
					resolve(data.Items);
				}
			});
		});
	},
	create: (payload) => {
		let blurb = _formatOnCreateItem(payload);
		let params = {
			TableName: TABLE_NAME,
			Item: blurb
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
	const type = payload.type;
	const date = new Date().toISOString();
	const id = uuidv4();
	const body = payload.body;
	return {
		_id: id,
		date: date,
		type: type,
		body: body

	};
}