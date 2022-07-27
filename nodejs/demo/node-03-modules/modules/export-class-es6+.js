// Utilisation du sucre syntaxique arrivé en 2015
// Qui permet de créer une classe avec le mot clef "class"
// Important => Le fonctionnement est identique qu'en ES5

class Personne {

  constructor (nom, prenom) {
    this.nom = nom
    this.prenom = prenom
  }

  fullname () {
    return `${this.prenom} ${this.nom}`
  }

}

module.exports = Personne