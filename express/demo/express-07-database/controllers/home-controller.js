const homeController = {

  index: (req, res) => {
    res.render('home/index', { title: 'Page d\'accueil' })
  },

  about: (req, res) => {
    res.render('home/about', { title: null })
  }

}

module.exports = homeController