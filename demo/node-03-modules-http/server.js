// Import du module "HTTP"
const http = require('http')

// Création d'un server via la librairie "http"
const server = http.createServer((request, response) => {

  // Récupération de l'adresse URL
  console.log(request.url)

  // Envoie la réponse (Basique / Sans routing)
  // - Ecrit le head
  response.writeHead(200, { 'Content-Type': 'text/plain' })

  // - Envoie le contenu String
  // response.end('Hello les WebApps ! :-) ')
  // response.end('Hello les WebApps ! :-) ☺')
  response.end('Hello les WebApps ! :)', 'ascii')

})

// Démarrer le serveur et le faire écouter le port 8080 (qu'on choisit)
server.listen(8080, () => { console.log('Le serveur écoute le port 8080 !') })