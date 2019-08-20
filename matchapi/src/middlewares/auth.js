const utils = require('../utils')

const verifyToken = async (req, res, next) => {
    if (req.cookies.user_token) {
        const token = req.cookies.user_token

        try{
            let decodedToken = await utils.verifyJWTToken(token)
            req.user = decodedToken.data
            next()
        }catch(ex) {
            console.error(ex);
            res.status(401).json({error : ex});
        }
    }
    else {
        res.status(401).json({error : ex});
    }
}

module.exports = verifyToken