// Montrer qu'on peut faire du JS classique avec un console.log
console.log("Hello world")

// Faire une entrée grâce à l'objet process
console.log('Veuillez entrer un message')
process.stdin.on('readable', () => {
  const msg = process.stdin.read()

  console.log(`Le message est ${msg}`)
  process.stdout.write(`Affichage via "process"`)
})