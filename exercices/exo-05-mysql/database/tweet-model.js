const { createConnect } = require('./db')

const userModel = {

  get: async () => {

    const sql = `
    SELECT * 
    FROM tweet t
      JOIN user u
        ON t.user_id = u.user_id
    `

    try {
      // Connexion à la base de données
      const database = await createConnect

      // Exécution de la requête SQL
      const data = await database.query(sql)

      return data

    } catch (err) {
      console.log('Erreur : ', err.sqlMessage)
      return []
    }
  },

  getByUserId: async (userId) => {
    const sql = `
    SELECT * 
    FROM tweet t
      JOIN user u
        ON u.user_id = t.user_id
    WHERE t.user_id = ? 
    `

    try {
      // Connexion à la base de données
      const database = await createConnect

      // Exécution de la requête SQL
      const data = await database.query(sql, [userId])

      return data

    } catch (err) {
      console.log('Erreur : ', err.sqlMessage)
      return []
    }
  },

  getById: async (tweetId) => {
    const sql = `
    SELECT * 
    FROM tweet t
      JOIN user u
        ON u.user_id = t.user_id
    WHERE t.tweet_id = ? 
    `

    try {
      // Connexion à la base de données
      const database = await createConnect

      // Exécution de la requête SQL
      const data = await database.query(sql, [tweetId])

      return data

    } catch (err) {
      console.log('Erreur : ', err.sqlMessage)
      return []
    }
  },

  insert: async (message, userId) => {

    const sql = "INSERT INTO tweet (message, user_id) VALUES (?, ?)"

    try {
      // Connexion à la base de données
      const database = await createConnect

      // Exécution de la requête SQL
      const data = await database.query(sql, [message, userId])

      return data
    } catch (err) {
      console.log('Erreur : ', err.sqlMessage)
    }

  },

  update: async (tweetId, message) => {
    const sql = `
    UPDATE tweet
    SET message = ?
    WHERE tweet_id = ?
    `

    try {
      const database = await createConnect
      return await database.query(sql, [message, tweetId])
    } catch (err) {
      console.log(err.sqlMessage)
    }
  }

}

module.exports = userModel