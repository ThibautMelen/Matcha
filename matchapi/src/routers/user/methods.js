module.exports = {
    add: (req, res) => {
        let sql = "INSERT INTO users SET ?";
        let inserts = {
            username:'Jean',
            pass:'fdververver',
            email:'frefreev@matcha.com',
            first_name:'Jean',
            last_name:'Reno',
            mail_key:'343r4',
            confirm: 1
        };

        req.db.query(sql, inserts, (err, results) => {
            if(err) return res.status(500).send("FAIL : Add user");
            res.json(`${inserts.username} is added`);
        });
    },

    up: (req, res) => {
        let sql = "UPDATE users SET username = ? WHERE id = ?";
        let inserts = [req.params.new, req.params.id];

        req.db.query(sql, inserts, (err, results) => {
            if(err) return res.status(500).send("FAIL : UP user");
            console.log(results);
            res.json(results);
        });

    },

    del: (req, res) => {
        let sql = `DELETE FROM users WHERE id = ?`;
        let inserts = req.params.id;

        req.db.query(sql, inserts, (err, results) => {
            if(err) return res.status(500).send("FAIL : UP user");
            console.log(results);
            res.json(results);
        });

    },

    all: (req, res) => {
        let sql = 'SELECT * FROM users';
        req.db.query(sql, (err, results) => {
            if(err) return res.status(500).send("FAIL : select all users");
            res.json(results);
        });
    },

    getOne: (req, res) => {
        let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
        req.db.query(sql, (err, results) => {
            if(err) return res.status(500).send("tamere")
            res.json(results[0]);
        });
    }
}