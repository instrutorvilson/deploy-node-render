module.exports = (req, res, next) => {
  erros = []
  if(req.body.nome == undefined || req.body.nome == ''){
    erros.push('É necessario informar o nome')    
  }

  if(req.body.email == undefined || req.body.email == ''){
    erros.push('É necessario informar o email')
  }

  if(req.body.senha == null || req.body.senha.length < 3){
    erros.push('Senha precisa ter no mimimo três caracteres')
  }

  if(req.body.perfil == undefined || req.body.perfil == ''){
    erros.push('É necessario informar o um perfil')
  }
 if(erros.length > 0){
   res.status(400).send(erros)
   return
 }

 next()
}

