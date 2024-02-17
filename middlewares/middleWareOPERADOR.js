const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const token = req.headers['x-access-token']
  if (token == undefined) {
    res.status(403).send('Precisa estar logado')
    return
  }

  let dados = await jwt.verify(token, 'aula-node')
  if (dados.perfil != "OPERADOR") {
    res.status(403).send('Precisa ter perfil OPERADOR')
    return
  }

  next()
}

