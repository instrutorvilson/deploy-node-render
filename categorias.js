const express = require('express')
router = express.Router()
const pg = require('pg')
const userADM = require('./middlewares/middleWareADMIN')

const stringConexao = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/bd_node'
const pool = new pg.Pool({ connectionString: stringConexao })

router.get("/conectar", (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            res.status(400).send({
                message: err.message
            })
        }
        res.send('conectado')
    })
})

router.get("/", (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            res.status(400).send({ message: err.message })
        }
        client.query("select * from tb_categorias", (erro, result) => {
            client.release()
            if (erro) {
                res.status(400).send({ message: erro.message })
            }
            res.status(200).send(result.rows)
        })        
    })
  
})

router.get("/:idcategoria", async (req, res) => {
    try {
        var client = await pool.connect()
        var dados = await client.query('select * from tb_categorias where id = $1', [req.params.idcategoria])

        if (dados.rowCount > 0)
            res.status(200).send(dados.rows[0])
        else
            res.status(404).send({ message: "Categoria não encontrada" })

    } catch (err) {
        res.status(400).send({ message: err.message })
    }
    finally{
        if(client)
          client.release()
    }
})

router.post("/", userADM, async (req, res) => {
    try {
        var client = await pool.connect()
        var dados = await client.query('insert into tb_categorias(descricao)values($1) RETURNING *', [req.body.descricao])
        res.status(201).send(dados.rows[0])

    } catch (err) {
        res.status(400).send({ message: err.message })
    }
    finally{
        if(client)
          client.release()
    }
})

router.put("/:id", async (req, res) => {
    try {
        var client = await pool.connect()

        var dados = await client.query('select * from tb_categorias where id = $1', [req.params.id])

        if (dados.rowCount > 0) {
            var dados = await client.query('update tb_categorias set descricao = $1 where id = $2 RETURNING *', [req.body.descricao, req.params.id])
            res.status(200).send(dados.rows[0])
        }
        else
            res.status(404).send({ message: "Categoria não encontrada" })

    } catch (err) {
        res.status(400).send({ message: err.message })
    }
    finally{
        if(client)
          client.release()
    }
})

router.delete("/:idcategoria", async (req, res) => {
    try {
        var client = await pool.connect()
        var dados = await client.query('select * from tb_categorias where id = $1', [req.params.idcategoria])

        if (dados.rowCount > 0){
            await client.query('delete from tb_categorias where id = $1', [req.params.idcategoria])
            res.status(204).send()
        }           
        else
            res.status(404).send({ message: "Categoria não encontrada" })

    } catch (err) {
        res.status(400).send({ message: err.message })
    }
    finally{
        if(client)
          client.release()
    }
})


module.exports = router
