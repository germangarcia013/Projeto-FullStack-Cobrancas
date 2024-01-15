const knex = require('../../Connection/index');



const validarCobranca = schema => async (req, res, next) => {
    const { valor, vencimento, status, descricao } = await req.body;

    try {
        if (!valor || !vencimento || !status) {
            return res.status(400).json({ message: 'Esse campo deve ser preenchido' });
        }
        if (!valor && !vencimento && !status) {
            return res.status(400).json({ message: 'Por favor preencha as informações' });
        }
        await schema.validateAsync({ valor, vencimento, status, descricao });
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

validarAtualizacaoCobranca = schema => async (req, res, next) => {
    const { valor, descricao, vencimento, status } = await req.body;
    const { id_cobranca } = await req.params;
    try {
        const cobranca = await knex('cobrancas').where({ id: id_cobranca }).first();
        const dataVencimento = new Date(cobranca.vencimento).setUTCHours(0, 0, 0, 0);
        const novaDataVencimento = new Date(vencimento).setUTCHours(0, 0, 0, 0);
        if (valor === cobranca.valor && dataVencimento === novaDataVencimento && status === cobranca.status && descricao === cobranca.descricao) {
            return res.status(400).json({ message: 'Pelo menos um campo deve ser atualizado' })
        }
        if (!valor || !vencimento || !status) {
            return res.status(400).json({ message: 'Esse campo não pode estar vazio' });
        }
        await schema.validateAsync({ valor, vencimento, status });
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { validarCobranca, validarAtualizacaoCobranca };