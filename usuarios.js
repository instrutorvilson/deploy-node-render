const express = require('express')
router = express.Router()
const pg = require('pg')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validaLogin = require('./middlewares/middleWareLogin')

const stringConexao = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/bd_node'
const pool = new pg.Pool({ connectionString: stringConexao })


router.post('/register', async (req, res) => {
    try {
        let client = await pool.connect()
        let dados = await client.query('select * from tb_usuarios where email = $1', [req.body.email])

        if (dados.rowCount > 0) {
            throw new Error('Email já cadastrado')
        }

        let hash = await bcrypt.hash(req.body.senha, 10)
        let sql = 'insert into tb_usuarios(nome, email, senha, perfil)values($1, $2, $3, $4) RETURNING *'
        dados = [req.body.nome, req.body.email, hash, req.body.perfil]
        let user = await client.query(sql, dados)
        res.status(201).send(user.rows[0])

    } catch (error) {
        res.status(400).send(`Erro:${error.message}`)
    }
})

router.post('/login', validaLogin, async (req, res) => {
    try {
        let client = await pool.connect()
        let dados = await client.query('select * from tb_usuarios where email = $1', [req.body.email])

        if (dados.rowCount > 0) {
            var ok = await bcrypt.compare(req.body.senha, dados.rows[0].senha)
            if(ok){
               var token = jwt.sign({
                    id: dados.rows[0].id,
                    nome: dados.rows[0].nome,
                    email: dados.rows[0].email,
                    perfil: dados.rows[0].perfil,
                },'aula-node')
                res.status(200).send(token)
            }
            else{
                throw new Error('Senha não confere') 
            }
        }
        else {
            throw new Error('Usuario não cadastrado')
        }
    } catch (error) {
        res.status(400).send(`Erro:${error.message}`)
    }
})

module.exports = router