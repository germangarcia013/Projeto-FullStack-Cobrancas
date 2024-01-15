const knex = require('../../Connection');

const atualizarCadCliente = async (req, res) => {
    const {
        nome,
        email,
        cpf,
        telefone,
        cep,
        endereco,
        bairro,
        complemento,
        uf,
        cidade
    } = req.body;

    const { id } = req.params;

    try {
        const atualizarCliente = await knex('clientes').update({
            nome: nome,
            email: email,
            cpf: cpf,
            telefone: telefone,
            cep: cep,
            endereco: endereco,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            usuario_id: req.usuario.id,
        }).where('id', id)

        return res.status(201).json({ message: 'Cliente atualizado com sucesso' });

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { atualizarCadCliente }