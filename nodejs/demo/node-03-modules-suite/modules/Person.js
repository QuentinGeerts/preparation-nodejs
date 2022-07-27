export default class Person {

  constructor (firstname, lastname) {
    this.firstname = firstname
    this.lastname = lastname
  }

  get fullname () { return this.firstname + ' ' + this.lastname }

  sayHello = () => { console.log(`${this.firstname} vous dit bonjour !`) }

}