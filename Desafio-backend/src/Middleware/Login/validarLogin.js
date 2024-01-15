const knex = require('../../Connection/index');
const bcrypt = require('bcrypt');


const validarLogin = (schema) => async (req, res, next) => {
    const { email, senha } = await req.body

    if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e/ou senha obrigatória' });
    }
    try {
        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) {
            return res.status(404).json({ message: 'Email e/ou senha inválida' });
        }
        if (usuario) {
            const verificarSenha = await bcrypt.compare(senha, usuario.senha);
            if (!verificarSenha) {
                return res.status(400).json({ message: 'Email e/ou senha inválida' })
            }
        }
        await schema.validateAsync(req.body);
        next();
    } catch (error) {

        res.status(400).json(error.message);
    }
}

module.exports = validarLogin;