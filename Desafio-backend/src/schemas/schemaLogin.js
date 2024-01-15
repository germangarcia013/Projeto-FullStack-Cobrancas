const joi = require('joi');

const schemaLogin = joi.object({
    email: joi.string().email().required().messages({
        'string.empty': 'O campo e-mail é obrigatório',
        'any.required': 'O campo e-mail é obrigatório',
    }),

    senha: joi.string().required().messages({
        'string.empty': 'O campo senha é obrigatório',
        'any.required': 'O campo senha é obrigatório',
    }),

})

module.exports = schemaLogin