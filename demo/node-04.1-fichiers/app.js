const fs = require('fs')

// fs.readFile('./data/todos.txt', (err, data) => {
fs.readFile('./data/todo.txt', (err, data) => {
  console.info('> Lecture d\'un fichier')

  if (err) {
    console.log(err)
    return
  }

  // console.log(data)
  console.log("Contenu du fichier :")
  console.log(data.toString())
})

fs.stat('./data/todo.txt', (err, stats) => {

  console.info('-> Lecture des metadatas du fichier')

  if (err) {
    console.log(err)
    return
  }

  console.log(stats)

  if (stats.isFile()) {
    console.log(`C'est un fichier`)
    console.log("Taille du fichier", stats.size)
  }

  else if (stats.isDirectory()) {
    console.log("C'est un dossier")
  }

  // etc

})

const fileData = "Hello world ! ^_^'"

fs.writeFile('./data/nouveau.txt', fileData, (err) => {
  console.info('-> Écriture d\'un fichier')

  if (err) {
    console.log(err)
  }

  else {
    console.log("Ecriture OK")
  }
})