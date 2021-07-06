const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// TESTAR RETORNO
const tipo = 'produtos'

// CONSULTA TODOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos',
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send({
                    mensagem: 'OK',
                    response: resultado
                })
            }
        )
    })
});

// INSERIR
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: 'OK',
                    id_produto: resultado.insertId
                })
            }
        )
    });
});

// RETORNO UNICO
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos WHERE id = ?',
            [req.params.id],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send({
                    mensagem: 'OK',
                    response: resultado
                })
            }
        )
    })
});

// ALTERAR DADOS
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE produtos
            SET nome  = ?,
                preco = ?
         WHERE  id    = ?
        `,
            [
                req.body.nome,
                req.body.preco,
                req.body.id
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'OK'
                })
            }
        )
    });
});

// DELETAR DADOS
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM produtos WHERE id = ?',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(202).send({
                    mensagem: 'OK'
                })
            }
        )
    })
});

module.exports = router;