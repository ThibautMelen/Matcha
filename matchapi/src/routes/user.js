const express = require('express');

module.exports = () => {
    const router = new express.Router();

    router.get('/remove', (req, res) => {
        res.status(500)
        .send('KO');
    });

    return router;
}