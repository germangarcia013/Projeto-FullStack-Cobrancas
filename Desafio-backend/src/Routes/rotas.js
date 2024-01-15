const express = require('express');
const rotasCliente = require('./rotasCliente');
const rotasCobranca = require('./rotasCobranca');
const rotasUsuario = require('./rotasUsuario');

const rotas = express();

rotas.use(rotasUsuario);
rotas.use(rotasCliente);
rotas.use(rotasCobranca);


module.exports = rotas;
