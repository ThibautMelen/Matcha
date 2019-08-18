module.exports = {
    createdb: (req, res) => {
        let sql = 'CREATE DATABASE matchadb';
        req.db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.json('Database created...');
        });
    },

    table_users: (req, res) => {
        
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
                    "`lat` int(11)," +
                    "`lng` int(11)," +
                    "`interests` varchar(255) NOT NULL," +
                    "`profile_pics` varchar(255) NOT NULL," +
                    "`sexual_orientations` varchar(255) NOT NULL," +
                    "`confirm` int(11) NOT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8";

        req.db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.send('User table created...');
        });
    },

    table_interests: (req, res) => {
        
        let sql =   "CREATE TABLE `interests` ( " +
                    "`id` int PRIMARY KEY NOT NULL AUTO_INCREMENT," +
                    "`text` varchar(255) NOT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8";

        req.db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.send('Interests table created...');
        });
    }
}