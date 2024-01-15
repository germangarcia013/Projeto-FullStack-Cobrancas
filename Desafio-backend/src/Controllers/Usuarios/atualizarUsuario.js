const knex = require('../../Connection/index');
const bcrypt = require('bcrypt');


const atualizarUsuario = async (req, res) => {
    const { nome, email, cpf, novaSenha, senhaAtual, telefone } = req.body;
    const { id } = req.usuario;

    try {

        const verificarUsuario = await knex('usuarios').where({ id }).first();

        if (!verificarUsuario) {
            return res.status(404).json('Usuario não encontrado');
        }

        const senhaCriptografada = await bcrypt.hash(senhaAtual, 10);

        const usuario = await knex('usuarios').where({ id }).update({
            nome,
            email,
            cpf,
            telefone,
            senha: senhaCriptografada
        });
        if (!usuario) {
            res.status(404).json({ message: 'Usuário não atualizado' });
        }

        return res.status(201).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { atualizarUsuario };
