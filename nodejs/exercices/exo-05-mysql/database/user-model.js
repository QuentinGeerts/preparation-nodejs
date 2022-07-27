const { createConnect } = require('./db')

const userModel = {

  get: () => {

    const sql = "SELECT * FROM user"

    return createConnect
      .then((connect) => {
        let data = connect.query(sql)

        return data
      })
      .catch((err) => {
        console.log('Erreur', err.sqlMessage)
        return []
      })

  },

  getByUserId: (userId) => {
    const sql = "SELECT * FROM user WHERE user_id = ?"

    return createConnect
      .then((connect) => {
        let data = connect.query(sql, [userId])

        return data
      })
      .catch((err) => {
        console.log('Erreur', err.sqlMessage)
        return []
      })
  },

  insert: (pseudo) => {

    const sql = "INSERT INTO user (pseudo) VALUES (?)"

    return createConnect.then(async (connect) => {
      let data = await connect.query(sql, [pseudo])

      return data

    })
      .catch((err) => {
        console.log('Erreur', err.sqlMessage)
        return []
      })

  },

  update: (userId, pseudo) => {
    const sql = 'UPDATE user SET pseudo = ? WHERE user_id = ?'
    return createConnect
      .then(async (connect) => await connect.query(sql, [pseudo, userId]))
      .catch((err) => { console.log(err.sqlMessage) })
  }

}

module.exports = userModel