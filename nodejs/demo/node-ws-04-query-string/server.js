const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {

  // Analyse de l'IncomingMessage "req"
  console.log('req :>> ', `${req.method} ${req.url}`)

  // Gérer la demande du "/favicon.ico"
  if (req.url === "/favicon.ico") {
    const icon = fs.readFileSync(__dirname + "/public/favicon.ico")
    res.writeHead(200, { "Content-Type": "image/x-icon" })
    res.end(icon, "binary")
    return
  }

  // Extraire les infos contenu dans l'url
  // => Utiliser le module 'url'
  const info = url.parse(req.url, true)
  console.log('info :>> ', info);

  const { host, pathname, search, query } = info

  // QueryString du GET
  console.log(host)
  console.log(pathname)
  console.log(search)
  console.log(query)

  // Exemple de réponse au format HTML
  const page = `<!DOCTYPE html>
  <html lang='fr'>
  <head>
  <meta charset="UTF-8">
    <title>Démo WebServer</title>
  </head>
  <body>
    <h1>Analyse de la requête :</h1>
    <p>Host : ${host}</p>
    <p>Pathname : ${pathname}</p>
    <p>Search : ${search}</p>
    <p>Query :</p>
    <ul>
      <li>Prénom : ${query != null && query.prenom}</li>
      <li>Nom : ${query != null && query.nom}</li>
    </ul>
  </body>
  </html>`

  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(page)
  })

  // res.write("Hello world!")
  res.end(page)

})

server.listen(8080, () => console.log("Start web server on port 8080 !"))