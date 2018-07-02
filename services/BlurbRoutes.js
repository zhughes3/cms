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
    }
];