const joi = require('joi');

const schemaAttCliente = joi.object({
    nome: joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).min(3).messages({
        'string.min': 'Por favor insira um nome válido',
        'string.empty': 'O nome é obrigatório',
        'string.pattern.base': 'Por favor insira um nome válido'
    }),
    email: joi.string().email({ allowFullyQualified: true }).messages({
        'string.email': 'Por favor insira um e-mail válido',
        'string.empty': 'Campo e-mail é obrigatório'
    }),
    telefone: joi.string().min(11).messages({
        'string.min': 'Por favor insira um telefone válido',
        'string.length': 'Por favor, insira um número de telefone válido',
        'string.pattern.base': 'Por favor insira um telefone válido',
    }),

    cpf: joi.string().min(11).messages({
        'string.min': 'Por favor, insira um CPF válido',
        'string.empty': 'O CPF é obrigatório',
        'string.pattern.base': 'Por favor insira um CPF válido'
    }),
})

module.exports = schemaAttCliente;