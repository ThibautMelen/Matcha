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

    //TABLE
    // Create table : interests
    router.get('/table_interests', methods.table_interests);
    
    //TABLE
    // Create table : lost_pass
    router.get('/table_lost_pass', methods.table_lost_pass);

    router.get('/create_users', methods.create_users)

    return router;
}