const http = require('http')
const fs = require('fs')

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

  // Exemple de réponse au format HTML
  const page = `<!DOCTYPE html>
  <html lang='fr'>
  <head>
  <meta charset="UTF-8">
    <title>Démo WebServer</title>
  </head>
  <body>
    <h1>Hello les devs !</h1>
    <h2>Test</h2>
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