const mysql = require('promise-mysql')
const { createConnection } = require('../utils/db-utils')
const { messageMapper } = require('../models/mappers/message-mapper')

const messageModel = {

  getAll: async () => {

    // Connexion à la base de données
    const db = await createConnection()

    // Récupération des données
    const result = await db.query('SELECT * FROM message ORDER BY created_at DESC')

    // Fermeture de la connexion
    db.end()

    // console.log("result :>> ", result)

    return result.map(row => messageMapper(row))
  },

  getById: async (id) => {
    let db

    try {

      db = await createConnection()

      // Requête SQL paramétrée
      const query = 'SELECT * FROM message WHERE message_id = ?'
      const result = await db.query(query, [id])

      if (result.length !== 1) return null

      return messageMapper(result[0])

    } finally {
      db?.end()
    }
  },

  insert: async ({ pseudo, content }) => {
    let db

    try {

      db = await createConnection()

      // Requête SQL paramétrée
      const query = 'INSERT INTO message (pseudo, content) VALUES (?, ?)'
      const result = await db.query(query, [pseudo, content])

      console.log('result :>> ', result)

      return result.insertId

    } finally {
      db?.end()
    }
  }

}

module.exports = messageModel