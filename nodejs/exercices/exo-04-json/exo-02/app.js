const fs = require('fs')
const path = require('path')

const filePersonnage = path.resolve(__dirname, 'data', 'personnage.json')
const fileSavePersonnage = path.resolve(__dirname, 'data', 'result.json')

// console.log('filePersonnage :>> ', filePersonnage);
// console.log('fileSavePersonnage :>> ', fileSavePersonnage);

// Lecture du fichier
fs.readFile(filePersonnage, { encoding: 'utf-8' }, (err, valueText) => {
  const json = JSON.parse(valueText)
  console.log('json :>> ', json)

  const personnages = getPersonnages(json)

  console.log('personnages :>> ', personnages);

  savePersonnages(personnages)

})

// Extraction des personnes du JSON
const getPersonnages = (data) => {

  
  if(data.membre !== undefined) {
    
    const personnages = []
    
    data.membre.forEach(element => {
      const internalPerosnnages = getPersonnages(element)
      personnages.push(...internalPerosnnages)
    })

    return personnages

  }
  else {
    return [data]
  }

}

// Sauvegarde des personnages dans le fichier result.json
const savePersonnages = (personnages) => {
  const data = {
    nbPersonnage: personnages.length,
    personnages
  }

  console.log('data :>> ', data);
  
  const json = JSON.stringify(data, null, 4)
  console.log('json :>> ', json);

  fs.writeFile(fileSavePersonnage, json, { encoding: 'utf-8' }, (err) => {
    if (err) return console.log("Error : ", err.message)
    
    console.log("Saved !");
  })

}