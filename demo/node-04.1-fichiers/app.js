const fs = require('fs')
const { info } = require('console')


fs.readFile('./data/todo.txt', (err, data) => {
  info('> Lire un fichier (Asynchrone)')

  if (err) console.log(err)

  console.log("Contenu du fichier :")
  console.log(data.toString())
})

fs.stat('./data/todo.txt', (err, stats) => {

  info('> Obtenir metadata du fichier')

  if (err) console.log(err)

  if (stats.isFile()) console.log("C'est un fichier")
  else if (stats.isDirectory()) console.log("C'est un dossier")
  // etc

})

fs.writeFile('./data/nouveau.txt', "Hello world !", (err) => {
  if (err) console.log(err)
  else console.log("Ecriture OK")
})