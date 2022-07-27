const express = require('express')
const homeRouter = require('./routes/homeRouter')


// Création du serveur web
const app = express()

// Middleware applicatif
const monSuperMiddlewareQuiFaitDesLogs = (req, res, next) => {
  console.log(`Nouvelle requête : ${req.url}`)
  next()
}

app.use(monSuperMiddlewareQuiFaitDesLogs)

app.use(homeRouter)

// Middleware d'erreur
const monSuperGestionnaireDErreurEnMiddleware = (err, req, res, next) => {
  console.log(err)
  res.sendStatus(500)
}
app.use(monSuperGestionnaireDErreurEnMiddleware)

app.listen(8080, () => {
  console.log('Server up on port 8080')
})