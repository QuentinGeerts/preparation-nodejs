const fs = require('fs')
const ejs = require('ejs')

const loadView = (response, group, viewName, data = {}) => {

  const pathView = `${process.cwd()}/views/page/${group}/${viewName}.ejs`

  if (!fs.existsSync(pathView)) {
    response.writeHeader(404)
    response.end()
    return
  }

  ejs.renderFile(pathView, data, (err, body) => {
    if (err) {
      console.log(err)
      response.writeHeader(500)
      response.end()
      return
    }

    const bodyRender = ejs.render(body)
    response.writeHeader(200, {
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(body)
    })

    response.end(bodyRender)
  })

}

module.exports = loadView