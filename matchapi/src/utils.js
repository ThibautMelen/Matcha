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
        throw 'Undefined value.'
    }

    if (options.rules && Array.isArray(options.rules) && options.rules.length > 0) {
        for (let rule of options.rules) {
            switch (rule) {
                case 'string':
                    if (typeof field !== 'string') {
                        throw 'Not string.'
                    }
                case 'number':
                    if (typeof field !== 'number') {
                        throw 'Not number.'
                    }
                case 'boolean':
                    if (typeof field !== 'boolean') {
                        throw 'Not boolean.'
                    }
                case 'object':
                    if (typeof field !== 'object') {
                        throw 'Not object.'
                    }
                case 'array':
                    if (Array.isArray(field)) {
                        throw 'Not array.'
                    }
                case 'alphanumeric':
                    if (typeof field !== 'string' || !field.match(/^[a-z0-9]+$/i)) {
                        throw 'Not alphanumeric.'
                    }
            }
        }
    }

    let newField = field

    if (options.formats && Array.isArray(options.formats) && options.formats.length > 0) {
        for (let format of options.formats) {
            switch (format) {
                case 'trim':
                    newField = newField.trim()
                case 'lowercase':
                    newField = newField.toLocaleLowerCase()
                case 'uppercase':
                    newField = newField.toLocaleUpperCase()
            }
        }
    }

    if (typeof options.min === 'number' && options.min >= 0) {
        if (typeof newField === 'string') {
            if (newField.length < options.min) {
                throw 'Too short.'
            }
        }
        else if (typeof newField === 'number') {
            if (newField < options.min) {
                throw 'Too small.'
            }
        }
        else if (Array.isArray(newField)) {
            if (newField < options.min) {
                throw 'Not enough elements.'
            }
        }
    }

    if (typeof options.max === 'number' && options.max >= 0) {
        if (typeof newField === 'string') {
            newField = newField.substring(0, options.max)
        }
        else if (typeof newField === 'number') {
            if (newField > options.max) {
                throw 'Too big.'
            }
        }
        else if (Array.isArray(newField)) {
            if (newField > options.max) {
                throw 'Too much elements.'
            }
        }
    }

    if (options.enum && Array.isArray(options.enum) && options.enum.length > 0) {
        if (!options.enum.includes(field)) {
            throw 'Not allowed value.'
        }
    }

    if (options.regex && typeof options.regex === 'object' && options.regex.test) {
        if (!field.match(options.regex)) {
            throw 'Not matching regex.'
        }
    }

    return newField
}

module.exports = {
    validator
};
