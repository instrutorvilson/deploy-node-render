const express = require('express')
router = express.Router()

router.post('/register', (req, res) => {
    let user = { 
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        perfil: req.body.perfil
    }
    res.send({message:"registrar",body: user})
})

router.post('/login', (req, res) => {
    let user = { email: req.body.email, senha: req.body.senha}
    res.send({message:"login", body: user})
})

module.exports = router