require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

const contatos = require('./contatos')
const locais = require('./locais')
const compromissos = require('./compromissos')
const categorias = require('./categorias')
const usuarios = require('./usuarios')

app.use(express.json())

app.use('/contatos', contatos)
app.use('/locais', locais)
app.use('/compromissos', compromissos)
app.use('/categorias', categorias)
app.use('/usuarios', usuarios)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/**
 * get -> contatos
 * get -> contatos/1
 * delete -> contatos/1
 * put -> contatos/1
 * post -> contatos
 */