const knex = require("../../Connection");

const findByEmail = async (req, res) => {
    const { email } = req.body
    try {
        const usuarioEmail = await knex('usuarios').where({ email }).first();
        if (usuarioEmail) {
            return res.status(200).json(true)
        }
        return res.status(200).json(false);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = findByEmail;