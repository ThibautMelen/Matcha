const express = require('express');
const methods = require('./methods')
const auth = require('../../middlewares/auth')

module.exports = () => {
    const router = new express.Router();
    
    router.get('/verify', methods.verify);
    
    router.post('/login', methods.login);
    
    router.post('/register', methods.register);

    router.get('/validate/:key', methods.validate);


    return router;
};