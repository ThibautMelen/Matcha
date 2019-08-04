const express = require('express');
const Joi = require('@hapi/joi')

module.exports = () => {
    const router = new express.Router();

    router.post('/login', async (req, res) => {

        console.log(`A`);

        // Verif Login Schema
        const schema_login = Joi.object({
            username: Joi.string().trim().min(4).max(25).required(),
            password: Joi.string().trim().regex(/^[a-zA-Z0-9]{8,}$/).required()
        }).options({ stripUnknown: true, abortEarly: false });

        console.log(`B`);

        // Verif data
        try {
            const body = await schema_login.validate(req.body);

            console.log(`C`);

            //User exist ?
            // let sql = "SELECT * FROM users WHERE pseudo = ?? AND pass = ??";
            // // let inserts = [req.username, req.password];
            // // sql = mysql.format(sql, inserts);
            // // console.log(sql);
            
    
            console.log(`D`);
    

            
            return res.json(body);
        } catch (ex) {
            if (ex.name === 'ValidationError')
                return res.status(400).json(ex);
        }


        // $requser = $bdd->prepare("SELECT * FROM member WHERE pseudo = ? AND pass = ?");
        // $requser->execute(array($login_pseudo, $login_password));
        // $userexist = $requser->rowCount();
        // if($userexist == 1) {
        //     $userinfo = $requser->fetch();
        //     if($userinfo['confirm'] == 1) {
        //         $_SESSION['id'] = $userinfo['id'];
        //         $_SESSION['pseudo'] = $userinfo['pseudo'];
        //         $_SESSION['email'] = $userinfo['email'];
        //         $_SESSION['avatar'] = $userinfo['avatar'];
        //         $_SESSION['notif'] = $userinfo['notif'];
        //         header('Location: ../index.php');
        //     }
        //     else{
        //         $login_error = "Compte non comfirmée par mail";
        //     }
        // }
        // else
        //     $login_error = "Mauvais pseudo ou mot de passe !";



        // //get data / verif
        // let username = req.body.username.trim();
        // let password = req.body.password.trim();
        // if(username == 'aa') // if (!username || !password)
        // {
        //     console.log('nop');
        //     res.status(400).json({
        //         error: 'Information is missing in request.'
        //     });
        // }

        // console.log(`"${username}" + "${password}"`);


        // //get name
	    // // let db_username = await Users.findOne({$or: [{email: name.toLowerCase()}, {username: name}]});
	    // // if (!db_username)
        // //     res.status(203, 'db_username not found');


    });

    router.get('/register', (req, res) => {
        res.send('bonjour');
    });

    return router;
}