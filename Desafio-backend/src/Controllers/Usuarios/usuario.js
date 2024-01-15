const knex = require('../../Connection/index');

const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = await req.body;

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = await knex('usuarios').insert(
            {
                nome,
                email,
                senha: senhaCriptografada
            }
        )
        if (!novoUsuario) {
            return res.status(404).json({ message: 'Usuário não cadastrado' });
        }

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { cadastrarUsuario }