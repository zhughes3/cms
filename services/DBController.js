'use strict';

let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
//AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'default'});

let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
let docClient = new AWS.DynamoDB.DocumentClient();

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
			ddb.scan(params, (err, data) => {
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
	}

};