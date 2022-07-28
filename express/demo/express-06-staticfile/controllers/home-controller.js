const { contactValidator } = require('../form-validation/contact-validator')
const authorData = require('../data/author.json')


const homeController = {

  index: (req, res) => {
    const data = {
      fullname: authorData.firstname + ' ' + authorData.lastname,
      image: authorData.image
    }
    res.render('home/index', data)
  },

  contact: (req, res) => {
    res.render('home/contact')
  },

  contactPost: (req, res) => {
    if (!contactValidator.isValidSync(req.body)) {
      res.redirect('/contact')
      return
    }

    // Cas pratique => Save in Database
    console.log("body: ", req.body)

    // Dans le cas d'un fichier, utiliser les données de "req.file" 
    // pour ajouter des informations en DB (originalName, fileName, ...)
    console.log("file: ", req.file)

    const data = {
      pseudo: req.body.pseudo,
      nbPerson: req.body.nbPerson,
      myFile: 'images/' + req.file.filename
    }
    res.render('home/contactResponse', data)
  }

}

module.exports = homeController