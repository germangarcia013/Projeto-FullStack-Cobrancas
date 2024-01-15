const joi = require('joi');

const schemaCobranca = joi.object({
    valor: joi.number().required().messages({
        'number.type': 'Por favor insira um valor válido',
        'number.any': 'O valor da cobrança é obrigatório',
        'number.required': 'O valor da cobrança é obrigatório',
        'number.base': 'Valor inválido.'
    }),
    descricao: joi.string().messages({
        'string.type': 'Por favor insira uma descrição válida',
        'string.empty': 'Campo descrição é obrigatório'
    }),
    vencimento: joi.date().required().messages({
        'date.format': 'Por favor insira um data válida'
    }),
    status: joi.string().required().messages({
        'string.empty': 'O status da cobrança é obrigatório',
        'string.required': 'O status da cobrança é obrigatório'
    })
})

module.exports = schemaCobranca;