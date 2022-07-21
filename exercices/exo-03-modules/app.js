const readline = require('readline')
const { fromChristmas, fromBirthdate, fromHolidays } = require("./modules/event-days")

// Créer un outils qui permet d'intéragir avec la console
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// process.stdout.write(`Obtenir le nombre de jours avant : 
// 1. Noël
// 2. Anniversaire
// 3. Vacances
// Quel est votre choix : `)

// process.stdout.write("Obtenir le nombre de jours avant :")
// process.stdout.write("\n\t 1. Noël")
// process.stdout.write("\n\t 2. Anniversaire")
// process.stdout.write("\n\t 3. Vacances")
// process.stdout.write("\n\t 0. Quitter")
// process.stdout.write("\n")

reader.write("Obtenir le nombre de jours avant :")
reader.write("\n\t 1. Noël")
reader.write("\n\t 2. Anniversaire")
reader.write("\n\t 3. Vacances")
reader.write("\n\t 0. Quitter")
reader.write("\n")

reader.question("Quel est votre choix : ", (response) => {
  const choice = parseInt(response)
  let nbDays

  switch (choice) {

    case 1:
      // Noël
      nbDays = fromChristmas()

      if (nbDays > 0) reader.write(`Noël est dans ${nbDays} jours ! 🎄`)
      else reader.write(`Joyeux Noël ! 🎄`)

      reader.close()
      break

    case 2:
      // Anniversaire

      reader.question("Quel est votre date d'anniversaire (YYYY-mm-dd) : ", (inputDate) => {
        const birthdate = new Date(inputDate)

        nbDays = fromBirthdate(birthdate)

        if (nbDays > 0) reader.write(`Ton anniversaire est dans ${nbDays} jours ! 🎂`)
        else reader.write(`Joyeux anniversaire ! 🎂`)

        reader.close()
      })

      break

    case 3:
      // Vacances

      nbDays = fromHolidays()

      if (nbDays > 0) reader.write(`Les prochaines vacances sont dans ${nbDays} jours ! 🎉`)
      else reader.write(`Les enfants sont en vacances, mais pas vous ! 😂`)

      reader.close()
      break

    default:
      reader.write("Tchao")
      reader.close()
      break

  }
})
