const loadView = require('./../modules/load-view')
const studentService = require('./../database/studentService')
const getPostData = require('../modules/get-post-data')

const studentController = {

  student_list: (request, response) => {
    studentService.getAll((students) => {
      loadView(response, "student", "list", { students })
    })
  },

  student_create_get: (request, response) => {
    loadView(response, "student", "create")
  },

  student_create_post: (request, response) => {

    getPostData(request).then((student) => {
      console.log('student :>> ', student);

      studentService.add(student)
      loadView(response, "student", "confirm")

    })
    .catch(e => console.log('Erreur : ', e))

  },

}

module.exports = studentController