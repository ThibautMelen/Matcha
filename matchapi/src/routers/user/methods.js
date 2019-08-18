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
            results = results.map(v => {
                v.profile_pics = v.profile_pics.split(',')
                v.interests = v.interests.split(',')
                v.sexual_orientations = v.sexual_orientations.split(',')

                return v
            })
            res.json(results);
        });
    },

    getOne: (req, res) => {
        let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
        req.db.query(sql, (err, results) => {
            if(err) return res.status(500).json({success: false, error : "Fail Error"})
            results[0].profile_pics = results[0].profile_pics.split(',')
            results[0].interests = results[0].interests.split(',')
            results[0].sexual_orientations = results[0].sexual_orientations.split(',')
            res.json(results[0]);
        });
    },

    interests: (req, res) => {
        let sql = `SELECT * FROM interests`;
        req.db.query(sql, (err, resp) => {
            if(err) return res.status(500).json({success: false, error : "Fail Error"})
            const interests = resp.map(v => ({text: v.text}))
            res.json({success: 'OK', interests});
        });
    },

    image: (req, res) => {
        if (req.file) {
            res.status(200).json({success: true, file: req.file})
        }
        else {
            res.status(203).json({success: false})
        }
    }
}