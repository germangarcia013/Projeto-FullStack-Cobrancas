const knex = require('../../Connection');
const jwt = require('jsonwebtoken');


const verificarAutenticacao = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' });
    }
    try {
        const obterToken = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(obterToken, process.env.JWT_PASS);

        const verificarUsuario = await knex('usuarios').where({ id }).first();

        if (!verificarUsuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const { senha, ...usuario } = verificarUsuario;

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(401).json(error.message);
    }
}

module.exports = { verificarAutenticacao }