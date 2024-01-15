const knex = require('../../Connection');

const detalharCobranca = async (req, res) => {
    const { id } = req.params;

    try {
        const obterCobranca = await knex('cobrancas').where('cobrancas.id', id)
            .leftJoin('clientes', 'cobrancas.cliente_id', 'clientes.id')
            .select('cobrancas.*', 'clientes.nome as nome_cliente')

        if (!obterCobranca) {
            return res.status(404).json({ message: 'Cobranca não encontrado' })
        }

        return res.status(200).json(obterCobranca);

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { detalharCobranca }