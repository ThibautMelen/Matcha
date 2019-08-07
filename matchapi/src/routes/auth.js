const express = require('express');
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = () => {
    const router = new express.Router();

    router.post('/login', async (req, res) => {

        const schema_login = Joi.object({
            username: Joi.string().trim().min(4).max(25).required(),
            password: Joi.string().trim().regex(/^[a-zA-Z0-9]{8,}$/).required()
        }).options({ stripUnknown: true, abortEarly: false });

        try {
            const body = await schema_login.validate(req.body);

            let sql = "SELECT pass FROM users WHERE username = ?";
            let inserts = body.username;

            

            let data = req.db.query(sql, inserts, (err, results) => {
                if (err) return res.status(500).send("FAIL : Auth Login user");
                else if (results != ""){

                    //Password hash
                    console.log(`${req.body.password} + ${results[0].pass}`);
                    const res_qq = await bcrypt.compare(req.body.password, results[0].pass);

                    if(res_qq) {
                        console.log(`Les mots de pass corresponde`);
                        // res.json(`Les mots de pass corresponde`);
                        return res.status(200).send("FAIL : User Found");
                    } else {
                        console.log(`Ceci ne fonctionne pas. Ton mot de passe n'est pas le bon tres cher`);
                        return res.json(`Ceci ne fonctionne pas. Ton mot de passe n'est pas le bon tres cher`);
                    } 
                }
                else
                    return res.status(500).send("FAIL : User Not Found");
            });

            if(!data)
                return res.status(500).send("FAILSS");



            // return res.json(body);
        } catch (ex) {
            if (ex.name === 'ValidationError')
                return res.status(400).json(ex);
        }

    });

    router.post('/register', async (req, res) => {
        const schema_register = Joi.object({
            username: Joi.string().trim().min(4).max(25).required(),
            password: Joi.string().trim().regex(/^[a-zA-Z0-9]{8,}$/).required(),
            email: Joi.string().trim().regex(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/).required(),
            first_name: Joi.string().trim().min(4).max(25).required(),
            last_name: Joi.string().trim().min(4).max(25).required()
        }).options({ stripUnknown: true, abortEarly: false });

        try {
            const body = await schema_register.validate(req.body);

            let sql = "INSERT INTO users SET ?";
            let inserts = {
                username: body.username,
                pass : await bcrypt.hash(body.password, saltRounds),
                email: body.email,
                first_name: body.first_name,
                last_name: body.last_name,
                mail_key: 'jtebaiz',
                confirm: 1
            };

            req.db.query(sql, inserts, (err, results) => {
                if(err) return res.status(500).send("FAIL : Add user");
                res.json(`${inserts.username} is added`);
            });
        } catch (ex) {
            if (ex.name === 'ValidationError')
                return res.status(400).json(ex);
        }
    });

    return router;
};