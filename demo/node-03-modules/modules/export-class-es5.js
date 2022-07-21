// Attention, le JS n'est pas un langage "orienté objet"
// Mais il est "orienté objet prototype" !

// JS OO => Définir le prototype pour créer un objet personne

const Personne = function (nom, prenom) {
  this.nom = nom
  this.prenom = prenom
}

Personne.prototype.fullname = function () {
  return `${this.prenom} ${this.nom}`
}

module.exports = Personne