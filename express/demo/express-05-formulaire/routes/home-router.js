const express = require('express')
const homeController = require('../controllers/home-controller')

// Création du router de la zone "home".
// Celui-ci est dédié au routing
// => Son objectif est d'envoyer vers la bonne méthode du controller
const homeRouter = express.Router()

// Définition des routes

// - Page d'accueil
homeRouter.get('/', homeController.index)
homeRouter.get(['/home', '/index'], (req, res) => res.redirect('/'))

// - Page About
homeRouter.get('/about', homeController.about)

// - Page Contact
homeRouter.route('/contact')
  .get(homeController.contactGet)
  .post(homeController.contactPost)

// Exportation du module "homeRouter"
module.exports = homeRouter