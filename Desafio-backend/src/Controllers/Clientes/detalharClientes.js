const knex = require('../../Connection');

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const obterCliente = await knex('clientes').where({ id }).first();

        if (!obterCliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' })
        }

        return res.status(200).json(obterCliente);

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { detalharCliente }