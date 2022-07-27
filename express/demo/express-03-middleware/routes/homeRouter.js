const express = require('express')
const homeRouter = express.Router()

// Middleware du routing
const monMiddlewarePourLeRouting = (req, res, next) => {
  console.log('On passe dans le routing \'Home\'')
  next()
}

homeRouter.use(monMiddlewarePourLeRouting)

// Ajout du routage
homeRouter.get(['/', '/home'], (req, res) => {
  res.status(200).send('<h1>Hello here !</h1>')
})

homeRouter.get('/error', () => { throw new Error('Bouuuuuuuuuuuuum :o') })

module.exports = homeRouter