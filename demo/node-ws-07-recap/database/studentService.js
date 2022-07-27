const mysql = require('promise-mysql')

const createConnection = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo_node'
  })
}

module.exports.getAll = (callback) => {
  let connection

  createConnection()
    .then((connect) => {
      // Sauvegarde de la connexion dans la variable
      connection = connect
      const sqlRead = `SELECT * FROM student`
      return connection.query(sqlRead)
    })
    .then((students) => { callback(students) })
    .then(() => {
      connection.end()
    })
}

module.exports.add = ({ firstname, lastname, year_result }) => {
  let connection

  createConnection()
    .then((connect) => {
      // Sauvegarde de la connexion dans la variable
      connection = connect
      const sqlCreate = `
      INSERT INTO student (firstname, lastname, year_result)
      VALUES
        (?, ?, ?)
      `
      return connection.query(sqlCreate, [firstname, lastname, year_result])
    })
    .then(() => {
      connection.end()
    })
}