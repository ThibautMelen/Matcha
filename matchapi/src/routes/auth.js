const express = require('express');
const Joi = require('@hapi/joi')

module.exports = () => {
    const router = new express.Router();

    router.post('/login', async (req, res) => {

        const schema_login = Joi.object({
            username: Joi.string().trim().min(4).max(25).required(),
            password: Joi.string().trim().regex(/^[a-zA-Z0-9]{8,}$/).required()
        }).options({ stripUnknown: true, abortEarly: false });

        try {
            const body = await schema_login.validate(req.body);

            let sql = "SELECT * FROM users WHERE username = ? AND pass = ?";
            let inserts = [body.username, body.password];

            req.db.query(sql, inserts, (err, results) => {
                if (err) return res.status(500).send("FAIL : Auth Login user");
                else if (results != ""){
                    
                    //ENVOYER L'INFO QUE LA CO A SUCCESS
                    ////////////////////////////////////
                    console.log(`${results[0].username} + ${results[0].pass}`);
                    return res.json(results[0]);
                    ///////////////////////////////////
                    //////////////////////////////////
                }
                return res.status(500).send("FAIL : User Not Found");
            });

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
            first_name: Joi.string().trim().required(),
            last_name: Joi.string().trim().required()
        }).options({ stripUnknown: true, abortEarly: false });

        try {
            const body = await schema_register.validate(req.body);

            let sql = "INSERT INTO users SET ?";
            let inserts = {
                username: body.username,
                pass: body.password,
                email: body.email,
                first_name: body.first_name,
                last_name: body.last_name,
                mail_key: 'jtebaiz',
                confirm: 1
            };

            console.log(inserts);

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