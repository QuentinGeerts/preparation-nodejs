// // Import de modules existants
// // La méthode 'require()' n'est plus autorisée en mode module
// // const rl = require('readline') 
// import readline from 'readline'

// // rl.createInterface({ input: process.stdin, output: process.stdout })
// const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

// await rl.question('Bonjour, vous allez bien ?', (response) => {
//   console.log("La réponse est ", response)
//   rl.close()
// })

// Création de nos propres modules
import log from "./modules/log.js"
import Person from "./modules/Person.js"

log.debug("Heyo ! :D")
log.error('Oopsi !')

const riri = new Person('Riri', 'Duck')
const zaza = new Person('Zaza', 'Vanderquack')

console.log('riri :>> ', riri);
console.log('zaza :>> ', zaza);

console.log('riri.fullname :>> ', riri.fullname);
console.log('zaza.fullname :>> ', zaza.fullname);

riri.sayHello()
zaza.sayHello()

const action = zaza.sayHello
action()