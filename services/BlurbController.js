'use strict';

let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'captech'});
let docClient = new AWS.DynamoDB.DocumentClient();

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
    }

};