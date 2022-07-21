const messager = {

  hello: () => {
    console.log("Bienvenue sur l'application !")
  },

  say: (msg) => {
    console.log(`Message : ${msg}`)
  },

  goodbye: () => {
    const today = new Date()

    if (today.getHours() < 17) console.log("Au revoir !")
    else if (today.getHours() < 22) console.log("Bonne soirée ! Bye.")
    else console.log("Bonne nuit !")
  }

}

module.exports = messager