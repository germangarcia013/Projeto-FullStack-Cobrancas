const express = require('express');
const schemaCliente = require('../schemas/schemaCadCliente.js');
const validarCadCliente = require('../Middleware/Cliente/validarCadCliente.js');
const { verificarAutenticacao } = require('../Middleware/AutenticacaoUsuario/verificarAutenticacao.js')
const validarAttCliente = require('../Middleware/Cliente/ValidarAttCliente');
const schemaAttCliente = require('../schemas/schemaAttCliente.js');
const validarCpf = require('../Middleware/validarCpf');
const { listarClientes } = require('../Controllers/Clientes/listarClientes.js');
const { detalharCliente } = require('../Controllers/Clientes/detalharClientes.js');
const { atualizarCadCliente } = require('../Controllers/Clientes/atualizarCliente.js');
const { cadastrarCliente } = require('../Controllers/Clientes/cadastrarCliente.js');
const { listarStatusClientes } = require('../Controllers/Clientes/listarStatusClientes.js');
const rotasCliente = express();


rotasCliente.use(verificarAutenticacao);
rotasCliente.post('/cadastroCliente', validarCadCliente(schemaCliente), validarCpf, cadastrarCliente);
rotasCliente.patch('/cliente/atualizar_cadastro/:id', validarAttCliente(schemaAttCliente), validarCpf, atualizarCadCliente)
rotasCliente.get('/clientes', listarClientes)
rotasCliente.get('/cliente/:id', detalharCliente)
rotasCliente.get('/listarStatusClientes/:status/:limite', listarStatusClientes)


module.exports = rotasCliente;