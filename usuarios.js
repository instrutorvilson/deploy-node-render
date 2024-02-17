const express = require('express')
router = express.Router()
const pg = require('pg')

const stringConexao = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/bd_node'
const pool = new pg.Pool({ connectionString: stringConexao })

router.post('/register', async(req, res) => {
    try{
        var client = await pool.connect() 
        let sql = 'insert into tb_usuarios(nome, email, senha, perfil)values($1, $2, $3, $4) RETURNING *'
        let dados = [req.body.nome, req.body.email, req.body.senha, req.body.perfil]
        let user = await client.query(sql, dados)
        res.status(201).send(user.rows[0])

    }catch(error){
        res.status(400).send(`Erro:${error.message}`)
    }    
})

router.post('/login', (req, res) => {
    let user = { email: req.body.email, senha: req.body.senha}
    res.send({message:"login", body: user})
})

module.exports = router