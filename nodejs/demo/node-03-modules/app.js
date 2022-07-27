// const Personne = require('./modules/export-class-es5')
const Personne = require('./modules/export-class-es6+')
const fnAnonyme = require('./modules/export-function')
const messager = require('./modules/messager')
const { start, stop, send, send2 } = require('./modules/messager')

messager.start()
// start();

fnAnonyme();

// messager.send("Démo des modules")
// messager.send2("Bientôt la pause :D")

send("Démo des modules")
send2("Bientôt la pause :D")

const p = new Personne("Geerts", "Quentin")
console.log(p.fullname())

messager.stop()