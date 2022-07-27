// Montrer qu'on peut faire du JS classique avec un console.log
console.log("Hello world")

// Faire une entrée grâce à l'objet process
console.log('Veuillez entrer un message')
process.stdin.on('readable', () => {
  const buffer = process.stdin.read()
  const message = buffer.toString().trim()

  // Affichage avec l'objet "console"
  console.log(`Le buffer vaut "${buffer}"`)
  console.log(`Le message vaut "${message}"`)
  
  // Affichage avec l'objet "process"
  process.stdout.write(`Affichage via "process" : "${buffer}"`)
  process.stdout.write(`Affichage via "process" : "${message}"`)
})