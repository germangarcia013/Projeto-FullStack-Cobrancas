const express = require('express');
const { cadastrarUsuario } = require('../Controllers/Usuarios/usuario.js');
const { login } = require('../Controllers/Usuarios/login.js');
const { atualizarUsuario } = require('../Controllers/Usuarios/atualizarUsuario.js')
const findByEmail = require('../Controllers/Usuarios/findByEmail.js');
const validarAtualizacao = require('../Middleware/Usuario/validarAtualizacao.js');
const validarCadastro = require('../Middleware/Usuario/validarCadastro.js');
const validarLogin = require('../Middleware/Login/validarLogin.js');
const validarCpf = require('../Middleware/validarCpf.js')
const schemaCadastro = require('../schemas/schemaCadastro.js');
const schemaLogin = require('../schemas/schemaLogin.js');
const schemaAtualizacao = require('../schemas/schemaAtualizacaoUsuario.js');
const { verificarAutenticacao } = require('../Middleware/AutenticacaoUsuario/verificarAutenticacao.js');
const { listarUsuarioLogado } = require('../Controllers/Usuarios/listarUsuarioLogado.js');



const rotasUsuario = express();

rotasUsuario.post('/acharEmail', findByEmail);
rotasUsuario.post('/usuario/cadastro', validarCadastro(schemaCadastro), cadastrarUsuario);
rotasUsuario.post('/login', validarLogin(schemaLogin), login);

rotasUsuario.use(verificarAutenticacao);

rotasUsuario.get('/usuario', listarUsuarioLogado);
rotasUsuario.patch('/usuario/atualizar', validarAtualizacao(schemaAtualizacao), validarCpf, atualizarUsuario);



module.exports = rotasUsuario;


