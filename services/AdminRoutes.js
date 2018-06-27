'use strict';

let adminController = require('./AdminController');

const routes = [
{   method: 'GET',
    path: '/admin',
    handler: (request, h) => {
        return adminController.dashboard()
            .then(data => {

            }).catch(err => {

            });
    }
}
];

module.exports = routes;