const homeController = require('../controllers/home-controller')
const homeRouter = require('express').Router()

const path = require('path')

// Ajout de multer pour gérer les formulaires "multipart/form-data"
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})


// - Configuration du middleware
const upload = multer({ storage: storage })

homeRouter.get('/', homeController.index)
homeRouter.get('/contact', homeController.contact)

// Injection du middlware de multer
homeRouter.post('/contact', upload.single('myFile'), homeController.contactPost)

module.exports = homeRouter 