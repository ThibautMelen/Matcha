const express = require('express');
const methods = require('./methods')

module.exports = () => {
    const router = new express.Router();

    // Add User 1
    router.post('/add', methods.add);

    // Update User
    router.put('/up/:id/:new', methods.up);

    // Delete User
    router.delete('/del/:id/', methods.del);

    // Select ALL users
    router.get('/all', methods.all);

    // Select ONE users
    router.get('/:id', methods.getOne);

    return router;
};