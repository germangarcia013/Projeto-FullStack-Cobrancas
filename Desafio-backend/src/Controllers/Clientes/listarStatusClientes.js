const knex = require('../../Connection/index');

const listarStatusClientes = async (req, res) => {
    const usuario_id = req.usuario.id;
    let { status, limite } = req.params

    try {
        let clientes;

        if (status === "em-dia") {
            status = "Em dia"
        }

        if (status === 'Em dia' || status === 'Inadimplente') {
            clientes = await knex('clientes').where('status', status).leftJoin('usuarios', 'clientes.usuario_id', 'usuarios.id')
                .select('clientes.*').where('usuarios.id', usuario_id).limit(limite)
        } else {
            return res.status(400).json({ message: 'Status inválido' });
        }

        return res.status(200).json({ clientes });

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { listarStatusClientes }