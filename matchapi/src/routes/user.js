const express = require('express');

module.exports = () => {
    const router = new express.Router();

    router.get('/remove', (req, res) => {
        res.status(500)
        .send('KO');
    });

    // Select users
    router.get('/getusers', (req, res) => {
        // let sql = 'SELECT * FROM users';

        // req.db.query(sql);

        // let query = req.db.query(sql, (err, results) => {
        //     if(err) {
        //         return res.status(500).send("LOLNDR")
        //     }
        // });

        let sql = 'SELECT * FROM users';
        let query = req.db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.send(results);
        });
    });

    return router;
}