// Chargement du fichier de config -> via un import
import { readFile } from 'fs'
import config from './config/demo.js'

console.log(config.welcomeMessage)

const filepath = "./data/" + config.filename
console.log(`Fichier à lire : ${filepath}`)

const readJsonFile = (jsonFile) => {
  return new Promise((resolve, reject) => {
    readFile(jsonFile, (err, data) => {
      if (err) reject(err)

      else {
        const json = JSON.parse(data)
        resolve(json)
      }
    })
  })
}

readJsonFile(filepath)
  .then((json) => {
    for (const person of json.people) {
      const { firstname, lastname } = person
      console.log(`- ${firstname} ${lastname}`)
    }
  })
  .catch(err => console.log("Une erreur s'est produite :\n", err))