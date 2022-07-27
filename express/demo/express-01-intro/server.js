const express = require('express')

// Créer le serveur
const server = express()

// Ajout des actions sur les routes
server.get('/', (req, res) => {
  res.send('<h1>Hello world !</h1>')
})

server.get('/product/:id', (req, res) => {
  res.send(`<h1>Product ${req.params.id}</h1>`)
})

server.listen(8080, () => {
  console.log('Server up on port 8080')
})