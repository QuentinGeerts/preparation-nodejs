const readline = require('readline')

// Configuration d'un objet 'readline'
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

// Lecture de la saisie de l'utilisateur
rl.question('Veuillez entrer un nombre : ', (nb) => {
  rl.write(`Le nombre que vous avez entré est : ${nb}`)

  // Fermeture du curseur
  rl.close()
})
