const http = require('http')

// Création d'un web serveur en NodeJS
const server = http.createServer((request, response) => {

  // Request => IncomingMessage
  // Response => ServerResponse

  // Défini le header de la réponse
  response.writeHead(200, { "Content-Type": "text/plain" })

  // Permet de définir le contenu de la réponse
  response.write("Hello world !")

  // Permet d'envoyer la réponse au navigateur
  response.end()

})

server.listen(8080, () => console.log("Start web server on port 8080 !"))