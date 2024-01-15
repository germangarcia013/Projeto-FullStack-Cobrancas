const knex = require('../../Connection/index');
const bcrypt = require('bcrypt');


const validarAtualizacao = schema => async (req, res, next) => {
    const { nome, email, novaSenha, senhaAtual, telefone } = await req.body;
    let { cpf } = req.body
    const { id } = req.usuario;
    if (!nome && !email && !cpf && !novaSenha && !telefone) {
        return res.status(400).json({ message: 'Pelo menos um campo deve ser atualizado!' });
    }
    try {
        const usuario = await knex('usuarios').where({ id }).first();
        const validarSenha = await bcrypt.compare(senhaAtual, usuario.senha);

        if (email) {
            const validarEmail = await knex('usuarios').whereNot({ id }).andWhere({ email }).first();
            if (validarEmail) {
                return res.status(400).json({ message: 'E-mail já cadastradooo' });
            }
        }
        if (email == req.usuario.email && cpf === req.usuario.cpf && telefone === req.usuario.telefone && nome === req.usuario.nome && novaSenha === senhaAtual) {
            return res.status(400).json({ message: 'Pelo menos um dado deve ser atualizado!' })
        }
        if (cpf) {
            const validarCpf = await knex('usuarios').whereNot({ id }).andWhere({ cpf }).first();
            if (validarCpf) {
                return res.status(400).json({ message: 'CPF já cadastrado' });
            }
        }


        if (!validarSenha) {
            return res.status(400).json({ message: 'Senha incorreta, por favor tente novamente' });
        }

        await schema.validateAsync({ nome, email, novaSenha, telefone, telefone, cpf });

        next();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = validarAtualizacao;