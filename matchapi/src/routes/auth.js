const express = require('express');
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt');
const util = require('util');//promisify (transformer function callback en promise)

const utils = require('../utils'); 

const saltRounds = 10;

module.exports = () => {
    const router = new express.Router();

    router.post('/login', async (req, res) => {

        //JOI SCHEMA
        const schema_login = Joi.object({
            username: Joi.string().trim().lowercase().required(),
            password: Joi.string().trim().required()
        }).options({ stripUnknown: true, abortEarly: false });

        //JOI EXECUTE
        let body;
        try {
            body = await schema_login.validate(req.body);
        } catch (ex) {
            // return res.status(403).json(ex);
            return res.status(203).json({error: 'joi_error', message: ex.details[0].message});
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
            return res.status(520).json({ error: 'Erreur inconnu C' });
        }
    });

    router.post('/register', async (req, res) => {

        //JOI SCHEMA
        const schema_register = Joi.object({
            username: Joi.string().trim().alphanum().min(4).max(15).lowercase().required(),
            password: Joi.string().trim().regex(/^[a-zA-Z0-9]{8,}$/).required(),
            email: Joi.string().trim().regex(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/).required(),
            first_name: Joi.string().trim().min(2).max(25).required(),
            last_name: Joi.string().trim().min(2).max(25).required(),
            bio: Joi.string().trim().min(10).max(100).required(),
            age: Joi.number().min(16).required(),
            type: Joi.string().trim().lowercase().valid('male','woman','alien','cyborg','giant','minks','elve','troll').required()
        }).options({ stripUnknown: true, abortEarly: false });

        //JOI EXECUTE
        let body;
        try {
            body = await schema_register.validate(req.body);
        } catch (ex) {
            return res.status(203).json({error: 'joi_error', message: ex.details[0].message});
            // return res.status(403).json(ex.details[0].message);
        }

        console.log(body);
        //utiliser une function utils
        // utils.oui();

        // Username it's free ?
        try {
            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE username = ?', body.username);
            if(data[0])
                return res.status(203).json({error: 'user_already_use', message: `Le nom d'utilisateur « ${data[0].username} » est déjà utilisée !`});
        } catch(ex) {
            return res.status(520).json({ error: 'Erreur inconnu A' });
        }

        // Email it's free ?
        try {
            const data = await util.promisify(req.db.query).bind(req.db)('SELECT * FROM users WHERE email = ?', body.email);
            if(data[0])
                return res.status(203).json({error: 'email_already_use', message: `L'email' « ${data[0].email} » est déjà utilisée !`});
        } catch(ex) {
            return res.status(520).json({ error: 'Erreur inconnu B' });
        }

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
                mail_key: 'jtebaiz',
                confirm: 1
            };
            await util.promisify(req.db.query).bind(req.db)('INSERT INTO users SET ?', inserts);
            res.status(200).json({ success: 'OK' });
        } catch(ex) {
            return res.status(520).json({ error: 'Erreur inconnu C' });
        }
    });


    return router;
};