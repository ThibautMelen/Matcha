const bcrypt = require('bcrypt');
const util = require('util');/* promisify (transformer function callback en promesse) */

const utils = require('../../utils');

const saltRounds = 10;

module.exports = {
    login: async (req, res) => {

        let body;
        try {
            body = {
                username: await utils.validator(req.body.username, {rules: ['string'], format: ['trim', 'lowercase']}),
                password: await utils.validator(req.body.password, {rules: ['string'], format: ['trim']})
            }
        } catch (err) {
            return res.status(400).json({error: 'invalid_data', message: err});
        }

        // INSERT
        try {
            req.db.query("SELECT pass FROM users WHERE username = ?", body.username, async (err, data) => {
                
                if (err) return res.status(500).json({ error: 'SQL ERROR' });
                if(!data[0])
                    return res.status(203).json({error: 'user_no', message: `The user « ${body.username} » dont't exist !`});

                const res_pass = await bcrypt.compare(req.body.password, data[0].pass);
                if (!res_pass)
                    return res.status(203).json({error: 'pass_no', message: `This pass don't work`});

                res.status(200).json({ success: 'OK' });
            });
        } catch(ex) {
            return res.status(520).json({ error: 'Unknown error 0000' });
        }
    },

    register: async (req, res) => {

        let body;
        try {
            body = {
                username: await utils.validator(req.body.username, {rules: ['string'], format: ['trim', 'lowercase']}),
                password: await utils.validator(req.body.username, {rules: ['string'], format: ['trim']}),

                username: await utils.validator(req.body.username, {rules: ['string', 'alphanumeric'], format: ['trim', 'lowercase'], min: 4, max: 15}),
                password: await utils.validator(req.body.password, {rules: ['string'], regex: /^[a-zA-Z0-9]{8,}$/, format: ['trim'], max: 255}),
                email: await utils.validator(req.body.email, {rules: ['string'], regex: /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/, format: ['trim'], max: 255}),
                first_name: await utils.validator(req.body.first_name, {rules: ['string'], format: ['trim'], min: 2, max: 25}),
                last_name: await utils.validator(req.body.last_name, {rules: ['string'], format: ['trim'], min: 2, max: 25}),
                bio: await utils.validator(req.body.last_name, {rules: ['string'], format: ['trim'], min: 10, max: 100}),
                age: await utils.validator(req.body.last_name, {rules: ['number'], min: 16}),
                type: await utils.validator(req.body.last_name, {rules: ['string'], format: ['trim', 'lowercase'], enum: ['male','woman','alien','cyborg','giant','minks','elve','troll']}),
                // profile_pics: await utils.validator(req.body.profile_pics, {rules: ['array'], min: 1, max: 5}),
                lat: utils.validator(req.body.lat, {rules: ['number']}),
                lng: utils.validator(req.body.lng, {rules: ['number']}),
                interests: await utils.validator(req.body.interests, {rules: ['array'], min: 0, max: 255}),
                sexual_orientations: await utils.validator(req.body.interests, {rules: ['array'], min: 1, max: 255}),
            }
        } catch (err) {
            return res.status(203).json({error: 'joi_error', message: err});
        }

        console.log(body);
        //utiliser une function utils
        // utils.oui();

        // Username it's free ?

        try {
            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE username = ?', body.username);
            if(data[0])
                return res.status(203).json({error: 'username_exists', message: `Le nom d'utilisateur « ${data[0].username} » est déjà utilisée !`});
        } catch(ex) {
            return res.status(520).json({ error: 'Unknown error 0001' });
        }

        // Email it's free ?
        try {
            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE email = ?', body.email);
            if(data[0])
                return res.status(203).json({error: 'email_exists', message: `L'email' « ${data[0].email} » est déjà utilisée !`});
        } catch(ex) {
            return res.status(520).json({ error: 'Unknown error 0002' });
        }

        try {
            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE email = ?', body.email);
            if(data[0])
                return res.status(203).json({error: 'email_exists', message: `L'email' « ${data[0].email} » est déjà utilisée !`});
        } catch(ex) {
            return res.status(520).json({ error: 'Unknown error 0003' });
        }

        // INSERT
        try {
            const mail_key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            let inserts = {
                username: body.username,
                pass : await bcrypt.hash(body.password, saltRounds),
                email: body.email,
                first_name: body.first_name,
                last_name: body.last_name,
                bio: body.bio,
                age: body.age,
                type: body.type,
                mail_key,
                // profile_pics: body.profile_pics.join(','), //HANDLE FILE UPLOADING
                lat: body.lat,
                lng: body.lng,
                interests: body.interests.map(v => v.text).join(','),
                sexual_orientations: body.sexual_orientations.join(','),
                confirm: 1
            };
            await util.promisify(req.db.query).bind(req.db)('INSERT INTO users SET ?', inserts);
            res.status(200).json({ success: 'OK' });

            for (let interest of interests) {
                await util.promisify(req.db.query).bind(req.db)('INSERT INTO interests SET ? WHERE NOT EXISTS (SELECT text FROM interests WHERE text = ?);', interest, interest.text);
            }
        } catch(err) {
            console.error(err)
            return res.status(520).json({ error: 'Unknown error 0004' });
        }
    }
}