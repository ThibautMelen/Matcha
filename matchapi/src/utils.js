const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const util = require('util')

/**
 * Validate a field based on given options
 * 
 * @param {any} field The field to be validated
 * @param {object} options Options object -> can contain : [rules]/[enum]/regex/[formats]/min/max
 * options.rules : array | switch -> 'string'||'number'||'boolean'||'object'||'alphanumeric'
 * options.enum : array
 * options.regex : regex
 * options.formats : array | switch -> 'trim'||'lowercase'||'uppercase'
 * options.min : number
 * options.max : number
 * 
 * @return {any} The formated field
 */
async function validator(field, options = {}) {

    if (typeof field === 'undefined') {
        throw `${field} : Undefined value.`
    }

    if (options.rules && Array.isArray(options.rules) && options.rules.length > 0) {
        for (let rule of options.rules) {
            switch (rule) {
                case 'string':
                    if (typeof field !== 'string') {
                        throw `${field} : Not string.`
                    }
                    break;
                case 'number':
                    if (typeof field !== 'number') {
                        throw `${field} : Not number.`
                    }
                    break;
                case 'boolean':
                    if (typeof field !== 'boolean') {
                        throw `${field} : Not boolean.`
                    }
                    break;
                case 'object':
                    if (typeof field !== 'object') {
                        throw `${field} : Not object.`
                    }
                    break;
                case 'array':
                    if (!Array.isArray(field)) {
                        throw `${field} : Not array.`
                    }
                    break;
                case 'alphanumeric':
                    if (typeof field !== 'string' || !field.match(/^[a-z0-9]+$/i)) {
                        throw `${field} : Not alphanumeric.`
                    }
                    break;
            }
        }
    }

    let newField = field

    if (options.formats && Array.isArray(options.formats) && options.formats.length > 0) {
        for (let format of options.formats) {
            switch (format) {
                case 'trim':
                    newField = newField.trim()
                    break;
                case 'lowercase':
                    newField = newField.toLocaleLowerCase()
                    break;
                case 'uppercase':
                    newField = newField.toLocaleUpperCase()
                    break;
            }
        }
    }

    if (typeof options.min === 'number' && options.min >= 0) {
        if (typeof newField === 'string') {
            if (newField.length < options.min) {
                throw `${field} : Too short.`
            }
        }
        else if (typeof newField === 'number') {
            if (newField < options.min) {
                throw `${field} : Too small.`
            }
        }
        else if (Array.isArray(newField)) {
            if (newField < options.min) {
                throw `${field} : Not enough elements.`
            }
        }
    }

    if (typeof options.max === 'number' && options.max >= 0) {
        if (typeof newField === 'string') {
            newField = newField.substring(0, options.max)
        }
        else if (typeof newField === 'number') {
            if (newField > options.max) {
                throw `${field} : Too big.`
            }
        }
        else if (Array.isArray(newField)) {
            if (newField > options.max) {
                throw `${field} : Too much elements.`
            }
        }
    }

    if (options.enum && Array.isArray(options.enum) && options.enum.length > 0) {
        if (!options.enum.includes(newField)) {
            throw `${newField} : Not allowed value.`
        }
    }

    if (options.regex && typeof options.regex === 'object' && options.regex.test) {
        if (!newField.match(options.regex)) {
            throw `${newField} : Not matching regex.`
        }
    }

    return newField
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test.dev.basilic@gmail.com',
        pass: '&ngland12345SOFIAN'
    }
})

const jwt_secret = `grh8ei7ck&{KB*Sysq7WyVH-2n&d`

function createJWTToken(data) {
    if (typeof data !== 'object') {
        data = {}
    }

    const token = jwt.sign(
        {data: data.sessionData || ''},
        jwt_secret,
        {expiresIn: data.maxAge || '7d', algorithm: 'HS256'}
    )

    return token
}

async function verifyJWTToken(token) {
    try {
        const decodedToken = await util.promisify(jwt.verify)(token, jwt_secret)
        return decodedToken
    }
    catch (err) {
        throw err
    }
}

module.exports = {
    validator,
    transporter,
    createJWTToken,
    verifyJWTToken
};
