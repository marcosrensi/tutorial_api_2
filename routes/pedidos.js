const express = require('express');
const router = express.Router();

// TESTAR RETORNO
const tipo = 'pedidos'

// CONSULTA TODOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: ('get - ' + tipo)
    })
});

// INSERIR
router.post('/', (req, res, next) => {
    const pedido = {
        qtd: req.body.qtd,
        id_produto: req.body.id_produto
    };

    res.status(201).send({
        mensagem: ('post - ' + tipo + ' criado '),
        pedidoCriado: pedido
    })
});

// RETORNO UNICO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    res.status(200).send({
        mensagem: ('get ' + id + ' - ' + tipo)
    })
});

// ALTERAR DADOS
router.patch('/:id_pedido', (req, res, next) => {
    res.status(201).send({
        mensagem: ('patch - ' + tipo)
    })
});

// DELETAR DADOS
router.delete('/:id_pedido', (req, res, next) => {
    res.status(201).send({
        mensagem: ('delete - ' + tipo)
    })
});

module.exports = router;