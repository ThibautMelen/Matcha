const express = require('express');

module.exports = () => {
    const router = new express.Router();

    //DB
    // Create DB
    router.get('/createdb', (req, res) => {
        let sql = 'CREATE DATABASE matchadb';
        req.db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.json('Database created...');
        });
    });

    //TABLE
    // Create table : users
    router.get('/table_users', (req, res) => {
        
        let sql =   "CREATE TABLE `users` ( " + 
                    "`id` int PRIMARY KEY NOT NULL AUTO_INCREMENT," +
                    "`username` varchar(255) NOT NULL," + 
                    "`pass` varchar(255) NOT NULL," +
                    "`email` varchar(255) NOT NULL," +
                    "`first_name` varchar(255) NOT NULL," + 
                    "`last_name` varchar(255) NOT NULL," + 
                    "`bio` varchar(255) NOT NULL," + 
                    "`type` varchar(255) NOT NULL," + 
                    "`age` int(11) NOT NULL," +
                    "`mail_key` varchar(32) NOT NULL," + 
                    "`confirm` int(11) NOT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8";

        req.db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.send('User table created...');
        });
    });

    return router;
}