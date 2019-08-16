const express = require('express');
const methods = require('./methods')

module.exports = () => {
    const router = new express.Router();

    //DB
    // Create DB
    router.get('/createdb', methods.createdb);

    //TABLE
    // Create table : users
    router.get('/table_users', methods.table_users);

    return router;
}