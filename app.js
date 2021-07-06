const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// DECLARAR ROTAS
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

// GERAR LOG NO TERMINAL
app.use(morgan('dev'));

// FORMATAÇÕES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DECLARAR ROTAS
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// ROTA CORS
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*'); // PERMISSÃO PARA TODOS
    res.header(
        'Acess-Control-Allow-Header',
        'Origin',
        'X-Requrested-With',
        'Content-Type',
        'Accept',
        'Authorization'
    );

    if (req.method == 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

// ROTA NÃO ENCONTRADA
app.use((req, res, next) => {
    const erro = new Error('Fernando Gayzao');
    erro.status = 404;
    next(erro);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;