const http = require('http')
const url = require('url')

const loadStaticFile = require('./modules/load-static-file')

const responseHtml = (response, contentHtml, code = 200) => {
  const page = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Demo Routing</title>
    <link rel="stylesheet" href="/public/styles.css">
  </head>
  <html>
    ${contentHtml}
  </html>
  </html>`

  response.writeHead(code, {
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(page)
  })

  response.end(page)
}

const routes = {
  "/": (request, response) => {
    responseHtml(response, "<h1>Page d'accueil</h1>")
  },

  "/products": (request, response) => {
    // Logique de génération de page => Acces DB

    const productsPage = `<h1>Liste des produits</h1>
    <ul>
      <li>Table</li>
      <li>Chaise</li>
      <li>Ecran</li>
    </ul>`

    responseHtml(response, productsPage)
  },

  "/product": (request, response) => {

    const dataGet = url.parse(request.url, true).query
    console.log(dataGet)

    let productPage

    if (dataGet && dataGet.id !== undefined) {
      productPage = `<h1>Détails d'un produit</h1>
      <h3>Produit ${dataGet.id}</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor, ligula vitae suscipit convallis, magna diam consectetur ante, ut convallis magna mi quis neque. Nulla volutpat ultricies orci. Vivamus vel blandit quam. Fusce eu egestas urna. Sed aliquet ante sed odio imperdiet, et tincidunt velit tincidunt. Sed ut ex facilisis, cursus felis quis, finibus risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed hendrerit congue scelerisque. In non dictum mi, sed facilisis quam. Phasellus ante elit, suscipit id risus sit amet, mattis congue felis. Phasellus faucibus facilisis velit et porttitor. Nunc sem sapien, dignissim ornare urna eget, dictum egestas ex.
      </p>
      `

    }
    else {
      productPage = `<h1>Détails d'un produit</h1>
      <h3>Produit non trouvé !</h3>`
    }

    responseHtml(response, productPage)

  },

  "/about": (request, response) => {
    responseHtml(response, "<h1>About</h1>")
  }

}

const requestListener = (request, response) => {

  // Incomming Message
  console.log(`(${request.method}) ${request.url}`)

  // Mise en place du système de routing
  const urlInfo = url.parse(request.url, true)
  const target = urlInfo.pathname

  // Test les routes qui ont été configurée
  if (target in routes) {
    return routes[target](request, response)
  }

  // LOADSTATICFILE
  // Test si la demande concerne un fichier public
  if (request.url.length > 7 && request.url.includes('/public')) {
    return loadStaticFile(request.url, response)
  }

  if (request.url === "/favicon.ico") {
    return loadStaticFile("/public/favicon.ico", response)
  }

  // Erreur de type 404
  console.log("=> 404 !")
  response.writeHead(404)
  response.end()

}

const server = http.createServer()
server.on('request', requestListener)
server.listen(8080, () => {
  console.log("Server is running on http://127.0.0.1:8080")
})