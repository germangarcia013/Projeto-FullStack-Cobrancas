const knex = require('../../Connection/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios').where({ email }).first();

        const verificarSenha = await bcrypt.compare(senha, usuario.senha)

        if (!verificarSenha) {
            return res.status(400).json({ message: 'Email e/ou senha inválida' })
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, { expiresIn: '24h' })

        const { senha: _, cpf, telefone, ...dadosUsuario } = usuario

        return res.status(200).json({ usuario: dadosUsuario, token })

    } catch (error) {
        return res.status(401).json(error.message);
    }
}
module.exports = { login }


