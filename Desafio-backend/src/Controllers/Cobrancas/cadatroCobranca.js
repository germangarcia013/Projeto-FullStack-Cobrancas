const knex = require('../../Connection/index');
const { isBefore, isAfter, isEqual } = require('date-fns');

const cadastrarCobranca = async (req, res) => {
    const { valor, descricao, vencimento, status } = req.body;
    const { cliente_id } = req.params;

    try {
        const dataAtual = new Date();
        let statusCobranca = 'pendente';

        if (status.toLowerCase() === 'paga') {
            statusCobranca = 'paga';
            await knex('clientes').update({ status: 'Em dia' }).where({ id: cliente_id });
        } else if (status.toLowerCase() === 'pendente') {
            if (isEqual(new Date(vencimento), dataAtual)) {
                statusCobranca = 'vencida';
                await knex('clientes').update({ status: 'Inadimplente' }).where({ id: cliente_id });
            } else if (isBefore(new Date(vencimento), dataAtual)) {
                statusCobranca = 'vencida';
                await knex('clientes').update({ status: 'Inadimplente' }).where({ id: cliente_id });
            } else if (isAfter(new Date(vencimento), dataAtual)) {
                statusCobranca = 'pendente';
                await knex('clientes').update({ status: 'Inadimplente' }).where({ id: cliente_id });
            }
        }

        await knex('cobrancas').insert({
            valor,
            descricao,
            vencimento,
            status: statusCobranca,
            cliente_id,
        });

        return res.status(201).json({ message: "Cobrança cadastrada com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    cadastrarCobranca
};
