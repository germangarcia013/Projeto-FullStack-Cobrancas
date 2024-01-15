const joi = require('joi');

const schemaCliente = joi.object({

    nome: joi.string().required().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).min(3).messages({
        'string.empty': 'O campo nome é obrigatório',
        'any.required': 'O campo nome é obrigatório',
        'string.min': 'Por favor insira um nome válido',
        'string.pattern.base': 'Por favor insira um nome válido'
    }),

    email: joi.string().email({ allowFullyQualified: true }).required().messages({
        'string.empty': 'O campo e-mail é obrigatório',
        'any.required': 'O campo e-mail é obrigatório',
        'string.email': 'Por favor insira um e-mail válido'
    }),

    cpf: joi.string().min(11).messages({
        'string.min': 'Por favor, insira um CPF válido',
        'string.empty': 'O CPF é obrigatório',
    }),
    telefone: joi.string().min(11).messages({
        'string.empty': 'Campo telefone é obrigatório',
        'string.min': 'Por favor, insira um número de telefone válido',
        'string.pattern.base': 'Por favor insira um telefone válido',
    }),
})

module.exports = schemaCliente;
