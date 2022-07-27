const express = require('express')
const path = require('path')
const homeRouter = require('./routes/home-router')

const logger = require('./middlewares/logger-middleware')

// Variable de config
const port = 8080
const rootDir = process.cwd()


// Créer le server web
const app = express()

// Configurer le moteur de vue
// - Express va utiliser le moteur de vue automatiquement
app.set('view engine', 'ejs')
// - Configuration du répertoire dans lequel sont les vues
app.set('views', path.resolve(rootDir, 'views'))

// Ajout d'un middleware
app.use(logger())

// Ajout d'un middleware pour gérer les requêtes "x-www-form-urlencoded" (encodé sous forme de clef/valeurs)
// NB : Anciennement, il était nécessaire d'installer "body-parser"
app.use(express.urlencoded({ extended: true }))
// ↑ Ceci ajout l'objet 'body' dans l'objet 'req'

// Ajout du dossier public
app.use(express.static('public'))

// Ajout des routers
app.use(homeRouter)

// Démarrage du server
app.listen(port, () => {
  console.log(`Server up on port ${port}`)
})