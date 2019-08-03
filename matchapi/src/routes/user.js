const express = require('express');

module.exports = () => {
    const router = new express.Router();

    router.get('/remove', (req, res) => {
        res.status(500)
        .send('KO');
    });

    // Select users
    router.get('/all', (req, res) => {
        let sql = 'SELECT * FROM users';
        req.db.query(sql, (err, results) => {
            if(err) return res.status(500).send("LOLNDR")
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
        req.db.query(sql, (err, results) => {
            if(err) return res.status(500).send("LOLNDR")
            res.json(results[0]);
        });
    })

    return router;
}