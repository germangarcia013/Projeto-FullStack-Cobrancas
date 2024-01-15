require('dotenv').config();
const cors = require('cors');
const express = require('express');
const rotas = require('./Routes/rotas')

const app = express();


app.use(express.json());

app.use(cors());

app.use(rotas);

app.listen(process.env.PORT | 3001);
