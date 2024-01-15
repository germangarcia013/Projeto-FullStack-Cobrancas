const knex = require('../../Connection/index');
const { format } = require('date-fns');

const atualizarCobranca = async (req, res) => {
    const { valor, descricao, vencimento, status } = req.body;
    const { id_cobranca } = req.params;

    try {
        const dataAtual = format(new Date(), 'yyyy/MM/dd');
        const cobranca = await knex('cobrancas').where({ id: id_cobranca }).first();
        const cobrancaAtualizada = await knex('cobrancas').update({
            valor,
            descricao,
            vencimento,
            status,
        }).where({ id: id_cobranca });
        if (vencimento < dataAtual && status.toLowerCase() === 'pendente' || vencimento > dataAtual && status.toLowerCase() === 'pendente') {
            const atualizarClienteIndadimplente = await knex('clientes').update({ status: 'Inadimplente' }).where({ id: cobranca.cliente_id });
        }
        if (status.toLowerCase() === 'paga') {
            const atualizarClienteEmDia = await knex('clientes').update({ status: 'Em dia' }).where({ id: cobranca.cliente_id });
        }
        return res.status(200).json({ message: 'Cobrança atualizada com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = atualizarCobranca;