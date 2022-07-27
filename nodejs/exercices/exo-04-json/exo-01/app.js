import { readFile } from 'fs'

const readJsonFile = (pathname) => {
  return new Promise((resolve, reject) => {

    readFile(pathname, (err, data) => {
      if (err) {
        reject('Erreur fichier : ', err)
        return
      }

      try {
        const json = JSON.parse(data)
        resolve(json)
      } catch (e) {
        reject('Json incorrect : ', e)
      }

    })

  })
}

// Récupération de la liste des professeurs
const getProfList = (results) => {
  const profs = []

  for (const r of results) {
    console.log('r :>> ', r)
    profs.push(r.professor)
  }

  return profs
}

const getProfList2 = (results) => {
  return results.map(r => r.professor)
}

// Récupération de la liste des étudiants
const getStudentList = (results) => {
  let studentResults = []
  // let students = []

  for (const r of results) {
    // students = students.concat(r.students)
    studentResults = [...studentResults, ...r.students]
  }

  // console.log('students :>> ', students);
  return studentResults
}

// Récupération de la moyenne par section
const getAvgSection = (results) => {
  const sections = []

  for (const r of results) {
    let total = 0
    let count = 0

    for (const student of r.students) {
      if (student.year_reuslt !== null) {
        total += student.year_result
        count++
      }
    }

    const section = {
      code: r.section.code,
      name: r.section.name,
      avg: total / count
    }

    sections.push(section)
  }

  return sections
}

// Récupération de la moyenne générale des élèves
const getAvgStudents = (results) => {
  const students = results
                    .map(r => r.students)
                    .flat()
                    .filter(s => s.year_result !== null)
  // const students = getStudentList(results)
  const total = students.reduce((acc, current) => acc += current.year_result, 0)
  return (total / students.length
  )
}

const numberToString = (number) => {
  return number.toLocaleString('fr-BE', { maximumFractionDigits: 2 })
}

// Lecture du fichier
readJsonFile('./data/students.json')
  .then(({ results }) => {

    // > Récupération de la liste des professeurs
    const profs = getProfList2(results)
    // console.log('\nProfs : ', profs)
    console.log("\nListe des professeurs :");
    for (const prof of profs) {
      console.log(` - ${prof.lastname} ${prof.firstname}`);
    }

    // > Récupération de la liste des étudiants
    const students = getStudentList(results)
    // console.log('\nStudents : ', students)
    console.log("\nListe des élèves :");
    for (const student of students) {
      console.log(` - ${student.lastname} ${student.firstname}`);
    }

    // > Récupération de la moyenne par section
    const sections = getAvgSection(results)
    console.log("\nMoyenne par section :");
    for (const section of sections) {
      console.log(` - Section ${section.code} ${section.name} - Moyenne ${numberToString(section.avg)}`)
    }

    // > Récupération de la moyenne générale des étudiants
    const avgStudents = getAvgStudents(results)
    console.log('\nMoyenne générale : ', avgStudents);
    console.log('Moyenne générale : ', numberToString(avgStudents));

  })