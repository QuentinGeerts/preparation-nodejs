const messager = require('./modules/messager')
const Personne = require('./modules/export-class-es6+')

messager.hello()

messager.say("Démo des modules")

const p = new Personne("Geerts", "Quentin")
console.log(p.fullname())

messager.goodbye()