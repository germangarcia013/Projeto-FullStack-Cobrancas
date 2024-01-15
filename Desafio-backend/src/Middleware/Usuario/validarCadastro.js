const knex = require('../../Connection/index');


const validarCadastro = (schema) => async (req, res, next) => {
    const { email } = req.body
    try {
        const usuarios = await knex('usuarios').where({ email }).first();

        if (usuarios) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }
        await schema.validateAsync(req.body);

        next();
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = validarCadastro;