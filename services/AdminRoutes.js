'use strict';

const routes = [
{   method: 'GET',
    path: '/admin',
    handler: (request, h) => {
        return h.view('admin', {});
    }
}
];

module.exports = routes;