'use strict';

let adminController = require('./AdminController');

const routes = [
{   method: 'GET',
    path: '/admin',
    handler: (request, h) => {
        return h.view('admin', {});
        // return adminController.dashboard()
        //     .then(data => {
        //         return data;
        //     }).catch(err => {
        //         console.log(err);
        //     });
    }
}
];

module.exports = routes;