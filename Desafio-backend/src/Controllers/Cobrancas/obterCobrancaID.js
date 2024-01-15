const knex = require('../../Connection')

const obterCobrancaId = async (req, res) => {
    const { cliente_id } = req.params

    try {
        const obterCobrancaCliente = await knex('cobrancas')
            .select('cobrancas.*', 'clientes.nome as nome_cliente')
            .where('cobrancas.cliente_id', cliente_id)
            .leftJoin('clientes', 'cobrancas.cliente_id', 'clientes.id')

        if (!obterCobrancaCliente) {
            return res.status(401).json('Cobranca não encontrado ')
        }

        res.status(200).json(obterCobrancaCliente)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = { obterCobrancaId }