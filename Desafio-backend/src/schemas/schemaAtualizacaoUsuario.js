const joi = require('joi');

const schemaAtualizacao = joi.object({
    nome: joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).min(3).messages({
        'string.min': 'Por favor insira um nome válido',
        'string.empty': 'O nome é obrigatório',
        'string.pattern.base': 'Por favor insira um nome válido'
    }),
    novaSenha: joi.string().allow('').pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$*&@#!])(?:([0-9a-zA-Z!$*&@#])){8,}$/).messages({
        'string.pattern.base': 'A senha deve conter pelo menos um caracter especial, no minimo 8 caracteres, pelo menos um número e uma letra maiuscula',
    }),
    email: joi.string().email({ allowFullyQualified: true }).messages({
        'string.email': 'Por favor insira um e-mail válido',
        'string.empty': 'Campo e-mail obrigatório'
    }),

    cpf: joi.string().min(11).pattern(/^\d+$/).messages({
        'string.min': 'Por favor, insira um CPF válido',
        'string.pattern.base': 'Por favor insira um CPF válido'
    }).allow('', null).optional(),

    telefone: joi.string().min(11).allow('').pattern(/^\d+$/).messages({
        'string.empty': 'Campo telefone é obrigatório',
        'string.min': 'Por favor, insira um número de telefone válido',
        'string.pattern.base': 'Por favor insira um telefone válido',

    }),

})

module.exports = schemaAtualizacao;