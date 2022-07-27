const express = require('express')
const path = require('path')

const profRouter = express.Router()

profRouter.get('/prof', (req, res) => {
  res.status(200).send('<h1>Zone prof</h1>')
})

profRouter.get('/prof/notfound', (req, res) => {
  // Envoi d'une erreur 404
  res.status(404).send('<h1>Prof non trouvé!</h1>')
})

profRouter.get('/prof/notfoundbis', (req, res) => {
  // Envoi uniquement du code d'erreur
  res.sendStatus(404)
})

profRouter.get('/prof/redirection', (req, res) => {
  // Par défaut, le code de redirection est '302'
  // res.redirect('/prof')
  res.redirect(301, '/prof')
})

profRouter.get('/prof/file/:filename', (req, res) => {

  // __dirname => Localisation actuelle
  // console.log(__dirname);

  // process.cwd() => Dossier 'principal / root'
  // Dossier dans lequel le fichier "app.js" se trouve
  // console.log(process.cwd());

  const filePath = path.resolve(process.cwd(), 'data', req.params.filename)
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err)
      res.sendStatus(404)
    }
    else {
      console.log('OK :)')
    }
    
  })

})


module.exports = profRouter