const mysql = require('promise-mysql')

// console.log(mysql)

const createConnection = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo_node'
  })
}

// Récupération de tous les élèves
const getAllStudents = () => {
  let connection

  createConnection()
    .then((connect) => {
      // Sauvegarde de la connection dans la variable
      connection = connect

      // console.log('connection :>> ', connection)

      return connection.query('SELECT * FROM student;')
    })
    .then((students) => {
      console.log('students :>> ', students)

      console.log("Liste des étudiants")

      for (const student of students) {
        const { firstname, lastname, year_result } = student

        console.log(`- ${firstname} ${lastname} ${year_result !== null ? 'a ' + year_result + '/20' : 'n\'a pas de résultats'}`)

      }

    })
    .finally(() => { connection.end() })

}

// getAllStudents()

// Récupération d'un étudiant sur base de son nom
const getStudentsByLastname = (name) => {

  let connection

  createConnection()
    .then((connect) => {
      connection = connect

      // Toujours échapper les paramètres. Ne jamais faire de concaténation (Fail SQL) !!!
      return connection.query('SELECT * FROM student WHERE lastname LIKE ?', [name])
      // return connection.query('SELECT * FROM student WHERE lastname LIKE ' + mysql.escape(name))
    })
    .then((students) => {
      // Traitement des données
      console.log("Liste des étudiants trouvés :")

      for (const student of students) {
        console.log(` - ${student.firstname}`)
      }

    })
    .finally(() => { connection.end() })

}


// Ajout d'un étudiant
const createStudent = (student) => {

  const { firstname, lastname, yearResult, remark } = student

  let connection

  createConnection()
    .then((connect) => {
      connection = connect

      const queryInsert = `INSERT INTO student (firstname, lastname, year_result, remark) VALUES (?, ?, ?, ?)`

      return connection.query(queryInsert, [firstname, lastname, yearResult, remark])
    })
    .then((data) => {
      console.log('data :>> ', data)
      console.log(`Ajout réussi, l\'id du nouvel étudiant est ${data.insertId}`)
    })
    .finally(() => {
      connection.end()
    })

}

// createStudent({ firstname: 'Quentin', lastname: 'Geerts', yearResult: 16.5, remark: 'Hello world !' })


// Modification d'un étudiant
const updateStudent = (id, student) => {
  const { firstname, lastname, yearResult, remark } = student

  let connection

  createConnection()
    .then((connect) => {
      connection = connect
      const queryUpdate = `
        UPDATE student
        SET
          firstname = ?
          , lastname = ?
          , year_result = ?
          , remark = ?
        WHERE student_id = ?
      `

      return connection.query(queryUpdate, [firstname, lastname, yearResult, remark, id])
    })
    .then((data) => {
      if (!data.affectedRows) console.log("Aucun élève modifié.")
      else console.log('data : ', data)
    })
    .finally(() => connection.end())
}


// updateStudent(10, { firstname: 'Quentin', lastname: 'Geerts', yearResult: 17.5, remark: 'Hello world !' })


// Supprimer un élève sur base de son id

// Modification d'un étudiant
const deleteStudent = (id) => {

  let connection

  createConnection()
    .then((connect) => {
      connection = connect
      const queryDelete = `DELETE FROM student WHERE student_id = ?`

      return connection.query(queryDelete, [id])
    })
    .then((data) => {
      if (!data.affectedRows) console.log("Aucun élève supprimé.")
      else console.log('data : ', data)
    })
    .finally(() => connection.end())
}

deleteStudent(10)

// getStudentsByLastname("Duck")

// Récupération des élèves avec un résultat annuel supérieur à 10
const demoAsyncAwait = async () => {

  let connection

  try {
    connection = await createConnection()

    const students = await connection.query('SELECT * FROM student WHERE year_result > 10')

    console.log(students)

  } catch (error) {
    console.log(error)
  }
  finally {
    connection.end()
  }

}

// demoAsyncAwait()
