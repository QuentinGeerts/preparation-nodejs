const express = require('express')

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
    res.sendStatus(501) // Not Implemented
  }

}

// Exportation du "homeController"
module.exports = homeController