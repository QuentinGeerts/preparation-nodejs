const mysql = require('promise-mysql')

const createConnection = async () => {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo_express'
  })

  return db
}

module.exports = { createConnection }