const moment = require('moment')
// require('moment/locale/fr') // Pour importer la partie FR

const messager = {

  start: () => {
    console.log('L\'application a démarré')
  },

  stop: () => {
    console.log('L\'application s\'arrête')
  },

  // messager.send('Hello World'); → [27/08 - 14:15] Hello World
  send: (message) => {
    const now = new Date()

    const date = now.getDate()
    const month = now.getMonth() + 1
    const hours = now.getHours()
    const minutes = now.getMinutes()

    console.log(`[${date}/${month} - ${hours}:${minutes}] ${message}`)
  },

  send2: (message) => {
    const now = moment().format('DD/MM - HH:mm')

    // Avec l'import de la partie FR
    // const now = moment().format('dddd DD MMMM - HH:mm') 

    console.log(`[${now}] ${message}`)
  }

}

module.exports = messager