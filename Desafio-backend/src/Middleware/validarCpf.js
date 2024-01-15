
const validarCpf = (req, res, next) => {
    let { cpf } = req.body;

    if (!cpf) {
        return next()
    }

    cpf = cpf.replace(/\D/g, "");



    if (/^(\d)\1{10}$/.test(cpf)) {
        return res.status(400).json({ message: 'Por favor insira um cpf válido' })
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
        return res.status(400).json({ message: 'CPF invalido' });
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(10))) {
        return res.status(400).json({ message: 'CPF invalido' });
    }


    return next();
}

module.exports = validarCpf