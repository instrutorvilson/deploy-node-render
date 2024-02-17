module.exports = (req, res, next) => {
  if(req.body.email == undefined || req.body.email == ''){
    res.status(400).send('É necessario informar o email')
    return
  }

  if(req.body.senha == null || req.body.senha.length < 3){
    res.status(400).send('Senha precisa ter no mimimo três caracteres')
    return
  }

  next()
}

