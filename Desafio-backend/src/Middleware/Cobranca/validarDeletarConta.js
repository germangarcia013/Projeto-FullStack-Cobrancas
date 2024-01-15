const knex = require("../../Connection")


const validarDeletarConta = async (req, res, next) => {
    const { id_cobranca } = req.params;
    try {
        const cobranca = await knex('cobrancas').where({ id: id_cobranca }).first();

        if (!cobranca) {
            return res.status(404).json({ message: 'Cobrança não encontrada' });
        }
        if (cobranca.status === 'paga') {
            return res.status(400).json({ message: 'Esta cobrança não pode ser excluída!' });
        }
        const dataAtual = new Date();
        const dataVencimento = new Date(cobranca.vencimento);

        if (dataVencimento < dataAtual) {
            return res.status(400).json({ message: 'Esta cobrança não pode ser excluída!' });
        }

        next();

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = validarDeletarConta;