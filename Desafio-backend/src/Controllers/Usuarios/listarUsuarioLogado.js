const listarUsuarioLogado = async (req, res) => {
    res.status(200).json(req.usuario);
}

module.exports = { listarUsuarioLogado }