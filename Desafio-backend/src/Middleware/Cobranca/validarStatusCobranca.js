const knex = require('../../Connection/index');

const validarStatusCobranca = async (req, res, next) => {
    try {
        const usuario_id = req.usuario.id;
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
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = validarStatusCobranca;