const knex = require('../../Connection');

const cadastrarCliente = async (req, res) => {
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

    try {
        await knex('clientes').insert({
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
            status: 'Em dia'
        })

        return res.status(201).json({ message: 'Cliente cadastrado com sucesso' })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}


module.exports = { cadastrarCliente }