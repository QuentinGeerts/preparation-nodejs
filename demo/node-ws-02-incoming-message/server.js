const http = require('http')

// Pour éviter de devoir couper et relancer le serveur
// manuellement après chaque test. On va utiliser le package
// " nodemon " qui relance le serveur après chaque modification.
// => npm install --save-dev nodemon

const server = http.createServer((req, res) => {
  // Analyse de l'IncominMessage "req"
  console.log('req :>> ', `${req.method} "${req.url}"`)

  // Exemple de réponse au format HTML
  const page = `<!DOCTYPE html>
  <html lang='fr'>
  <head>
  <meta charset="UTF-8">
    <title>Démo WebServer</title>
  </head>
  <body>
    <h1>Hello les développeurs ^_^' !</h1>
    <h2>Test</h2>
  </body>
  </html>`

  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(page)
  })

  // res.write("Hello world!")
  res.write(page)
  res.end()
})

server.listen(8080, () => console.log("Start Web server on port 8080 !"))