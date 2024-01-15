const knex = require('../../Connection/index')

const deletarCobranca = async (req, res) => {
    const { id_cobranca } = req.params;
    try {
        const { cliente_id } = await knex('cobrancas').where({ id: id_cobranca }).first();

        await knex('cobrancas').where({ id: id_cobranca }).del();

        const numeroCobrancas = await knex('cobrancas').where({ cliente_id }).count('id as count').first();
        const totalCobrancas = numeroCobrancas.count;

        if (parseInt(totalCobrancas) === 0) {
            await knex('clientes').where({ id: cliente_id }).update({ status: 'Em dia' });
        }

        return res.status(200).json({ message: 'Cobrança deletada com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = deletarCobranca;