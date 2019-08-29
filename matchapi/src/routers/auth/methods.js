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

                var today  = new Date();

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
                        sexual_orientations: data[0].sexual_orientations.split(','),
                        interests: data[0].interests.split(',').map(v => ({text: v})), 
                        profile_pics: data[0].profile_pics.split(','),
                        likes: data[0].likes ? data[0].likes.split(',') : null,
                        online: data[0].online,
                        lat: data[0].lat,
                        lng: data[0].lng,
                        last_co: today.toLocaleDateString("en-GB"),
                        fame: data[0],
                    }

                    res.status(200).json({success: true, userInfos})
                }
                else {
                    res.status(200).json({success: false})
                }
            } catch(ex) {
                console.log(ex)
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
            //Verif Info + Store
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
                var today  = new Date();

                let userInfos =  {
                    id: data[0].id,
                    username: data[0].username,
                    first_name: data[0].first_name,
                    last_name: data[0].last_name,
                    email: data[0].email,
                    bio: data[0].bio,
                    type: data[0].type,
                    age: data[0].age,
                    sexual_orientations: data[0].sexual_orientations.split(','),
                    interests: data[0].interests.split(',').map(v => ({text: v})), 
                    profile_pics: data[0].profile_pics.split(','),
                    likes: data[0].likes ? data[0].likes.split(',') : null,
                    online: data[0].online,
                    lat: data[0].lat,
                    lng: data[0].lng,
                    last_co: today.toLocaleDateString("en-GB"),
                    fame: data[0],
                }

                res.status(200).json({ success: 'OK', token, userInfos });

                //Change To Online 1
                try {
                    let sql = "UPDATE users SET online = ? WHERE id = ?";
                    let inserts = [1, userInfos.id];

                    req.db.query(sql, inserts, (err, results) => {
                        if (err) {
                            console.log(`Failed to set user as connected (id: ${userInfos.id})`)
                        }
                        console.log(`Online id : ${userInfos.id}`)
                    });
                } catch(err){
                    console.log(err)
                }
            });

        } catch(ex) {
            return res.status(520).json({ error: 'Unknown error 0000' });
        }
    },

    disconnect: async (req, res) => {
        if (!req.user) {
            return res.status(203).json({error: 'validation_error', message: err});
        }

        //Change To Offline 0 WITH LOGOUT()
        var today  = new Date();
        try {
            let sql = "UPDATE users SET online = ?, last_co = ? WHERE id = ?";
            let inserts = [0, today.toLocaleDateString("en-GB"), req.user.id];

            req.db.query(sql, inserts, (err, results) => {
                if (err) {
                    console.log(`Failed to set user as disconnected (id: ${req.user.id})`)
                    return res.status(500).json({ success: false });
                }
                console.log(`Disconnected id : ${req.user.id} (with logout())`)
                res.status(200).json({ success: true });
            });
        } catch(err){
            console.log(err)
            return res.status(500).json({ success: false });
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
                lat: await utils.validator(parseFloat(typeof req.body.lat === 'string' ? req.body.lat.replace(',', '.') : req.body.lat), {rules: ['number']}),
                lng: await utils.validator(parseFloat(typeof req.body.lng === 'string' ? req.body.lng.replace(',', '.') : req.body.lng), {rules: ['number']}),
                interests: await utils.validator(req.body.interests, {rules: ['array'], min: 0, max: 255}),
                sexual_orientations: await utils.validator(req.body.sexual_orientations, {rules: ['array'], min: 1, max: 255}),
            }
        } catch (err) {
            console.log(err)
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
            var today  = new Date();
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
                confirm: 0,
                online: 0,
                last_co: today.toLocaleDateString("en-GB"),
                fame: 0
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

    update: async (req, res) => {
        if (!req.user) {
            return res.status(203).json({error: 'validation_error', message: err});
        }

        console.log(req.body)

        let body;
        try {
            body = {
                username: await utils.validator(req.body.username, {rules: ['string', 'alphanumeric'], formats: ['trim', 'lowercase'], min: 4, max: 15}),
                password: req.body.password && req.body.password.length > 0 ? await utils.validator(req.body.password, {rules: ['string'], regex: /^[a-zA-Z0-9]{8,}$/, formats: ['trim'], max: 255}) : null,
                email: await utils.validator(req.body.email, {rules: ['string'], regex: /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/, formats: ['trim'], max: 255}),
                first_name: await utils.validator(req.body.first_name, {rules: ['string'], formats: ['trim'], min: 2, max: 25}),
                last_name: await utils.validator(req.body.last_name, {rules: ['string'], formats: ['trim'], min: 2, max: 25}),
                bio: await utils.validator(req.body.bio, {rules: ['string'], formats: ['trim'], min: 10, max: 100}),
                age: await utils.validator(req.body.age, {rules: ['number'], min: 16}),
                type: await utils.validator(req.body.type, {rules: ['string'], formats: ['trim', 'lowercase'], enum: ['male','woman','alien','cyborg','giant','minks','elve','troll']}),
                profile_pics: req.body.profile_pics && req.body.profile_pics.length > 0 ? await utils.validator(req.body.profile_pics, {rules: ['array'], min: 1, max: 5}) : null,
                lat: await utils.validator(parseFloat(typeof req.body.lat === 'string' ? req.body.lat.replace(',', '.') : req.body.lat), {rules: ['number']}),
                lng: await utils.validator(parseFloat(typeof req.body.lng === 'string' ? req.body.lng.replace(',', '.') : req.body.lng), {rules: ['number']}),
                interests: await utils.validator(req.body.interests, {rules: ['array'], min: 0, max: 255}),
                sexual_orientations: await utils.validator(req.body.sexual_orientations, {rules: ['array'], min: 1, max: 255}),
            }
        } catch (err) {
            return res.status(203).json({error: 'validation_error', message: err});
        }

        console.log(body)
        
        let pathImages = []

        if (body.profile_pics) {
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
        }

        // Username it's free ?
        try {
            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE username = ? AND id != ?', [body.username, req.user.id]);
            if(data[0])
                return res.status(203).json({error: 'username_exists', message: `Le nom d'utilisateur « ${data[0].username} » est déjà utilisée !`});
        } catch(ex) {
            return res.status(520).json({ error: 'Unknown error 0001' });
        }

        // Email it's free ?
        try {
            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE email = ? AND id != ?', [body.email, req.user.id]);
            if(data[0])
                return res.status(203).json({error: 'email_exists', message: `L'email' « ${data[0].email} » est déjà utilisée !`});
        } catch(ex) {
            return res.status(520).json({ error: 'Unknown error 0002' });
        }

        // INSERT
        try {

            let inserts = {
                username: body.username,
                pass : body.password ? await bcrypt.hash(body.password, saltRounds) : null,
                email: body.email,
                first_name: body.first_name,
                last_name: body.last_name,
                bio: body.bio,
                age: body.age,
                type: body.type,
                profile_pics: body.profile_pics ? pathImages.join(',') : null,
                lat: body.lat,
                lng: body.lng,
                interests: body.interests.map(v => v.text).join(','),
                sexual_orientations: body.sexual_orientations.join(',')
            };

            if (!inserts.pass) {
                delete inserts.pass
            }
            if (!inserts.profile_pics) {
                delete inserts.profile_pics
            }

            await util.promisify(req.db.query).bind(req.db)('UPDATE users SET ? WHERE id = ?', [inserts, req.user.id]);

            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE id = ?', req.user.id)

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
                    lat: data[0].lat,
                    lng: data[0].lng,
                    fame: data[0],
                }

                res.status(200).json({success: true, userInfos})
            }
            else {
                res.status(200).json({success: false})
            }
        } catch(err) {
            console.error(err)
            return res.status(520).json({ error: 'Unknown error 0004' });
        }

        //Send verification emal
        try {
            await utils.transporter.sendMail({
                from: 'Matcha <test.dev.basilic@gmail.com>',
                to: body.email,
                subject: 'New informations',
                text: `
                Done.
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
    },

    lost_pass: async (req, res) => {
        if (!req.params.email) {
            return res.status(400).json(false);
        }

        try {
            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE email = ?', req.params.email)

            if (data && data[0]) {
                let code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

                let pass_req = {
                    code,
                    user_id: data[0].id,
                    done: 0
                }
                
                await util.promisify(req.db.query).bind(req.db)('INSERT INTO lost_pass SET ?', pass_req)

                await utils.transporter.sendMail({
                    from: 'Matcha <test.dev.basilic@gmail.com>',
                    to: data[0].email,
                    subject: 'Reset your password',
                    text: `
                    http://localhost:8080/resetpass2?id=${data[0].id}&code=${code}
                    `
                })
                console.log(`Mail sent to ${data[0].email}`)
            }
            return res.status(200).json({success: true});
        }
        catch(err) {
            console.error(err)
            return res.status(520).json({ error: 'Unknown error 0006' });
        }
    },

    reset_pass: async (req, res) => {
        let body;
        try {
            body = {
                password: await utils.validator(req.body.password, {rules: ['string'], regex: /^[a-zA-Z0-9]{8,}$/, formats: ['trim'], max: 255}),
                id: await utils.validator(req.body.id, {rules: ['number']}),
                code: await utils.validator(req.body.code, {rules: ['string']})
            }
        } catch (err) {
            return res.status(203).json({error: 'validation_error', message: err});
        }

        try {
            let pass_req = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM lost_pass WHERE user_id = ? AND code = ? AND done = 0', [body.id, body.code])

            if (pass_req && pass_req[0]) {
                let new_pass = await bcrypt.hash(body.password, saltRounds)

                await util.promisify(req.db.query).bind(req.db)('UPDATE users SET pass = ? WHERE id = ?', [new_pass, body.id])

                await util.promisify(req.db.query).bind(req.db)('UPDATE lost_pass SET done = 1 WHERE id = ?', [pass_req[0].id])

                return res.status(200).json({success: true});
            }
            else {
                return res.status(203).json({error: 'req_no', message: `Reset password request do not exist`});
            }
        }
        catch(err) {
            console.error(err)
            return res.status(520).json({ error: 'Unknown error 0006' });
        }
    }
}