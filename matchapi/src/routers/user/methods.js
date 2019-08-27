const util = require('util');/* promisify (transformer function callback en promesse) */

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
            if(err || !results[0]) return res.status(500).json({success: false, error : "Fail Error"})
            results[0].profile_pics = results[0].profile_pics.split(',')
            results[0].interests = results[0].interests.split(',')
            results[0].sexual_orientations = results[0].sexual_orientations.split(',')
            if (results[0].likes) {
                results[0].likes = results[0].likes.split(',')
            }
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
    },

    like: async (req, res) => {
        if (!req.user) {
            return res.status(400).json({success: false})
        }

        try {
            const user = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', req.user.id)
            
            let likes = []

            if (user[0].likes) {
                likes = user[0].likes.split(',')
            }

            if (likes.indexOf(req.params.id) < 0) {
                likes.push(req.params.id)
            }

            likes = likes.join(',')

            await util.promisify(req.db.query).bind(req.db)('UPDATE users SET likes = ? WHERE id = ?', [likes, req.user.id]);

            console.log(likes)
            res.status(200).json({success: true, likes: likes.split(',')})

            let likedUser = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', [req.params.id]);

            if (likedUser[0] && likedUser[0].sid) {
                let likedUserSocket = req.io.sockets.connected[likedUser[0].sid]

                if (likedUserSocket) {
                    let notifText = `${user[0].username} liked you !`
                    if (likedUser[0].likes && likedUser[0].likes.split(',').includes(user[0].id.toString())) {
                        notifText = `It's Match ! ${user[0].username} liked you back !`

                        let currentUserSocket = req.io.sockets.connected[user[0].sid]
                        if (currentUserSocket) {
                            currentUserSocket.emit('notification', notifText)
                        }
                    }
                    likedUserSocket.emit('notification', notifText)
                }
            }
        } catch (err) {
            console.error(err)
            return res.status(203).json({success: false})
        }
    },

    unlike: async (req, res) => {
        if (!req.user) {
            return res.status(400).json({success: false})
        }

        try {
            const user = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', req.user.id)
            
            let likes = []

            if (user[0].likes) {
                likes = user[0].likes.split(',')
            }

            const userIndex = likes.indexOf(req.params.id)

            if (userIndex >= 0) {
                likes.splice(userIndex, 1)
            }

            likes = likes.join(',')

            await util.promisify(req.db.query).bind(req.db)('UPDATE users SET likes = ? WHERE id = ?', [likes, req.user.id]);

            res.status(200).json({success: true, likes: likes.split(',')})

            let likedUser = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', [req.params.id]);

            if (likedUser[0] && likedUser[0].sid && likedUser[0].likes && likedUser[0].likes.split(',').includes(user[0].id.toString())) {
                let likedUserSocket = req.io.sockets.connected[likedUser[0].sid]

                if (likedUserSocket) {
                    let notifText = `${user[0].username} doesn't like you anymore :( !`

                    likedUserSocket.emit('notification', notifText)
                }
            }
        } catch (err) {
            console.error(err)
            return res.status(203).json({success: false})
        }
    },

    visit: async (req, res) => {
        if (!req.user) {
            return res.status(400).json({success: false})
        }

        if (parseInt(req.params.id) === parseInt(req.user.id)) {
            return res.status(200).json({success: true})
        }

        try {
            const user = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', req.user.id)

            let visitedUser = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', [req.params.id]);

            if (visitedUser[0] && visitedUser[0].sid) {
                let visitedUserSocket = req.io.sockets.connected[visitedUser[0].sid]

                if (visitedUserSocket) {
                    let notifText = `${user[0].username} visited your profile !`

                    visitedUserSocket.emit('notification', notifText)
                }
            }

            res.status(200).json({success: true})
        } catch (err) {
            console.error(err)
            return res.status(203).json({success: false})
        }
    },

    

    search: async (req, res) => {
        if (!req.user || !req.body) {
            return res.status(400).json({success: false})
        }

        try {
            const deg2rad = (deg) => {
                return deg * (Math.PI/180)
            }

            const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
                var R = 6371;
                var dLat = deg2rad(lat2-lat1);
                var dLon = deg2rad(lon2-lon1);
                var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2)
                ; 
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                var d = R * c;
                return d;
            }

            let current_user = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', req.user.id)

            let users = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users');

            let filteredUsers = users.filter((v) => {
                if (req.body.search) {
                    if (!(v.username && v.username.match(new RegExp(req.body.search, 'i'))) && !(v.bio && v.bio.match(new RegExp(req.body.search, 'i')))) {
                        console.log('ya')
                        return false
                    }
                }
                if (req.body.ageRange1 !== undefined && req.body.ageRange2 !== undefined) {
                    if (v.age < parseInt(req.body.ageRange1) || v.age > parseInt(req.body.ageRange2)) {
                        console.log('ytqa')
                        return false
                    }
                }
                if (req.body.popRange1 !== undefined && req.body.popRange2 !== undefined) {
                    if (v.fame < parseInt(req.body.popRange1) || (parseInt(req.body.popRange2) < 1000 && v.fame > parseInt(req.body.popRange2))) {
                        console.log(v.fame > parseInt(req.body.popRange2))
                        return false
                    }
                }
                if (req.body.kmRange) {
                    let dist = getDistanceFromLatLonInKm(current_user.lat, current_user.lng, v.lat, v.lng)

                    if (dist > parseInt(req.body.kmRange)) {
                        console.log('yta')
                        return false
                    }
                }
                if (req.body.interests && req.body.interests.length > 0) {
                    let userInterests = v.interests.split(',')
                    let filteredInterests = req.body.interests.filter(interest => userInterests.includes(interest))

                    if (!filteredInterests || filteredInterests.length < 1) {
                        return false
                    }
                }
                return true
            })

            return res.status(200).json({success: true, users: filteredUsers})
        } catch (err) {
            console.error(err)
            return res.status(203).json({success: false})
        }
    }
}