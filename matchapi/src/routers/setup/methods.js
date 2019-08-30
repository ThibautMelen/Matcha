const util = require('util');/* promisify (transformer function callback en promesse) */
var faker = require('faker')

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
                    "`lat` DECIMAL(65, 30)," +
                    "`lng` DECIMAL(65, 30)," +
                    "`interests` varchar(255) NOT NULL," +
                    "`profile_pics` varchar(255) NOT NULL," +
                    "`sexual_orientations` varchar(255) NOT NULL," +
                    "`confirm` int(11) NOT NULL," +
                    "`online` int(11) NOT NULL," +
                    "`likes` varchar(255)," +
                    "`sid` varchar(255)," +
                    "`fame` int(11)," +
                    "`last_co` varchar(255) NOT NULL" +
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
    },

    table_lost_pass: (req, res) => {
        let sql =   "CREATE TABLE `lost_pass` ( " +
                    "`id` int PRIMARY KEY NOT NULL AUTO_INCREMENT," +
                    "`code` varchar(255) NOT NULL," +
                    "`user_id` int(11) NOT NULL," +
                    "`done` int(11) NOT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8";

        req.db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.send('Lost_pass table created...');
        });
    },

    create_users: (req, res) => {
        let inserts = Array(50).fill().map(() => {
            let type = ['male','woman','alien','cyborg','giant','minks','elve','troll'][Math.ceil(Math.random() * 7)]
            return ({
                username: faker.internet.userName(),
                pass: '$2b$10$L7nZN9UZAQoocczoR/g1kOju1VnRQzEzzI..cRh8dZTFMl4172wbG',
                email: faker.internet.email(),
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                bio: faker.lorem.sentence(),
                age: Math.floor(Math.random() * 980) + 17,
                type,
                mail_key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                profile_pics: [`public/fake/${type}/${('000' + (Math.floor(Math.random() * 30) + 1)).slice(-4)}.jpg`].join(','),
                lat: Math.random() + 48,
                lng: Math.random() + 2,
                interests: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()].join(','),
                sexual_orientations: ['male','woman','alien','cyborg','giant','minks','elve','troll'].splice(0, Math.ceil(Math.random() * 7) + 1).join(','),
                confirm: 1,
                online: faker.random.boolean() ? 1 : 0,
                last_co: new Date().toLocaleDateString("en-GB"),
                fame: Math.ceil(Math.random() * 1000) + 10
            })
        })


        
        inserts.forEach(v => util.promisify(req.db.query).bind(req.db)('INSERT INTO users SET ?', v));

        res.send('OK')
    }
}