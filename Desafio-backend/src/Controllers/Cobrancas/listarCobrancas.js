const knex = require('../../Connection/index');
const { format } = require('date-fns');

const listarCobrancas = async (req, res) => {
    try {

        const usuario_id = req.usuario.id;
        // const dataAtual = format(new Date(), 'yyyy/MM/dd');
        const cobrancas = await knex('cobrancas').select(
            'cobrancas.id',
            'cobrancas.valor',
            'cobrancas.descricao',
            'cobrancas.vencimento',
            'cobrancas.status',
            'cobrancas.cliente_id',
            'clientes.nome as nome_cliente'
        ).leftJoin('clientes', 'cobrancas.cliente_id', 'clientes.id')
            .leftJoin('usuarios', 'clientes.usuario_id', 'usuarios.id')
            .where('usuarios.id', usuario_id);

        return res.status(200).json({ cobrancas });

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { listarCobrancas }