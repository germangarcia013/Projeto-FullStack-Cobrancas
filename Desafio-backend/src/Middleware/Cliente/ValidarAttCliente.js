const knex = require('../../Connection/index');

const validarAttCliente = (schema) => async (req, res, next) => {
    const { nome, email, cpf, telefone, endereco, bairro, cep, uf, cidade, complemento } = req.body;
    const { id } = req.params;
    const validar = { nome, email, cpf, telefone };

    if (!nome || !email || !cpf || !telefone) {
        return res.status(400).json({ message: 'Campo(s) Obrigatorio(s) vazio(s)' })
    }

    try {
        const cliente = await knex('clientes').where('id', id).first();

        if (email) {
            const validarEmail = await knex('clientes').whereNot({ id }).andWhere({ email }).first();
            if (validarEmail) {
                return res.status(400).json({ message: 'E-mail já cadastrado' });
            }
        }
        if (
            email === cliente.email &&
            cpf === cliente.cpf &&
            telefone === cliente.telefone &&
            nome === cliente.nome &&
            endereco === cliente.endereco &&
            complemento === cliente.complemento &&
            bairro === cliente.bairro &&
            cep === cliente.cep &&
            uf === cliente.uf &&
            cidade === cliente.cidade
        ) {
            return res.status(400).json({ message: 'Pelo menos um dado deve ser atualizado!' })
        }
        if (cpf) {
            const validarCpf = await knex('clientes').whereNot({ id }).andWhere({ cpf }).first();
            if (validarCpf) {
                return res.status(400).json({ message: 'CPF já cadastrado' });
            }
        }

        await schema.validateAsync(validar);

        next()
    } catch (error) {
        return res.status(400).json(error.message)
    }

}

module.exports = validarAttCliente;