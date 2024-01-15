const knex = require('../../Connection/index');
const cepPromise = require('cep-promise');


const validarCadCliente = (schema) => async (req, res, next) => {
    let { email, cpf, nome, telefone, endereco, bairro, UF, cidade } = req.body;
    const validar = { email, cpf, nome, telefone };

    if (!nome || !email || !cpf || !telefone) {
        return res.status(400).json({ message: 'Campo(s) Obrigatorio(s) vazio(s)' })
    }

    try {
        const emailExistente = await knex('clientes').where('email', email).first();
        const cpfExistente = await knex('clientes').where('cpf', cpf).first();


        if (emailExistente) {
            return res.status(400).json({ message: 'O email já esta cadastrado' })
        }

        if (cpfExistente) {
            return res.status(400).json({ message: 'O CPF já esta cadastrado' })
        }

        await schema.validateAsync(validar);

        next();

    } catch (error) {
        return res.status(400).json(error.message)
    }

}

module.exports = validarCadCliente;