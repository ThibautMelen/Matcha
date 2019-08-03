const express = require('express');

module.exports = () => {
    const router = new express.Router();

    router.get('/login', (req, res) => {
        res.send('login');
    });

    router.get('/register', (req, res) => {
        res.send('bonjour');
    });

    return router;
}