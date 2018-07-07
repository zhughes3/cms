'use strict';


let blurbController = require('./BlurbController');

const routes = [
    {
        method: 'GET',
        path: '/blurbs',
        handler: (request, h) => {
            return blurbController.readAll()
                .then(data => {
                    return data;
                }).catch(err => {
                    return err;
                });
        }
    },
    {
        method: 'POST',
        path: '/blurbs',
        handler: (request, h) => {
            return blurbController.create(request.payload)
                .then(data => {
                    return "Blurb created successfully."
                }).catch(err => {
                    return err;
                });
        }
    }
];

module.exports = routes;