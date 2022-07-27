const http = require('http')
const url = require('url')
const fs = require('fs')
const ejs = require('ejs')
const moment = require('moment')

// Pour la gestion de template, nous allons utiliser "ejs"
// Commande: "npm install --save ejs"
// NB: Ceci n'est pas le seul moteur de template qui existe !

const renderPage = (response, pageName, data = {}) => {
  const page = fs.readFileSync(`${__dirname}/views/${pageName}.ejs`, "utf-8")
  const pageRender = ejs.render(page, data)

  response.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(page)
  })

  response.end(pageRender)
}

const requestListener = (request, response) => {

  const target = url.parse(request.url, true).pathname

  if (target === "/") {
    renderPage(response, "index", {
      dateDuJour: `${moment().format('DD/MM/YYYY')}`
    })

  }
  else if (target === "/demo") {
    const tab = [
      { firstname: "Riri", lastname: "Duck" },
      { firstname: "Zaza", lastname: "Vanderquack" },
      { firstname: "Balthazar", lastname: "Picsou" },
      { firstname: "Archibald", lastname: "Gripsou" },
    ]

    renderPage(response, "demo", {
      people: tab
    })
  }
  else {
    response.writeHead(404)
    response.end()
  }

}

const server = http.createServer()
server.on("request", requestListener)
server.listen(8080, () => {
  console.log("Start Server with Templating")
})