const express = require('express')
const yup = require('yup')

// Création d'un objet "homeController" avec des méthodes
const homeController = {

  /**
   * Méthode du controller pour l'index
   * @param {express.Request} req
   * @param {express.Response} res
   */
  index: (req, res) => {
    res.render('home/index')
  }
  ,

  about: (req, res) => {
    const author = { firstname: 'Zaza', lastname: 'Vanderquack' }

    res.render('home/about', {
      firstname: author.firstname,
      lastname: author.lastname
    })

  },

  contactGet: (req, res) => {
    const categories = ['frontend', 'backend', 'db']

    res.render('home/contact', { categories })
  },

  contactPost: (req, res) => {
    // Récupération des données envoyées par la requête POST
    // Rappel : Nécessite le middleware express.urlencoded()
    console.log(req.body)

    // Création d'un schéma de validation via "yup"
    const schemaBody = yup.object().shape({
      email: yup.string().required().email(),
      category: yup.string().required(),
      message: yup.string().required()
    })

    // Validation des données du body (POST) via le schema yup
    if (schemaBody.isValidSync(req.body)) {
      res.render('home/contactResponse', { email: req.body.email })
    }
    else {
      res.redirect("/contact")
    }
  }

}

// Exportation du "homeController"
module.exports = homeController