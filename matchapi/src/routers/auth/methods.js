const bcrypt = require('bcrypt');
const util = require('util');/* promisify (transformer function callback en promesse) */
const fs = require('fs')

const utils = require('../../utils');

const saltRounds = 10;

module.exports = {
    verify: async (req, res) => {
        if (req.cookies.user_token) {
            try {
                const decodedToken = await utils.verifyJWTToken(req.cookies.user_token)

                const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', decodedToken.data.id)

                if (data[0]) {
                    let userInfos =  {
                        id: data[0].id,
                        username: data[0].username,
                        first_name: data[0].first_name,
                        last_name: data[0].last_name,
                        email: data[0].email,
                        bio: data[0].bio,
                        type: data[0].type,
                        age: data[0].age,
                        last_co: `15/08/2019`,
                        sexual_orientations: data[0].sexual_orientations.split(','),
                        interests: data[0].interests.split(',').map(v => ({text: v})), 
                        profile_pics: data[0].profile_pics.split(','),
                        liked: true
                    }

                    res.status(200).json({success: true, userInfos})
                }
                else {
                    res.status(200).json({success: false})
                }
            } catch(ex) {
                res.status(200).json({success: false})
            }
        }
        else {
            res.status(200).json({success: false})
        }
    },

    login: async (req, res) => {

        console.log(req.body)

        let body;
        try {
            body = {
                username: await utils.validator(req.body.username, {rules: ['string'], formats: ['trim', 'lowercase']}),
                password: await utils.validator(req.body.password, {rules: ['string'], formats: ['trim']})
            }
        } catch (err) {
            return res.status(400).json({error: 'invalid_data', message: err});
        }

        // INSERT
        try {
            req.db.query("SELECT * FROM users WHERE username = ?", body.username, async (err, data) => {
                
                if (err) return res.status(500).json({ error: 'SQL ERROR' });
                if(!data[0])
                    return res.status(203).json({error: 'user_no', message: `The user « ${body.username} » dont't exist !`});

                if (data[0].confirm !== 1) {
                    return res.status(203).json({error: 'email_no', message: `Please check your mailbox to valid you mail`});
                }

                const res_pass = await bcrypt.compare(req.body.password, data[0].pass);
                if (!res_pass) {
                    console.log(`This pass don't work`)
                    return res.status(203).json({error: 'pass_no', message: `This pass don't work`});
                }

                const data_token = {
                    id: data[0].id
                }

                const token = await utils.createJWTToken({sessionData: data_token, maxAge: '14d'})

                let userInfos =  {
                    id: data[0].id,
                    username: data[0].username,
                    first_name: data[0].first_name,
                    last_name: data[0].last_name,
                    email: data[0].email,
                    bio: data[0].bio,
                    type: data[0].type,
                    age: data[0].age,
                    last_co: `15/08/2019`,
                    sexual_orientations: data[0].sexual_orientations.split(','),
                    interests: data[0].interests.split(',').map(v => ({text: v})), 
                    profile_pics: data[0].profile_pics.split(','),
                    liked: true
                }

                res.status(200).json({ success: 'OK', token, userInfos });
            });
        } catch(ex) {
            return res.status(520).json({ error: 'Unknown error 0000' });
        }
    },

    register: async (req, res) => {

        console.log(req.body)

        let body;
        try {
            body = {
                username: await utils.validator(req.body.username, {rules: ['string', 'alphanumeric'], formats: ['trim', 'lowercase'], min: 4, max: 15}),
                password: await utils.validator(req.body.password, {rules: ['string'], regex: /^[a-zA-Z0-9]{8,}$/, formats: ['trim'], max: 255}),
                email: await utils.validator(req.body.email, {rules: ['string'], regex: /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/, formats: ['trim'], max: 255}),
                first_name: await utils.validator(req.body.first_name, {rules: ['string'], formats: ['trim'], min: 2, max: 25}),
                last_name: await utils.validator(req.body.last_name, {rules: ['string'], formats: ['trim'], min: 2, max: 25}),
                bio: await utils.validator(req.body.bio, {rules: ['string'], formats: ['trim'], min: 10, max: 100}),
                age: await utils.validator(req.body.age, {rules: ['number'], min: 16}),
                type: await utils.validator(req.body.type, {rules: ['string'], formats: ['trim', 'lowercase'], enum: ['male','woman','alien','cyborg','giant','minks','elve','troll']}),
                profile_pics: await utils.validator(req.body.profile_pics, {rules: ['array'], min: 1, max: 5}),
                lat: await utils.validator(req.body.lat, {rules: ['number']}),
                lng: await utils.validator(req.body.lng, {rules: ['number']}),
                interests: await utils.validator(req.body.interests, {rules: ['array'], min: 0, max: 255}),
                sexual_orientations: await utils.validator(req.body.sexual_orientations, {rules: ['array'], min: 1, max: 255}),
            }
        } catch (err) {
            return res.status(203).json({error: 'validation_error', message: err});
        }

        console.log(body.profile_pics)

        let pathImages = []

        try {
            for (let profile_pic of body.profile_pics) {
                let image = fs.readFileSync(profile_pic)
                let path = `public/${profile_pic.split('/')[profile_pic.split('/').length - 1]}.jpg`;
                fs.writeFileSync(path, image)
                pathImages.push(path)
            }
        } catch (err) {
            console.error(err)
            return res.status(203).json({error: 'image_error', message: 'Unknown Error 0010'});
        }

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

        const mail_key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        // INSERT
        try {

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
                profile_pics: pathImages.join(','),
                lat: body.lat,
                lng: body.lng,
                interests: body.interests.map(v => v.text).join(','),
                sexual_orientations: body.sexual_orientations.join(','),
                confirm: 0
            };
            await util.promisify(req.db.query).bind(req.db)('INSERT INTO users SET ?', inserts);
            res.status(200).json({ success: 'OK' });
        } catch(err) {
            console.error(err)
            return res.status(520).json({ error: 'Unknown error 0004' });
        }

        //Send verification emal
        try {
            await utils.transporter.sendMail({
                from: 'Matcha <test.dev.basilic@gmail.com>',
                to: body.email,
                subject: 'Welcome to Matcha',
                text: `
                Validation link : http://localhost:3000/auth/validate/${mail_key}
                `
            })
            console.log(`Mail sent to ${body.email}`)
        }
        catch(err) {
            console.error('Mail error :', err)
        }

        //Add Tag Interest to DB if not exist
        try {
            for (let interest of body.interests) {
                await util.promisify(req.db.query).bind(req.db)('INSERT INTO interests (text) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS ( SELECT text FROM interests WHERE text = ? ) LIMIT 1;', [interest.text, interest.text]);
            }
        } catch(err) {
            console.error(err)
        }
    },

    validate: async (req, res) => {
        if (req.params.key) {
            try {
                const data = await util.promisify(req.db.query).bind(req.db)('UPDATE users SET confirm = 1 WHERE mail_key = ?', [req.params.key])
                res.redirect('http://localhost:8080/login')
                console.log('New account')
            } catch(err) {
                console.error(err)
                return res.status(520).json({ error: 'Unknown error 0005' });
            }
        }
        else {
            res.redirect('http://localhost:8080')
        }
    }
}