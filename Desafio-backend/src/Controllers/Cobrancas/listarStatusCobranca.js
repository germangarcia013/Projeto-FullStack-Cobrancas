const knex = require('../../Connection/index');

const listarStatusCobranca = async (req, res) => {
    const usuario_id = req.usuario.id;
    const { status, limite } = req.params

    try {
        let cobrancas;

        if (status === 'paga' || status === 'vencida' || status === 'pendente') {
            cobrancas = await knex('cobrancas')
                .select('cobrancas.*', 'clientes.nome as nome_cliente')
                .leftJoin('clientes', 'cobrancas.cliente_id', 'clientes.id')
                .leftJoin('usuarios', 'clientes.usuario_id', 'usuarios.id')
                .where('cobrancas.status', status)
                .andWhere('usuarios.id', usuario_id).limit(limite);

            return res.status(200).json({ cobrancas });
        } else {
            return res.status(400).json({ message: 'Status inválido' });
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { listarStatusCobranca }